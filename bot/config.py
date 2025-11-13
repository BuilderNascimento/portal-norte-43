"""
Configurações do Bot de Automação de Notícias
"""

import os
from pathlib import Path
from typing import List, Dict

# Carrega variáveis de ambiente do arquivo .env
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / '.env'
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    # python-dotenv não instalado, usa apenas variáveis de ambiente do sistema
    pass

class Config:
    """Configurações centralizadas do bot"""
    
    # API do site
    API_URL = os.getenv('API_URL', 'https://portalnorte43.com.br')
    API_KEY = os.getenv('API_KEY', 'portal-norte-43-auto-2025')
    
    # Claude AI (Anthropic)
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
    CLAUDE_MODEL = os.getenv('CLAUDE_MODEL', 'claude-3-haiku-20240307')
    
    # OpenAI (para geração de imagens - DALL-E)
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    
    # Configurações de processamento
    MAX_NEWS_PER_RUN = int(os.getenv('MAX_NEWS_PER_RUN', '2'))  # 1-2 notícias por execução
    MIN_CONTENT_LENGTH = 200  # Tamanho mínimo do conteúdo
    
    # Feeds RSS configurados
    RSS_FEEDS: List[Dict[str, str]] = [
        {
            'name': 'Agência Brasil',
            'url': 'https://agenciabrasil.ebc.com.br/rss.xml',
            'category': 'Nacional'
        },
        {
            'name': 'Gov.br Notícias',
            'url': 'https://www.gov.br/pt-br/noticias/@@rss.xml',
            'category': 'Governo'
        },
        {
            'name': 'Gov.br - Educação',
            'url': 'https://www.gov.br/mec/pt-br/noticias/@@rss.xml',
            'category': 'Educação'
        },
        {
            'name': 'Gov.br - Saúde',
            'url': 'https://www.gov.br/saude/pt-br/noticias/@@rss.xml',
            'category': 'Saúde'
        },
        {
            'name': 'Gov.br - Infraestrutura',
            'url': 'https://www.gov.br/infraestrutura/pt-br/noticias/@@rss.xml',
            'category': 'Infraestrutura'
        },
        {
            'name': 'Gov.br - Cidades',
            'url': 'https://www.gov.br/cidades/pt-br/noticias/@@rss.xml',
            'category': 'Cidades'
        },
        {
            'name': 'INMET - Alertas',
            'url': 'https://portal.inmet.gov.br/rss/avisos',
            'category': 'Geral'
        },
        {
            'name': 'Defesa Civil Nacional',
            'url': 'https://www.gov.br/defesacivil/pt-br/noticias/@@rss.xml',
            'category': 'Geral'
        },
        {
            'name': 'ANP - Agência Nacional do Petróleo',
            'url': 'https://www.gov.br/anp/pt-br/centrais-de-conteudo/noticias/@@rss.xml',
            'category': 'Economia'
        },
        {
            'name': 'ANTT - Transportes Terrestres',
            'url': 'https://www.gov.br/antt/pt-br/noticias/@@rss.xml',
            'category': 'Trânsito'
        },
    ]
    
    # Categorias disponíveis no site
    AVAILABLE_CATEGORIES = [
        'Política', 'Trânsito', 'Policial', 'Economia', 'Esportes', 
        'Geral', 'Cidade', 'COP30', 'Meio Ambiente', 'Combate ao Crime',
        'Agricultura e Consumo', 'Nacional', 'Governo', 'Educação', 
        'Saúde', 'Infraestrutura', 'Cidades'
    ]
    
    # Caminho para salvar imagens
    IMAGES_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images', 'news')
    
    @classmethod
    def validate(cls) -> bool:
        """Valida se as configurações essenciais estão presentes"""
        if not cls.ANTHROPIC_API_KEY:
            print("⚠️  ANTHROPIC_API_KEY não configurada!")
            return False
        if not cls.OPENAI_API_KEY:
            print("⚠️  OPENAI_API_KEY não configurada (necessária para geração de imagens)!")
            return False
        return True

