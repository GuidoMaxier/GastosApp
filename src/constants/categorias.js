export const CATEGORIES_CONFIG = {
  Alimentación: {
    icon: 'fast-food-outline',
    color: '#F59E0B',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
  },
  Transporte: {
    icon: 'car-outline',
    color: '#3B82F6',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  Entretenimiento: {
    icon: 'game-controller-outline',
    color: '#A855F7',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
  Salud: {
    icon: 'medkit-outline',
    color: '#10B981',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  Otros: {
    icon: 'receipt-outline',
    color: '#64748B',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
  },
};

export const CATEGORIAS_LISTA = Object.keys(CATEGORIES_CONFIG).map((key) => ({
  id: key,
  label: key,
  ...CATEGORIES_CONFIG[key],
}));