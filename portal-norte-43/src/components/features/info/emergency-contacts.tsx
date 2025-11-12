'use client';

interface EmergencyContact {
  name: string;
  phone: string;
  icon: string;
  color: string;
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    name: 'SAMU',
    phone: '192',
    icon: '🚑',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    name: 'Polícia Militar',
    phone: '190',
    icon: '🚓',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Bombeiro',
    phone: '193',
    icon: '🚒',
    color: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    name: 'Defesa Civil',
    phone: '199',
    icon: '⚠️',
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
            <span className="text-base">{contact.icon}</span>
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
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
          Emergências
        </h3>
        {EMERGENCY_CONTACTS.map(contact => (
          <a
            key={contact.phone}
            href={`tel:${contact.phone}`}
            className={`flex items-center gap-3 rounded-lg ${contact.color} px-4 py-3 text-white transition-colors shadow-sm hover:shadow-md`}
          >
            <span className="text-xl">{contact.icon}</span>
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
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${contact.color} px-4 py-4 text-center text-white transition-all shadow-sm hover:shadow-lg hover:scale-105`}
          title={`Ligar ${contact.name} - ${contact.phone}`}
        >
          <span className="text-2xl">{contact.icon}</span>
          <div className="font-bold text-sm sm:text-base">{contact.name}</div>
          <div className="text-lg font-bold">{contact.phone}</div>
        </a>
      ))}
    </div>
  );
}
