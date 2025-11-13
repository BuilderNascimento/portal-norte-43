"""
Módulo de reescrita de notícias usando Claude AI (Anthropic)
"""

import os
import sys
import logging
from typing import Dict, Optional

# Adiciona o diretório do bot ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from anthropic import Anthropic
from config import Config

logger = logging.getLogger(__name__)

def rewrite_news_with_ai(title: str, content: str, source: str) -> Optional[Dict[str, str]]:
    """
    Reescreve uma notícia usando Claude AI para evitar plágio
    
    Args:
        title: Título original da notícia
        content: Conteúdo original da notícia
        source: Fonte original da notícia
    
    Returns:
        Dict com 'title', 'summary' e 'content' reescritos, ou None em caso de erro
    """
    try:
        if not Config.ANTHROPIC_API_KEY:
            logger.error("ANTHROPIC_API_KEY não configurada")
            return None
        
        client = Anthropic(api_key=Config.ANTHROPIC_API_KEY)
        
        # Limpa o conteúdo HTML se houver
        import re
        clean_content = re.sub(r'<[^>]+>', '', content)
        clean_content = clean_content.strip()
        
        if len(clean_content) < Config.MIN_CONTENT_LENGTH:
            logger.warning(f"Conteúdo muito curto ({len(clean_content)} caracteres)")
            return None
        
        # Prompt para reescrita
        prompt = f"""Você é um jornalista profissional especializado em reescrever notícias de forma original e envolvente, mantendo a precisão dos fatos.

TAREFA: Reescreva a seguinte notícia de forma completamente original, evitando plágio, mas mantendo todos os fatos importantes e a veracidade da informação.

REGRAS IMPORTANTES:
1. Reescreva o título de forma criativa e atrativa (máximo 120 caracteres)
2. Crie um resumo conciso de 2-3 frases (máximo 200 caracteres)
3. Reescreva o conteúdo completo de forma original, mas mantendo todos os fatos
4. Use linguagem clara, objetiva e jornalística
5. Mantenha a estrutura: introdução, desenvolvimento e conclusão
6. Não invente informações, apenas reescreva o que está presente
7. Mantenha citações e dados numéricos exatos
8. Use parágrafos curtos (2-4 frases cada)
9. NÃO inclua widgets, componentes visuais, alertas meteorológicos ou elementos gráficos no texto
10. NÃO inclua referências a imagens, gráficos ou elementos visuais no conteúdo
11. Apenas texto puro, sem markdown de imagens ou elementos visuais

NOTÍCIA ORIGINAL:
Título: {title}
Fonte: {source}

Conteúdo:
{clean_content[:3000]}  # Limita para não exceder tokens

IMPORTANTE: Retorne APENAS um JSON válido no seguinte formato:
{{
  "title": "Título reescrito aqui",
  "summary": "Resumo de 2-3 frases aqui",
  "content": "Conteúdo completo reescrito aqui, com parágrafos separados por \\n\\n"
}}

Não inclua nenhum texto antes ou depois do JSON."""
        
        # Chama Claude
        message = client.messages.create(
            model=Config.CLAUDE_MODEL,
            max_tokens=4000,
            temperature=0.7,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        # Extrai resposta
        response_text = message.content[0].text.strip()
        
        # Tenta extrair JSON da resposta
        import json
        import re
        try:
            # Remove markdown code blocks se houver
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0].strip()
            elif '```' in response_text:
                response_text = response_text.split('```')[1].split('```')[0].strip()
            
            # Remove caracteres de controle inválidos (quebras de linha no meio de strings JSON)
            # Substitui quebras de linha dentro de strings JSON por espaços
            response_text = re.sub(r'\n(?=\s*"[^"]*":)', ' ', response_text)
            response_text = re.sub(r'\n(?=\s*"[^"]*")', ' ', response_text)
            # Remove quebras de linha que não estão dentro de strings
            response_text = re.sub(r'\n(?![^"]*"[^"]*"[^"]*:)', ' ', response_text)
            # Limpa múltiplos espaços
            response_text = re.sub(r'\s+', ' ', response_text)
            
            result = json.loads(response_text)
            
            # Valida resultado
            if not all(key in result for key in ['title', 'summary', 'content']):
                logger.error("Resposta da IA não contém todos os campos necessários")
                return None
            
            # Valida tamanhos
            if len(result['title']) > 150:
                result['title'] = result['title'][:147] + '...'
            if len(result['summary']) > 250:
                result['summary'] = result['summary'][:247] + '...'
            if len(result['content']) < 200:
                logger.warning("Conteúdo reescrito muito curto")
                return None
            
            logger.info(f"✅ Notícia reescrita: {result['title'][:60]}...")
            return result
            
        except json.JSONDecodeError as e:
            logger.error(f"Erro ao parsear JSON da resposta: {e}")
            logger.error(f"Resposta recebida: {response_text[:200]}")
            return None
        
    except Exception as e:
        logger.error(f"Erro ao reescrever notícia com IA: {e}")
        return None

