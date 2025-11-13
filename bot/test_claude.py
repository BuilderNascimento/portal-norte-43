#!/usr/bin/env python3
"""Script de teste para verificar API do Claude"""

import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

api_key = os.getenv('ANTHROPIC_API_KEY')

if not api_key:
    print("ERRO: ANTHROPIC_API_KEY nao encontrada no .env")
    exit(1)

print(f"OK: API Key encontrada: {api_key[:20]}...")
print("\nTestando modelos...\n")

client = Anthropic(api_key=api_key)

# Lista de modelos para testar
models = [
    'claude-3-opus-20240229',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-sonnet-20240620',
    'claude-3-5-sonnet',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
]

for model in models:
    try:
        print(f"Testando: {model}...", end=" ")
        response = client.messages.create(
            model=model,
            max_tokens=10,
            messages=[{"role": "user", "content": "test"}]
        )
        print("FUNCIONA!")
        print(f"   Modelo correto: {model}\n")
        break
    except Exception as e:
        error_msg = str(e)
        if "404" in error_msg or "not_found" in error_msg.lower():
            print("Modelo nao encontrado")
        else:
            print(f"Erro: {error_msg[:50]}")
        continue
else:
    print("\nERRO: Nenhum modelo funcionou. Verifique sua API key e plano da Anthropic.")

