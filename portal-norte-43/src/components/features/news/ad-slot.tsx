import Image from "next/image";

import type { AdBanner } from "@/lib/mock-data";

interface AdSlotProps {
  ad?: AdBanner;
  label?: string;
}

export function AdSlot({ ad, label = "Publicidade" }: AdSlotProps) {
  if (!ad) {
    return (
      <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-400">
        Espaço reservado — {label}
      </div>
    );
  }

  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noreferrer"
      className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-center shadow-sm transition hover:border-slate-400 hover:shadow-md"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="relative h-24 w-full">
        <Image
          src={ad.image}
          alt={ad.label}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
    </a>
  );
}

