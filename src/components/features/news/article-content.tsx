'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Processa markdown básico para imagens: ![alt](src)
  // Remove qualquer widget ou componente que possa estar no conteúdo
  const processContent = (text: string) => {
    // Remove possíveis referências a widgets ou componentes no texto
    let cleanText = text;
    
    // Remove padrões que possam ser interpretados como widgets
    cleanText = cleanText.replace(/\[Widget.*?\]/gi, '');
    cleanText = cleanText.replace(/\[Component.*?\]/gi, '');
    cleanText = cleanText.replace(/Tempestade.*?Alerta Meteorológico/gi, '');
    cleanText = cleanText.replace(/Alerta Meteorológico.*?Tempestade/gi, '');
    // Remove qualquer linha que contenha apenas "Tempestade" ou "Alerta Meteorológico"
    cleanText = cleanText.split('\n').filter(line => {
      const trimmed = line.trim();
      return !trimmed.match(/^(Tempestade|Alerta Meteorológico)$/i);
    }).join('\n');
    // Remove blocos de texto que possam ser widgets
    cleanText = cleanText.replace(/Tempestade[\s\S]{0,50}Alerta Meteorológico/gi, '');
    cleanText = cleanText.replace(/Alerta Meteorológico[\s\S]{0,50}Tempestade/gi, '');
    
    const parts: (string | ReactNode)[] = [];
    let lastIndex = 0;
    
    // Regex para encontrar imagens markdown: ![alt](src)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imageRegex.exec(cleanText)) !== null) {
      // Adiciona texto antes da imagem
      if (match.index > lastIndex) {
        parts.push(cleanText.slice(lastIndex, match.index));
      }
      
      // Adiciona a imagem
      const alt = match[1];
      const src = match[2];
      
      // Só renderiza se for uma imagem válida (não widget)
      if (src && !src.includes('widget') && !src.includes('component') && !src.includes('tempestade')) {
        parts.push(
          <div key={match.index} className="my-6 w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200">
              <Image
                src={src}
                alt={alt || 'Imagem da notícia'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </div>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Adiciona texto restante
    if (lastIndex < cleanText.length) {
      parts.push(cleanText.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : [cleanText];
  };

  const processedContent = processContent(content);

  return (
    <div className="text-lg leading-relaxed text-slate-700 text-justify">
      {processedContent.map((part, index) => {
        if (typeof part === 'string') {
          // Remove parágrafos vazios ou com apenas espaços
          const trimmedPart = part.trim();
          if (!trimmedPart) {
            return null;
          }
          // Remove qualquer referência a widgets ou alertas meteorológicos que possa ter passado
          const finalText = trimmedPart
            .replace(/Tempestade.*?Alerta Meteorológico/gi, '')
            .replace(/Alerta Meteorológico.*?Tempestade/gi, '')
            .replace(/^\s*(Tempestade|Alerta Meteorológico)\s*$/gim, '');
          
          if (!finalText.trim()) {
            return null;
          }
          
          return (
            <p key={index} className="mb-4 whitespace-pre-line">
              {finalText}
            </p>
          );
        }
        return part;
      })}
    </div>
  );
}

