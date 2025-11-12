/**
 * Utilitários para formatação de datas no fuso horário de Andirá/PR (UTC-3, horário de Brasília)
 */

const TIMEZONE = 'America/Sao_Paulo'; // Fuso horário de Andirá/PR (UTC-3)

/**
 * Formata uma data no fuso horário de Andirá/PR
 */
export function formatDateBR(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: TIMEZONE,
    ...options,
  }).format(dateObj);
}

/**
 * Formata data e hora completa no fuso horário de Andirá/PR
 */
export function formatDateTimeBR(date: string | Date): string {
  return formatDateBR(date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIMEZONE,
  });
}

/**
 * Formata apenas a data (sem hora) no fuso horário de Andirá/PR
 */
export function formatDateOnlyBR(date: string | Date): string {
  return formatDateBR(date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TIMEZONE,
  });
}

/**
 * Formata data curta (dia e mês) no fuso horário de Andirá/PR
 */
export function formatDateShortBR(date: string | Date): string {
  return formatDateBR(date, {
    day: 'numeric',
    month: 'short',
    timeZone: TIMEZONE,
  });
}

/**
 * Retorna a data/hora atual no fuso horário de Andirá/PR
 */
export function getCurrentDateTimeBR(): string {
  const now = new Date();
  return formatDateBR(now, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIMEZONE,
  });
}

/**
 * Retorna apenas o horário atual no fuso horário de Andirá/PR
 */
export function getCurrentTimeBR(): string {
  const now = new Date();
  return formatDateBR(now, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIMEZONE,
  });
}

/**
 * Converte uma data para ISO string no fuso horário de Andirá/PR (UTC-3)
 */
export function toISOStringBR(date: Date = new Date()): string {
  // Cria uma data no fuso horário de Brasília
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;
  const hour = parts.find(p => p.type === 'hour')?.value;
  const minute = parts.find(p => p.type === 'minute')?.value;
  const second = parts.find(p => p.type === 'second')?.value;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}-03:00`;
}

