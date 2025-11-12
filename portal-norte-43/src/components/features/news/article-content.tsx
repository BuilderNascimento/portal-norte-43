'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Processa markdown básico para imagens: ![alt](src)
  const processContent = (text: string) => {
    const parts: (string | ReactNode)[] = [];
    let lastIndex = 0;
    
    // Regex para encontrar imagens markdown: ![alt](src)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imageRegex.exec(text)) !== null) {
      // Adiciona texto antes da imagem
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      // Adiciona a imagem
      const alt = match[1];
      const src = match[2];
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
      
      lastIndex = match.index + match[0].length;
    }
    
    // Adiciona texto restante
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  const processedContent = processContent(content);

  return (
    <div className="text-lg leading-relaxed text-slate-700 text-justify">
      {processedContent.map((part, index) => {
        if (typeof part === 'string') {
          return (
            <p key={index} className="mb-4 whitespace-pre-line">
              {part}
            </p>
          );
        }
        return part;
      })}
    </div>
  );
}

