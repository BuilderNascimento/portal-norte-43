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
    # Apenas feeds que estão funcionando corretamente (testados)
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
        # NOTA: Outros feeds do gov.br estão com problemas de XML malformado
        # Foram removidos temporariamente até que sejam corrigidos
        # Feeds testados e com erro:
        # - Gov.br - Educação, Saúde, Infraestrutura, Cidades: XML malformado
        # - INMET - Alertas: XML malformado
        # - Defesa Civil, ANP, ANTT: XML malformado
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

