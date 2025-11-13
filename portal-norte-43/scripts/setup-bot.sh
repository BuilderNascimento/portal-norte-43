#!/bin/bash

# Script de configuração do bot para Linux/Mac
# Execute: chmod +x scripts/setup-bot.sh && ./scripts/setup-bot.sh

echo "========================================"
echo "Portal Norte 43 - Configurador do Bot"
echo "========================================"
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_PATH="$PROJECT_DIR/scripts/process-news-bot.js"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo "❌ ERRO: Node.js não encontrado!"
    echo "Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado!"
echo ""
echo "📁 Configuração:"
echo "   Diretório do projeto: $PROJECT_DIR"
echo "   Script do bot: $SCRIPT_PATH"
echo ""

# Pergunta se quer adicionar ao crontab
read -p "Deseja adicionar ao crontab para execução automática? (s/N): " ADD_CRON

if [[ "$ADD_CRON" =~ ^[Ss]$ ]]; then
    CRON_JOB="*/30 * * * * cd $PROJECT_DIR && npm run bot:process >> /var/log/portal-norte-bot.log 2>&1"
    
    # Verifica se já existe
    if crontab -l 2>/dev/null | grep -q "process-news-bot.js"; then
        echo "⚠️  Já existe uma entrada no crontab para este bot."
        read -p "Deseja substituir? (s/N): " REPLACE
        if [[ "$REPLACE" =~ ^[Ss]$ ]]; then
            crontab -l 2>/dev/null | grep -v "process-news-bot.js" | crontab -
            (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
            echo "✅ Crontab atualizado!"
        fi
    else
        (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
        echo "✅ Adicionado ao crontab!"
    fi
    
    echo ""
    echo "📋 Crontab atual:"
    crontab -l | grep "process-news-bot.js"
    echo ""
fi

# Pergunta se quer testar
read -p "Deseja testar o bot agora? (s/N): " TEST

if [[ "$TEST" =~ ^[Ss]$ ]]; then
    echo ""
    echo "🤖 Executando bot..."
    cd "$PROJECT_DIR"
    npm run bot:process
fi

echo ""
echo "✅ Configuração concluída!"

