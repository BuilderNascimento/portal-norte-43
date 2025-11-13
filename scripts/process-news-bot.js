#!/usr/bin/env node

/**
 * Bot para processar feeds RSS automaticamente
 * Pode ser executado manualmente ou via cron job
 * 
 * Uso:
 *   node scripts/process-news-bot.js
 *   ou
 *   npm run bot:process
 */

const https = require('https');
const http = require('http');

// Configurações
const CONFIG = {
  // URL da API (ajuste conforme necessário)
  apiUrl: process.env.API_URL || 'https://portalnorte43.com.br',
  // API Key (opcional, mas recomendado)
  apiKey: process.env.AUTOMATION_API_KEY || 'portal-norte-43-auto-2025',
  // Timeout em milissegundos
  timeout: 60000, // 60 segundos
};

/**
 * Faz requisição HTTP/HTTPS
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Portal-Norte-43-Bot/1.0',
        ...options.headers,
      },
      timeout: CONFIG.timeout,
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

/**
 * Processa feeds RSS
 */
async function processFeeds() {
  console.log('🤖 Portal Norte 43 - Bot de Processamento de Notícias');
  console.log('='.repeat(60));
  console.log(`📡 Conectando em: ${CONFIG.apiUrl}`);
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
  console.log('');

  try {
    // 1. Verifica status atual
    console.log('📊 Verificando status atual...');
    const statusUrl = `${CONFIG.apiUrl}/api/automation/status`;
    const statusResponse = await makeRequest(statusUrl);

    if (statusResponse.status === 200 && statusResponse.data.success) {
      const stats = statusResponse.data.automation.storage;
      console.log(`   ✅ Total de notícias: ${stats.totalNews}`);
      console.log(`   📅 Última atualização: ${stats.lastUpdate || 'Nunca'}`);
      console.log(`   📰 Feeds processados: ${stats.processedFeeds}`);
      console.log('');
    }

    // 2. Processa feeds
    console.log('🔄 Processando feeds RSS...');
    const processUrl = `${CONFIG.apiUrl}/api/automation/process-feeds?key=${CONFIG.apiKey}`;
    const processResponse = await makeRequest(processUrl, {
      method: 'POST',
    });

    if (processResponse.status === 200 && processResponse.data.success) {
      const result = processResponse.data;
      console.log('   ✅ Processamento concluído!');
      console.log(`   📰 Notícias adicionadas: ${result.added}`);
      console.log(`   📊 Total de notícias: ${result.total}`);
      console.log(`   ⏱️  Tempo de processamento: ${result.duration}ms`);
      console.log(`   📅 Atualizado em: ${result.lastUpdate}`);
      console.log('');
      console.log('✨ Bot executado com sucesso!');
      process.exit(0);
    } else {
      console.error('   ❌ Erro no processamento:');
      console.error('   ', processResponse.data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro ao executar bot:');
    console.error('   ', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('   💡 Verifique se a URL da API está correta');
    } else if (error.message === 'Request timeout') {
      console.error('   💡 O processamento está demorando muito. Tente novamente.');
    }
    
    process.exit(1);
  }
}

// Executa o bot
if (require.main === module) {
  processFeeds();
}

module.exports = { processFeeds };

