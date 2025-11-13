@echo off
REM Script de configuração do bot para Windows
REM Execute este arquivo para configurar o bot no Agendador de Tarefas do Windows

echo ========================================
echo Portal Norte 43 - Configurador do Bot
echo ========================================
echo.

set "PROJECT_DIR=%~dp0.."
set "NODE_PATH=node"
set "SCRIPT_PATH=%PROJECT_DIR%\scripts\process-news-bot.js"

echo Verificando Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.
echo Configuracao:
echo   Diretorio do projeto: %PROJECT_DIR%
echo   Script do bot: %SCRIPT_PATH%
echo.
echo Para configurar no Agendador de Tarefas:
echo   1. Abra o Agendador de Tarefas do Windows
echo   2. Crie uma nova tarefa
echo   3. Configure:
echo      - Nome: Portal Norte 43 - Processar Noticias
echo      - Gatilho: Repetir a cada 30 minutos
echo      - Acao: Iniciar um programa
echo      - Programa: %NODE_PATH%
echo      - Argumentos: %SCRIPT_PATH%
echo      - Iniciar em: %PROJECT_DIR%
echo.
echo Deseja testar o bot agora? (S/N)
set /p TEST="> "

if /i "%TEST%"=="S" (
    echo.
    echo Executando bot...
    cd /d "%PROJECT_DIR%"
    call npm run bot:process
)

echo.
echo Configuracao concluida!
pause

