#!/bin/bash
# Script de configuração do Bot de Automação de Notícias

echo "🤖 Configurando Bot de Automação de Notícias - Portal Norte 43"
echo "================================================================"
echo ""

# Verifica Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Instale Python 3.9 ou superior."
    exit 1
fi

echo "✅ Python encontrado: $(python3 --version)"
echo ""

# Instala dependências
echo "📦 Instalando dependências..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"
echo ""

# Cria arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    if [ -f env.example ]; then
        cp env.example .env
    else
        touch .env
        echo "# Veja README.md para configuração" >> .env
    fi
    echo "✅ Arquivo .env criado"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env e configure suas API keys:"
    echo "   - ANTHROPIC_API_KEY (Claude AI)"
    echo "   - OPENAI_API_KEY (DALL-E 3)"
    echo ""
    echo "   nano .env"
    echo ""
else
    echo "✅ Arquivo .env já existe"
    echo ""
fi

# Cria diretório de logs
mkdir -p logs
echo "✅ Diretório de logs criado"
echo ""

# Testa configuração
echo "🔍 Verificando configuração..."
python3 -c "from config import Config; c = Config(); print('✅ Configuração carregada')" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "⚠️  Erro ao carregar configuração (normal se .env não estiver configurado)"
fi

echo ""
echo "✨ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Edite o arquivo .env com suas API keys"
echo "   2. Teste o bot: python3 news_automation_bot.py"
echo "   3. Configure o cron job para rodar a cada 2 horas"
echo ""
echo "📖 Veja README.md para mais detalhes"

