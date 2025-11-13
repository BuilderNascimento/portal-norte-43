'use client';

import Image from 'next/image';

interface EmergencyContact {
  name: string;
  phone: string;
  image: string;
  color: string;
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'SAMU',
    phone: '192',
    image: '/images/news/samu.jpg',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    name: 'Polícia Militar',
    phone: '190',
    image: '/images/news/policia.PNG',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Bombeiro',
    phone: '193',
    image: '/images/news/Bombeiro.webp',
    color: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    name: 'Defesa Civil',
    phone: '199',
    image: '/images/news/1769_Defesa_Civil__PR.PNG',
    color: 'bg-yellow-600 hover:bg-yellow-700',
  },
];

interface EmergencyContactsProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
}

export function EmergencyContacts({ variant = 'horizontal', className }: EmergencyContactsProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className || ''}`}>
        {EMERGENCY_CONTACTS.map(contact => (
          <a
            key={contact.phone}
            href={`tel:${contact.phone}`}
            className={`flex items-center gap-2 rounded-lg ${contact.color} px-3 py-2 text-sm font-semibold text-white transition-colors shadow-sm`}
            title={`Ligar ${contact.name} - ${contact.phone}`}
          >
            <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded">
              <Image
                src={contact.image}
                alt={contact.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
            <span className="font-bold">{contact.phone}</span>
            <span className="hidden sm:inline">{contact.name}</span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-3 ${className || ''}`}>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Emergências
        </h3>
        {EMERGENCY_CONTACTS.map(contact => (
          <a
            key={contact.phone}
            href={`tel:${contact.phone}`}
            className={`flex items-center gap-3 rounded-lg ${contact.color} px-4 py-3 text-white transition-colors shadow-sm hover:shadow-md`}
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white/20">
              <Image
                src={contact.image}
                alt={contact.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold">{contact.name}</div>
              <div className="text-sm opacity-90">{contact.phone}</div>
            </div>
          </a>
        ))}
      </div>
    );
  }

  // Horizontal (default)
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className || ''}`}>
      {EMERGENCY_CONTACTS.map(contact => (
        <a
          key={contact.phone}
          href={`tel:${contact.phone}`}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl ${contact.color} px-4 py-4 text-center text-white transition-all shadow-sm hover:shadow-lg hover:scale-105`}
          title={`Ligar ${contact.name} - ${contact.phone}`}
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/20">
            <Image
              src={contact.image}
              alt={contact.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="font-bold text-sm sm:text-base">{contact.name}</div>
          <div className="text-lg font-bold">{contact.phone}</div>
        </a>
      ))}
    </div>
  );
}
