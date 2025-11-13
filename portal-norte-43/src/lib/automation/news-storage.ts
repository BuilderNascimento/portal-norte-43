/**
 * Sistema de armazenamento temporário para notícias automatizadas
 * Armazena em arquivo JSON até a integração com n8n/Supabase estar pronta
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { NewsItem } from '@/lib/mock-data';

const STORAGE_DIR = path.join(process.cwd(), 'data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'automated-news.json');

export interface AutomatedNewsStorage {
  news: NewsItem[];
  lastUpdate: string;
  lastProcessedFeeds: string[];
}

/**
 * Garante que o diretório de dados existe
 */
async function ensureStorageDir(): Promise<void> {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR, { recursive: true });
  }
}

/**
 * Carrega notícias automatizadas do arquivo
 */
export async function loadAutomatedNews(): Promise<NewsItem[]> {
  try {
    await ensureStorageDir();
    
    if (!existsSync(STORAGE_FILE)) {
      return [];
    }

    const fileContent = await readFile(STORAGE_FILE, 'utf-8');
    const storage: AutomatedNewsStorage = JSON.parse(fileContent);
    
    // Filtra notícias com mais de 10 dias
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    const recentNews = storage.news.filter(news => {
      const newsDate = new Date(news.publishedAt);
      return newsDate >= tenDaysAgo;
    });

    return recentNews;
  } catch (error) {
    console.error('Erro ao carregar notícias automatizadas:', error);
    return [];
  }
}

/**
 * Salva notícias automatizadas no arquivo
 */
export async function saveAutomatedNews(
  news: NewsItem[],
  processedFeeds: string[] = []
): Promise<void> {
  try {
    await ensureStorageDir();

    const storage: AutomatedNewsStorage = {
      news,
      lastUpdate: new Date().toISOString(),
      lastProcessedFeeds: processedFeeds,
    };

    await writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erro ao salvar notícias automatizadas:', error);
    throw error;
  }
}

/**
 * Adiciona novas notícias ao armazenamento (evita duplicatas)
 */
export async function addAutomatedNews(newNews: NewsItem[]): Promise<number> {
  try {
    const existingNews = await loadAutomatedNews();
    
    // Cria um Set de slugs existentes para verificação rápida
    const existingSlugs = new Set(existingNews.map(n => n.slug));
    
    // Filtra apenas notícias novas (que não existem pelo slug)
    const uniqueNews = newNews.filter(n => !existingSlugs.has(n.slug));
    
    if (uniqueNews.length === 0) {
      return 0;
    }

    // Combina notícias existentes com novas, ordena por data
    const allNews = [...existingNews, ...uniqueNews].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Mantém apenas as últimas 200 notícias para não sobrecarregar
    const limitedNews = allNews.slice(0, 200);

    await saveAutomatedNews(limitedNews);
    
    return uniqueNews.length;
  } catch (error) {
    console.error('Erro ao adicionar notícias automatizadas:', error);
    throw error;
  }
}

/**
 * Obtém estatísticas do armazenamento
 */
export async function getStorageStats(): Promise<{
  totalNews: number;
  lastUpdate: string | null;
  processedFeeds: number;
}> {
  try {
    if (!existsSync(STORAGE_FILE)) {
      return {
        totalNews: 0,
        lastUpdate: null,
        processedFeeds: 0,
      };
    }

    const fileContent = await readFile(STORAGE_FILE, 'utf-8');
    const storage: AutomatedNewsStorage = JSON.parse(fileContent);

    return {
      totalNews: storage.news.length,
      lastUpdate: storage.lastUpdate,
      processedFeeds: storage.lastProcessedFeeds.length,
    };
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return {
      totalNews: 0,
      lastUpdate: null,
      processedFeeds: 0,
    };
  }
}

