"""
Módulo de geração de imagens para notícias usando DALL-E 3
"""

import os
import sys
import logging
import requests
from pathlib import Path
from typing import Optional

# Adiciona o diretório do bot ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from openai import OpenAI
from config import Config

logger = logging.getLogger(__name__)

def generate_news_image(title: str, summary: str, category: str) -> Optional[str]:
    """
    Gera uma imagem relacionada à notícia usando DALL-E 3
    
    Args:
        title: Título da notícia
        summary: Resumo da notícia
        category: Categoria da notícia
    
    Returns:
        Caminho relativo da imagem salva (ex: /images/news/nome-imagem.png)
        ou None em caso de erro
    """
    try:
        if not Config.OPENAI_API_KEY:
            logger.warning("OPENAI_API_KEY não configurada, usando placeholder")
            return '/images/news/tempestade-maringa.svg'
        
        client = OpenAI(api_key=Config.OPENAI_API_KEY)
        
        # Cria prompt para geração de imagem baseado na notícia
        image_prompt = create_image_prompt(title, summary, category)
        
        logger.info(f"🎨 Gerando imagem com prompt: {image_prompt[:80]}...")
        
        # Gera imagem com DALL-E 3
        response = client.images.generate(
            model="dall-e-3",
            prompt=image_prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        
        image_url = response.data[0].url
        
        # Baixa a imagem
        img_response = requests.get(image_url, timeout=30)
        img_response.raise_for_status()
        
        # Cria nome do arquivo baseado no título
        import re
        from datetime import datetime
        
        safe_title = re.sub(r'[^\w\s-]', '', title.lower())
        safe_title = re.sub(r'[-\s]+', '-', safe_title)[:50]
        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
        filename = f"{safe_title}-{timestamp}.png"
        
        # Garante que o diretório existe
        images_dir = Path(Config.IMAGES_DIR)
        images_dir.mkdir(parents=True, exist_ok=True)
        
        # Salva imagem
        image_path = images_dir / filename
        with open(image_path, 'wb') as f:
            f.write(img_response.content)
        
        # Retorna caminho relativo
        relative_path = f"/images/news/{filename}"
        logger.info(f"✅ Imagem salva: {relative_path}")
        
        return relative_path
        
    except Exception as e:
        logger.error(f"Erro ao gerar imagem: {e}")
        # Retorna placeholder em caso de erro
        return '/images/news/tempestade-maringa.svg'

def create_image_prompt(title: str, summary: str, category: str) -> str:
    """
    Cria um prompt otimizado para geração de imagem baseado na notícia
    Foco em imagens realistas e fotográficas, não desenhos ou ilustrações
    """
    # Mapeia categorias para estilos fotográficos realistas
    category_styles = {
        'Policial': 'fotografia jornalística real, estilo documental profissional, câmera de fotojornalismo',
        'Trânsito': 'fotografia real de rua, veículos reais, ambiente urbano autêntico',
        'Política': 'fotografia formal real, ambiente governamental autêntico, estilo fotojornalismo político',
        'Economia': 'fotografia real de ambiente corporativo, escritórios, reuniões profissionais',
        'Saúde': 'fotografia real de ambiente hospitalar, profissionais de saúde, equipamentos médicos',
        'Educação': 'fotografia real de ambiente escolar, estudantes, salas de aula',
        'Meio Ambiente': 'fotografia real da natureza, paisagens naturais, meio ambiente',
        'Geral': 'fotografia jornalística real, estilo fotojornalismo profissional',
        'Nacional': 'fotografia jornalística real, estilo fotojornalismo brasileiro',
        'Governo': 'fotografia formal real, ambiente governamental, estilo fotojornalismo político',
    }
    
    style = category_styles.get(category, 'fotografia jornalística real, estilo fotojornalismo profissional')
    
    # Cria prompt descritivo com foco em realismo fotográfico
    prompt = f"""Fotografia jornalística profissional e realista sobre: {title}

Contexto da notícia: {summary[:200]}

REQUISITOS OBRIGATÓRIOS:
- Fotografia real, não desenho, não ilustração, não cartoon, não arte digital estilizada
- Estilo fotojornalismo profissional autêntico
- Qualidade de foto de agência de notícias (Reuters, AP, AFP)
- Iluminação natural e realista
- Cores autênticas e naturais
- Composição fotográfica profissional
- {style}
- Formato horizontal 16:9, alta resolução
- Sem texto na imagem
- Sem elementos gráficos ou ilustrativos
- Aparência de foto tirada por fotojornalista profissional

PROIBIDO:
- Estilo cartoon, desenho ou ilustração
- Arte digital estilizada
- Elementos gráficos ou abstratos
- Texto ou legendas na imagem
- Efeitos artísticos ou filtros

A imagem deve parecer uma fotografia real tirada por um fotojornalista profissional para uma agência de notícias."""
    
    return prompt

