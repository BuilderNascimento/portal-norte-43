"""
Módulo de classificação automática de categorias usando Claude AI
"""

import os
import sys
import logging
from typing import Optional

# Adiciona o diretório do bot ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from anthropic import Anthropic
from config import Config

logger = logging.getLogger(__name__)

def classify_category(title: str, content: str) -> str:
    """
    Classifica automaticamente a categoria da notícia usando Claude AI
    
    Args:
        title: Título da notícia
        content: Conteúdo da notícia
    
    Returns:
        Categoria classificada (string)
    """
    try:
        if not Config.ANTHROPIC_API_KEY:
            logger.warning("ANTHROPIC_API_KEY não configurada, usando categoria padrão")
            return 'Geral'
        
        client = Anthropic(api_key=Config.ANTHROPIC_API_KEY)
        
        # Categorias disponíveis
        categories = ', '.join(Config.AVAILABLE_CATEGORIES)
        
        prompt = f"""Você é um classificador de notícias. Analise a seguinte notícia e classifique-a em UMA das categorias disponíveis.

TÍTULO: {title}

CONTEÚDO (primeiros 500 caracteres):
{content[:500]}

CATEGORIAS DISPONÍVEIS:
{categories}

INSTRUÇÕES:
1. Analise o título e conteúdo
2. Escolha a categoria que melhor se encaixa
3. Retorne APENAS o nome da categoria, sem explicações
4. Se não tiver certeza, escolha "Geral"

Retorne APENAS o nome da categoria:"""
        
        message = client.messages.create(
            model=Config.CLAUDE_MODEL,
            max_tokens=50,
            temperature=0.3,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        category = message.content[0].text.strip()
        
        # Valida se a categoria existe
        if category not in Config.AVAILABLE_CATEGORIES:
            logger.warning(f"Categoria '{category}' não encontrada, usando 'Geral'")
            category = 'Geral'
        
        logger.info(f"🏷️  Categoria classificada: {category}")
        return category
        
    except Exception as e:
        logger.error(f"Erro ao classificar categoria: {e}")
        return 'Geral'

