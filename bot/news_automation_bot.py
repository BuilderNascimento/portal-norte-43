#!/usr/bin/env python3
"""
Bot de Automação de Notícias - Portal Norte 43
Processa feeds RSS, reescreve com IA, gera imagens e publica no site
Executa a cada 2 horas
"""

import os
import sys
import json
import logging
import requests
import feedparser
from datetime import datetime
from typing import List, Dict, Optional
from pathlib import Path

# Adiciona o diretório do bot ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Importa módulos locais
from ai_rewriter import rewrite_news_with_ai
from image_generator import generate_news_image
from category_classifier import classify_category
from config import Config

# Configuração de logging
log_dir = Path(__file__).parent
log_dir.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_dir / 'news_bot.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class NewsAutomationBot:
    def __init__(self):
        self.config = Config()
        self.processed_slugs = set()
        self.load_processed_slugs()
    
    def load_processed_slugs(self):
        """Carrega slugs já processados para evitar duplicatas"""
        processed_file = Path(__file__).parent / 'processed_slugs.json'
        if processed_file.exists():
            try:
                with open(processed_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.processed_slugs = set(data.get('slugs', []))
                    # Limpa slugs antigos (mantém últimos 500)
                    if len(self.processed_slugs) > 1000:
                        self.processed_slugs = set(list(self.processed_slugs)[-500:])
                logger.info(f"📋 Carregados {len(self.processed_slugs)} slugs processados")
            except Exception as e:
                logger.warning(f"Erro ao carregar slugs processados: {e}")
    
    def save_processed_slug(self, slug: str):
        """Salva slug processado"""
        self.processed_slugs.add(slug)
        processed_file = Path(__file__).parent / 'processed_slugs.json'
        try:
            with open(processed_file, 'w', encoding='utf-8') as f:
                json.dump({'slugs': list(self.processed_slugs)}, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error(f"Erro ao salvar slug processado: {e}")
    
    def fetch_rss_feeds(self) -> List[Dict]:
        """Busca notícias de feeds RSS configurados"""
        all_news = []
        
        for feed_config in self.config.RSS_FEEDS:
            try:
                logger.info(f"📡 Buscando feed: {feed_config['name']}")
                feed = feedparser.parse(feed_config['url'])
                
                if feed.bozo and feed.bozo_exception:
                    logger.warning(f"⚠️  Erro ao parsear feed {feed_config['name']}: {feed.bozo_exception}")
                    continue
                
                if not feed.entries:
                    logger.warning(f"⚠️  Feed {feed_config['name']} está vazio")
                    continue
                
                for item in feed.entries[:5]:  # Limita a 5 por feed
                    # Gera slug único
                    title = item.get('title', 'Sem título')
                    pub_date = item.get('published_parsed')
                    if pub_date:
                        date_str = datetime(*pub_date[:6]).strftime('%Y-%m-%d')
                    else:
                        date_str = datetime.now().strftime('%Y-%m-%d')
                    
                    slug = self.generate_slug(title, date_str)
                    
                    # Verifica se já foi processado
                    if slug in self.processed_slugs:
                        logger.debug(f"⏭️  Slug já processado: {slug[:50]}...")
                        continue
                    
                    # Extrai conteúdo
                    content = ''
                    if item.get('content'):
                        content = item.get('content', [{}])[0].get('value', '')
                    elif item.get('description'):
                        content = item.get('description', '')
                    elif item.get('summary'):
                        content = item.get('summary', '')
                    
                    # Remove HTML básico
                    import re
                    content = re.sub(r'<[^>]+>', '', content)
                    content = content.strip()
                    
                    if len(content) < self.config.MIN_CONTENT_LENGTH:
                        logger.debug(f"⏭️  Conteúdo muito curto: {len(content)} caracteres")
                        continue
                    
                    news_item = {
                        'title': title,
                        'content': content,
                        'link': item.get('link', ''),
                        'published': item.get('published', ''),
                        'source': feed_config['name'],
                        'original_category': feed_config.get('category', 'Geral'),
                        'slug': slug,
                        'date_str': date_str
                    }
                    
                    all_news.append(news_item)
                    
            except Exception as e:
                logger.error(f"❌ Erro ao buscar feed {feed_config['name']}: {e}")
                continue
        
        logger.info(f"✅ Total de notícias encontradas: {len(all_news)}")
        return all_news
    
    def generate_slug(self, title: str, date_str: str) -> str:
        """Gera slug único a partir do título e data"""
        import re
        import unicodedata
        
        # Remove acentos
        title = unicodedata.normalize('NFD', title)
        title = ''.join(c for c in title if unicodedata.category(c) != 'Mn')
        
        # Remove caracteres especiais e converte para minúsculas
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug)
        slug = slug.strip('-')
        
        # Limita tamanho
        slug = slug[:100] if len(slug) > 100 else slug
        
        return f"{slug}-{date_str}"
    
    def process_news(self, news_item: Dict) -> Optional[Dict]:
        """Processa uma notícia: reescreve, categoriza, gera imagem"""
        try:
            logger.info(f"🔄 Processando: {news_item['title'][:60]}...")
            
            # 1. Reescreve com IA
            logger.info("  ✍️  Reescrevendo com Claude...")
            rewritten = rewrite_news_with_ai(
                title=news_item['title'],
                content=news_item['content'],
                source=news_item['source']
            )
            
            if not rewritten:
                logger.error("  ❌ Falha ao reescrever notícia")
                return None
            
            # 2. Categoriza automaticamente
            logger.info("  🏷️  Categorizando...")
            category = classify_category(
                title=rewritten['title'],
                content=rewritten['content']
            )
            
            # 3. Gera imagem
            logger.info("  🎨 Gerando imagem...")
            image_path = generate_news_image(
                title=rewritten['title'],
                summary=rewritten['summary'],
                category=category
            )
            
            if not image_path:
                logger.warning("  ⚠️  Falha ao gerar imagem, usando placeholder")
                image_path = '/images/news/tempestade-maringa.svg'
            
            # 4. Prepara notícia final
            processed_news = {
                'title': rewritten['title'],
                'summary': rewritten['summary'],
                'content': rewritten['content'],
                'category': category,
                'city': 'Brasil',  # Notícias nacionais
                'source': f"{news_item['source']} (Reescrito por IA)",
                'image': image_path,
                'slug': news_item['slug'],
                'publishedAt': datetime.now().strftime('%Y-%m-%dT%H:%M:%S-03:00'),
                'status': 'approved'
            }
            
            logger.info(f"  ✅ Notícia processada com sucesso!")
            return processed_news
            
        except Exception as e:
            logger.error(f"  ❌ Erro ao processar notícia: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return None
    
    def publish_news(self, news: Dict) -> bool:
        """Publica notícia no site via API"""
        try:
            url = f"{self.config.API_URL}/api/automation/publish-news"
            headers = {
                'Authorization': f'Bearer {self.config.API_KEY}',
                'Content-Type': 'application/json'
            }
            
            logger.info(f"📤 Publicando no site: {news['title'][:50]}...")
            
            response = requests.post(
                url,
                json=news,
                headers=headers,
                timeout=60
            )
            
            if response.status_code == 200 or response.status_code == 201:
                logger.info("  ✅ Notícia publicada com sucesso!")
                return True
            else:
                logger.error(f"  ❌ Erro ao publicar: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"  ❌ Erro ao publicar notícia: {e}")
            return False
    
    def run(self):
        """Executa o bot completo"""
        logger.info("=" * 70)
        logger.info("🤖 Portal Norte 43 - Bot de Automação de Notícias")
        logger.info("=" * 70)
        logger.info(f"⏰ Iniciado em: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}")
        logger.info("")
        
        # Valida configurações
        if not self.config.validate():
            logger.error("❌ Configurações inválidas. Verifique as variáveis de ambiente.")
            return 1
        
        try:
            # 1. Busca feeds RSS
            logger.info("📡 ETAPA 1: Buscando feeds RSS...")
            news_items = self.fetch_rss_feeds()
            
            if not news_items:
                logger.info("ℹ️  Nenhuma notícia nova encontrada")
                return 0
            
            # 2. Processa notícias (limita a MAX_NEWS_PER_RUN)
            logger.info(f"\n📝 ETAPA 2: Processando até {self.config.MAX_NEWS_PER_RUN} notícia(s)...")
            processed_count = 0
            published_count = 0
            
            for news_item in news_items[:self.config.MAX_NEWS_PER_RUN]:
                # Processa notícia
                processed_news = self.process_news(news_item)
                
                if not processed_news:
                    continue
                
                processed_count += 1
                
                # Publica no site
                logger.info(f"\n📤 ETAPA 3: Publicando no site...")
                if self.publish_news(processed_news):
                    published_count += 1
                    # Marca como processado
                    self.save_processed_slug(news_item['slug'])
                else:
                    logger.warning("⚠️  Notícia processada mas não publicada")
            
            # Resumo final
            logger.info("")
            logger.info("=" * 70)
            logger.info("📊 RESUMO DA EXECUÇÃO")
            logger.info("=" * 70)
            logger.info(f"📰 Notícias encontradas: {len(news_items)}")
            logger.info(f"🔄 Notícias processadas: {processed_count}")
            logger.info(f"✅ Notícias publicadas: {published_count}")
            logger.info("")
            logger.info("✨ Bot executado com sucesso!")
            
            return 0 if published_count > 0 else 1
            
        except Exception as e:
            logger.error(f"❌ Erro fatal: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return 1

def main():
    """Função principal"""
    bot = NewsAutomationBot()
    exit_code = bot.run()
    sys.exit(exit_code)

if __name__ == '__main__':
    main()

