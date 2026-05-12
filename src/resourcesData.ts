
export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'song' | 'story' | 'game';
  age: '3' | '4' | '5' | 'all';
  description: string;
  links: string[];
}

export const RESOURCES: Resource[] = [
  {
    id: 'minedu-1',
    title: 'Guía Docente: Ciclo II',
    type: 'video',
    age: 'all',
    description: 'Orientaciones pedagógicas oficiales para el nivel inicial. Incluye planificación y evaluación.',
    links: ['https://www.youtube.com/watch?v=fK6G1_y8_sc']
  },
  {
    id: 's1',
    title: 'Los Pollitos Dicen',
    type: 'song',
    age: '3',
    description: 'Canción clásica para trabajar onomatopeyas, cuidado y afecto en el aula.',
    links: ['https://www.youtube.com/watch?v=ff9G6v6W4Ww']
  },
  {
    id: 's2',
    title: 'Pulgarcito (Canción)',
    type: 'song',
    age: '4',
    description: 'Canción ideal para esquema corporal, motricidad fina y coordinación rítmica.',
    links: ['https://www.youtube.com/watch?v=6PEnpPhj8qE']
  },
  {
    id: 'st1',
    title: 'El Monstruo de Colores',
    type: 'story',
    age: 'all',
    description: 'Recurso fundamental para la educación emocional. Ayuda a identificar y nombrar emociones.',
    links: ['https://www.youtube.com/watch?v=So98p3L-X24']
  },
  {
    id: 'st2',
    title: 'Cuentos de la Selva para niños',
    type: 'story',
    age: '5',
    description: 'Historias breves de la naturaleza, ideales para fomentar el respeto por los animales y el ambiente.',
    links: ['https://www.youtube.com/watch?v=lK4_z0R5y-Y']
  },
  {
    id: 's3',
    title: 'La Mané',
    type: 'song',
    age: 'all',
    description: 'Canción de movimiento y seguimiento de instrucciones para psicomotricidad gruesa.',
    links: ['https://www.youtube.com/watch?v=0k_S3rV9tF0']
  },
  {
    id: 'res-4',
    title: 'Aprendo en Casa: Inicial',
    type: 'video',
    age: 'all',
    description: 'Repositorio oficial con actividades lúdicas y educativas del MINEDU.',
    links: ['https://www.youtube.com/playlist?list=PLD_mX_J5W-t8p_uE8oO_vS-Q32C_E8mS7']
  },
  {
    id: 'g1',
    title: 'Juegos de Integración',
    type: 'game',
    age: 'all',
    description: 'Batería de dinámicas para los primeros días o asambleas en el aula de inicial.',
    links: ['https://www.youtube.com/watch?v=XWvN78nIn4g']
  },
  {
    id: 'res-5',
    title: 'Técnicas Grafoplásticas',
    type: 'video',
    age: '3',
    description: 'Ideas para trabajar dactilopintura, embolillado y rasgado con los más pequeños.',
    links: ['https://www.youtube.com/watch?v=S4fH59fF3eE']
  }
];
