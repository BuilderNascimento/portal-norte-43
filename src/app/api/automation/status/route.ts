/**
 * Endpoint para verificar status da automação
 */

import { NextResponse } from 'next/server';
import { getStorageStats } from '@/lib/automation/news-storage';

export async function GET() {
  try {
    const stats = await getStorageStats();

    return NextResponse.json({
      success: true,
      automation: {
        enabled: true,
        storage: stats,
        nextSteps: [
          'Configure AUTOMATION_API_KEY no .env para proteger o endpoint',
          'Configure cron job para chamar /api/automation/process-feeds periodicamente',
          'Ou use Vercel Cron Jobs para automação',
        ],
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Erro ao obter status',
      },
      { status: 500 }
    );
  }
}

