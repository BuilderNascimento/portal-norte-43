@echo off
REM Script de configuração do Bot de Automação de Notícias (Windows)

echo 🤖 Configurando Bot de Automação de Notícias - Portal Norte 43
echo ================================================================
echo.

REM Verifica Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado. Instale Python 3.9 ou superior.
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo.

REM Instala dependências
echo 📦 Instalando dependências...
pip install -r requirements.txt

if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo ✅ Dependências instaladas
echo.

REM Cria arquivo .env se não existir
if not exist .env (
    echo 📝 Criando arquivo .env...
    if exist env.example (
        copy env.example .env >nul
    ) else (
        echo # Veja README.md para configuração > .env
    )
    echo ✅ Arquivo .env criado
    echo.
    echo ⚠️  IMPORTANTE: Edite o arquivo .env e configure suas API keys:
    echo    - ANTHROPIC_API_KEY (Claude AI)
    echo    - OPENAI_API_KEY (DALL-E 3)
    echo.
) else (
    echo ✅ Arquivo .env já existe
    echo.
)

REM Cria diretório de logs
if not exist logs mkdir logs
echo ✅ Diretório de logs criado
echo.

echo ✨ Configuração concluída!
echo.
echo 📋 Próximos passos:
echo    1. Edite o arquivo .env com suas API keys
echo    2. Teste o bot: python news_automation_bot.py
echo    3. Configure o Agendador de Tarefas para rodar a cada 2 horas
echo.
echo 📖 Veja README.md para mais detalhes
echo.
pause

