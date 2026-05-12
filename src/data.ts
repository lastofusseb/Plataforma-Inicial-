/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Area {
  id: string;
  name: string;
  icon: string;
  competencies: Competency[];
}

export interface Competency {
  id: string;
  name: string;
  capacities: string[];
  standard: string;
  performances: {
    age3: string[];
    age4: string[];
    age5: string[];
  };
}

export const LEARNING_ACTIVITY_STRUCTURES = {
  'comunicacion': {
    'oral': {
      inicio: 'La maestra presenta una situación comunicativa real o creada para despertar del interés (Motivación). Se anuncia el propósito: “Hoy aprenderemos (a conversar para…….) Se recoge el saber previo: ¿Cómo se conversa? ¿qué es importante considerar a la hora de conversar?',
      desarrollo: 'Antes del discurso: Propósito comunicativo, ¿qué harán? ¿con quién hablarán? ¿para qué hablarán? ¿qué vale a la hora de hablar? Se establecen los criterios con los niños y se construye una check list con ellos. Durante el discurso: Inicio, desarrollo del tema y cierre. Después del discurso: Revisión o reflexión sobre lo emitido o escuchado. Pueden evaluar si cumplieron los criterios usando una check list grupal o individual sobre el cumplimiento de ellos.',
      cierre: 'Se pregunta a los niños respecto a ¿cuál era el propósito de hoy? ¿qué aprendieron? ¿cómo lo aprendieron? ¿para qué dialogaron o conversaron? ¿se ha logrado? ¿por qué será importante saber conversar?'
    },
    'lectura': {
      inicio: 'La maestra presenta una situación comunicativa real o creada para despertar del interés o necesidad de leer (Motivación). Se anuncia el propósito: “Hoy aprenderemos (a leer para…….) Se recoge el saber previo: ¿Cómo se lee? ¿de dónde se inicia la lectura? ¿cuál será el orden para leer? Por ejemplo, si se acaba la línea que estoy leyendo ¿dónde debo iniciar? ¿cómo me puedo ayudar de los dibujos para leer? Etc.',
      desarrollo: 'Antes de la lectura: Propósito de la lectura, saberes previos, formulación de predicciones. ¿de qué creen que trata la lectura? ¿por qué lo creen? ¿cuál será el título? ¿quién será el autor? ¿quién habrá ilustrado este libro o texto? ¿qué personajes estarán en la historia? En caso de ser una receta ¿qué tipo de texto será? ¿qué les hace pensar eso? ¿cuál será el título de la receta? Durante la lectura: Se puede detener la lectura mínimamente para preguntar, contrastar hipótesis o inferir. ¿qué creen que pasará luego? ¿por qué lo creen? Vamos a descubrirlo… Después de la lectura: Responden preguntas literales, inferenciales y criteriales, cuestiona, propone (Si pudieras cambiar el final de la historia ¿cómo sería? ¿por qué propondrías eso? ¿qué le aconsejarías a….? ¿cómo hubieras resuelto el problema?)',
      cierre: 'Se pregunta a los niños respecto a ¿cuál era el propósito de hoy? ¿qué aprendieron? ¿cómo lo aprendieron? ¿para qué leyeron? ¿se ha logrado? ¿por qué será importante saber leer?'
    },
    'escritura': {
      inicio: 'La maestra presenta una situación comunicativa real o creada para despertar del interés (Motivación). Se anuncia el propósito: “Hoy aprenderemos (a escribir para…….) Se recoge el saber previo: ¿Cómo se escribe? ¿qué es importante considerar a la hora de escribir?',
      desarrollo: 'Planificación del texto: Define qué escribirá, el propósito y el destinatario (usar cuadro de planificación (¿qué escribiré?, ¿para quién escribiré? ¿qué quiero comunicar? Textualización: Es la escritura propiamente en la cual se desarrollan las ideas según el plan de escritura. Aquí los niños escriben a su manera o dicta a la maestra para que ella escriba lo que ellos dictan. Revisión del texto: Revisan lo escrito para verificar de manera sencilla si tiene coherencia y cohesión. Reescritura, edición y publicación. Se puede hacer al día siguiente de la textualización',
      cierre: 'Se pregunta a los niños respecto a ¿cuál era el propósito de hoy? ¿qué aprendieron? ¿cómo lo aprendieron? ¿para qué escribieron? ¿por qué será importante saber escribir?'
    },
    'arte': {
      inicio: 'La maestra presenta: Propósito: Plantear los propósitos de la actividad, proponiendo un reto. Asamblea: Los estudiantes conversan sobre el desarrollo de la creatividad, recuerdan los acuerdos de uso y cuidado de los materiales.',
      desarrollo: 'Exploración del material: Los niños eligen el material a utilizar y exploran de manera libre las posibilidades que tiene su uso. Se puede proponer técnica de SCAMPER. Desarrollo de la actividad: Los niños realizan su propuesta con material que han elegido y la técnica que deseen para transformar su insumo en una creación gráfica o plástica.',
      cierre: 'Verbalización: Los niños muestran y comunican el proceso de elaboración de su obra artística y/o comentan la obra de los demás.'
    }
  },
  'matematica': {
    'cantidad': {
      inicio: 'La maestra presenta una situación problemática para despertar del interés (Motivación). Se anuncia el propósito: “Hoy aprenderemos a contar o agrupar o medir o seriar u ordenar para resolver un problema (se precisa según convenga) Se recoge el saber previo: ¿Cómo se cuenta, agrupa, seria, ordena, etc? (se precisa según convenga).',
      desarrollo: 'Antes de resolver el problema, ¿qué les parece si jugamos? Vivencial: Mediante el uso del cuerpo el niño y la niña construyen nociones de cantidad, ubicación espacial y temporal, en función de su propio cuerpo y en relación con otros (se precisa según convenga). Concreto: Se debe brindar oportunidades a los niños y niñas de relacionarse de manera libre con los diferentes objetos estructurados y no estructurados, que le permitan descubrir cantidades, compararlas, características, propiedades, funciones y relaciones, y otras nociones y competencias matemáticas requeridas para el nivel inicial. Pictórico: El niño o niña dibuja e interpreta la información a partir de modelos gráficos o pictóricos. Gráfico: Se representa la cantidad, sin usar el modelo gráfico exacto de lo que se busca representar. Simbólico: Es la representación abstracta de lo que se contó o experimento en la parte vivencial o concreta de la construcción de número.',
      cierre: 'Se pregunta a los niños respecto a ¿cuál era el propósito de hoy? ¿qué aprendieron? ¿cómo lo aprendieron? ¿para qué contaron, agruparon? Etc (se precisa según convenga). ¿se ha logrado? ¿por qué será importante….? (se precisa según convenga).'
    }
  },
  'ciencia': {
    'indaga': {
      inicio: 'La maestra en asamblea con los niños, recuerda acuerdos de convivencia para el trabajo del día. Se presenta a los niños y niñas una situación problematizadora para indagar. Se realizan preguntas para llenar el cuadro: Problema, Estrategia, Datos e Información, Hipótesis y Conclusiones. El propósito de la actividad: Hoy aprenderemos a explicar…… ¿qué debemos hacer para descubrirlo? Se irá anotando en el cuadro y pegando imágenes de ayuda visual.',
      desarrollo: 'A los niños en grupos, se les presenta los materiales a usar en el experimento. Con ayuda del cuadro, pide a los grupos que decidan y le dicten sus hipótesis. Se registra las hipótesis. Se pide lleven sus materiales para EXPERIMENTAR. Se irá mediando el aprendizaje: ¿qué dice su hipótesis? ¿qué harán? ¿qué creen que pasará? Se pide en asamblea, CONSTRUIR LAS CONCLUSIONES. ¿Cuál de los experimentos nos ayudó a descubrir ……..? ¿qué hicimos para lograrlo? ¿era como creían inicialmente?',
      cierre: 'Se pregunta ¿cuál era el propósito de hoy? ¿qué aprendieron? ¿cómo lo aprendieron? ¿para qué indagaron sobre…….? Etc. ¿se ha logrado? ¿por qué será importante investigar?'
    }
  },
  'psicomotriz': {
    'motricidad': {
      inicio: 'Se recuerdan los acuerdos relacionados al trabajo en exteriores al aula: Formas de participación, compartir y cuidado de materiales, orden y limpieza del espacio, buen trato y convivencia.',
      desarrollo: 'Antes de interactuar los niños con el material: Asamblea (se presentan materiales). Expresividad motriz (se dialoga sobre la actividad, respeto y cuidado, exploración del material). Relajación (propuesta de relajación). Representación Gráfica (material para representar lo realizado).',
      cierre: 'Se pregunta a los niños respecto a ¿cuál era el propósito de hoy? ¿cómo lo hicieron? ¿con quienes jugaron?'
    }
  }
};

export const EVALUATION_DATA: Area[] = [
  {
    id: 'comunicacion',
    name: 'Comunicación',
    icon: 'MessageSquare',
    competencies: [
      {
        id: 'oral',
        name: 'Se comunica oralmente en su lengua materna',
        capacities: [
          'Obtiene información del texto oral.',
          'Infiere e interpreta información del texto oral.',
          'Adecúa, organiza y desarrolla el texto de forma coherente y cohesionada.',
          'Utiliza recursos no verbales y paraverbales de forma estratégica.',
          'Interactúa estratégicamente con distintos interlocutores.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto oral.'
        ],
        standard: 'Se comunica oralmente mediante diversos tipos de textos; identifica información explícita; realiza inferencias sencillas a partir de esta información e interpreta recursos no verbales y paraverbales de las personas de su entorno. Opina sobre lo que más/menos le gustó del contenido del texto. Se expresa espontáneamente a partir de sus conocimientos previos, con el propósito de interactuar con uno o más interlocutores conocidos en una situación comunicativa. Desarrolla sus ideas manteniéndose por lo general un intercambio, generalmente participa y responde en forma pertinente a lo que le dicen.',
        performances: {
          age3: ['Se expresa oralmente, participando en conversaciones, al escuchar textos o en situaciones diversas de diálogo (entrevista, asamblea), desarrollando sus ideas u opiniones de forma coherente con el propósito comunicativo, acompañando su discurso de palabras de uso frecuente, recursos no verbales y paraverbales.'],
          age4: ['Se expresa oralmente, participando en conversaciones, emitiendo su opinión y respondiendo preguntas a partir de la escucha de lectura o en situaciones diversas de diálogo (entrevista, asamblea) desarrollando sus ideas u opinando de forma coherente con el propósito comunicativo acompañando su discurso con palabras de uso frecuente y una pronunciación entendible, recursos no verbales y paraverbales.'],
          age5: ['Se expresa oralmente, participando en conversaciones, emitiendo su opinión y respondiendo preguntas a partir de la escucha de lectura o en situaciones diversas de diálogo (entrevista, asamblea) esperando su turno para comunicarse desarrollando sus ideas u opinando de forma coherente con el propósito comunicativo acompañando su discurso con palabras de uso frecuente y una pronunciación entendible, recursos no verbales y paraverbales.']
        }
      },
      {
        id: 'escritura',
        name: 'Escribe diversos tipos de textos en su lengua materna',
        capacities: [
          'Adecúa el texto a la situación comunicativa.',
          'Organiza y desarrolla las ideas de forma coherente y cohesionada.',
          'Utiliza convenciones del lenguaje escrito de forma pertinente.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
        ],
        standard: 'Escribe a partir de sus hipótesis de escritura diversos tipos de textos sobre temas variados considerando el propósito y el destinatario a partir de su experiencia previa. Desarrolla sus ideas en torno a un tema con la intención de transmitir ideas o emociones. Sigue la linealidad y direccionalidad de la escritura.',
        performances: {
          age3: ['No se evidencia (----------)'],
          age4: ['Escribe por propia iniciativa y a su manera según sus hipótesis de escritura, utilizando trazos, grafismos y convenciones de escritura (linealidad y direccionalidad) para comunicar sus ideas vivencias u otros temas, según el propósito comunicativo y destinatario.'],
          age5: [
            'Escribe por propia iniciativa y a su manera según sus hipótesis de escritura, usando trazos, grafismos y convenciones de escritura (linealidad y direccionalidad) para comunicar sus ideas, vivencias u otros temas según el propósito comunicativo y destinatario.',
            'Dicta un mensaje para transmitir sus ideas o emociones, revisando que correspondan al propósito de lo que quiere comunicar y destinatario.'
          ]
        }
      },
      {
        id: 'lectura',
        name: 'Lee diversos tipos de textos en su lengua materna',
        capacities: [
          'Obtiene información del texto escrito.',
          'Infiere e interpreta información del texto escrito.',
          'Reflexiona y evalúa la forma, el contenido y contexto del texto escrito.'
        ],
        standard: 'Lee diversos tipos de textos que tratan temas reales o imaginarios, que le son cotidianos, en los que predominan palabras conocidas y que se acompañan con ilustraciones. Construye hipótesis o predicciones sobre la información contenida en los textos y demuestra comprensión de las ilustraciones, y de algunos símbolos escritos que trasmiten información. Expresa sus gustos y preferencias en relación a los textos leídos a partir de su propia experiencia. Utiliza algunas convenciones básicas de los textos escritos.',
        performances: {
          age3: [
            'Menciona características de personas, personajes, animales y lugares a partir de ilustraciones de todo lo que lee o le leen, haciendo predicciones e interpretando la información que observa.',
            'Expresa sus gustos y las emociones, que le generó el texto escrito.'
          ],
          age4: [
            'Menciona características de personas, personajes, animales y lugares a partir de ilustraciones de todo lo que lee o le leen, haciendo predicciones e interpretando la información que observa.',
            'Comenta sus gustos y las emociones que le generó el texto escrito, además da sus opiniones.'
          ],
          age5: ['Menciona características de personas, personajes, animales y lugares, algunas palabras conocidas, el título de algún libro según sus hipótesis, a partir ilustraciones de lo que lee o le leen, haciendo predicciones e intercambiando la información que observa o lee.']
        }
      },
      {
        id: 'arte',
        name: 'Crea proyectos desde los lenguajes artísticos',
        capacities: [
          'Explora y experimenta los lenguajes del arte.',
          'Aplica procesos creativos.',
          'Socializa sus procesos y proyectos.'
        ],
        standard: 'Crea proyectos artísticos al experimentar y manipular libremente diversos medios y materiales para descubrir sus propiedades expresivas. Explora los elementos básicos de los lenguajes del arte como el sonido, los colores y el movimiento. Explora sus propias ideas imaginativas que construye a partir de sus vivencias y las transforma en algo nuevo mediante el juego simbólico, el dibujo, la pintura, la construcción, la música y el movimiento creativo. Comparte espontáneamente sus experiencias y creaciones.',
        performances: {
          age3: ['Crea proyectos artísticos para representar sus ideas y vivencias explorando diversos materiales y transformándolos de acuerdo a sus posibilidades, mencionando como lo realizó.'],
          age4: ['Crea proyectos artísticos para representar sus ideas y vivencias al manipular diversos materiales para descubrir sus propiedades expresivas utilizando los diversos lenguajes artísticos, compartiendo y describiendo sus propias producciones.'],
          age5: ['Crea proyectos artísticos para representar sus ideas y vivencias al manipular los diversos materiales para descubrir sus propiedades expresivas utilizando los diversos lenguajes artísticos, compartiendo y describiendo sus propias producciones y las de sus compañeros.']
        }
      }
    ]
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: 'Calculator',
    competencies: [
      {
        id: 'cantidad',
        name: 'Resuelve problemas de cantidad',
        capacities: [
          'Traduce cantidades a expresiones numéricas.',
          'Comunica su comprensión sobre los números y las operaciones.',
          'Usa estrategias y procedimientos de estimación y cálculo.'
        ],
        standard: 'Resuelve problemas referidos a relacionar objetos de su entorno según sus características perceptuales; agrupar, ordenar hasta el quinto lugar, seriar hasta 5 objetos, comparar cantidades de objetos y pesos, agregar y quitar hasta 5 elementos, realizando representaciones con su cuerpo, material concreto o dibujos. Expresa la cantidad de hasta 10 objetos, usando estrategias como el conteo. Usa cuantificadores: “muchos” “pocos”, “ninguno”, y expresiones: “más que” “menos que”. Expresa el peso de los objetos “pesa más”, “pesa menos” y el tiempo con nociones temporales como “antes o después”, “ayer” “hoy” o “mañana”.',
        performances: {
          age3: ['Resuelve problemas de cantidad para agrupar, medir y pesar objetos y personas, mencionando la forma en que resolvió el problema, usando el conteo espontáneo, la comparación u otra estrategia a partir de la comprensión de una situación problemática.'],
          age4: ['Resuelve problemas de cantidad hasta 5, mencionando cómo agrupó serió hasta 3 elementos, correspondió, ordenó, midió, pesó, personas, objetos e imágenes, mencionando la forma en que resolvió el problema, usando el conteo espontáneo, la comparación u otra estrategia a partir de la comprensión de una situación problemática.'],
          age5: ['Resuelve problemas de cantidad hasta 5 mencionando como agrupó, serió hasta 3 elementos, correspondió, ordenó, midió, pesó, personas, objetos e imágenes, mencionando la forma en que resolvió el problema, usando el conteo, la comparación u otra estrategia a partir de la comprensión de una situación problemática.']
        }
      },
      {
        id: 'forma',
        name: 'Resuelve problemas de forma, movimiento y localización',
        capacities: [
          'Modela objetos de forma geométrica y sus transformaciones.',
          'Comunica su expresión sobre las formas y relaciones geométricas.',
          'Usa estrategias y procedimientos para orientarse en el espacio.'
        ],
        standard: 'Resuelve problemas al relacionar los objetos del entorno con formas bidimensionales y tridimensionales. Expresa la ubicación de personas en relación a objetos en el espacio “cerca de” “lejos de” “al lado de”, y de desplazamientos “hacia adelante, hacia atrás”, “hacia un lado, hacia el otro”. Así también expresa la comparación de la longitud de dos objetos: “es más largo que”, “es más corto que”. Emplea estrategias para resolver problemas, al construir objetos con material concreto o realizar desplazamientos en el espacio.',
        performances: {
          age3: ['Resuelve problemas de tamaño, ubicación y desplazamiento de personas y objetos al compararlos, relacionarlos, utilizando diferentes estrategias, para luego comunicar lo que aprendió y cómo resolvió el problema.'],
          age4: ['Resuelve problemas al modelar y transformar formas bidimensionales y tridimensionales, de ubicación y desplazamiento en el espacio y de longitud, en su cuerpo, objetos, y dibujos, al compararlos y relacionarlos, utilizando diferentes estrategias, comunicando lo que comprendió y cómo resolvió el problema.'],
          age5: ['Resuelve problemas al modelar y transformar formas bidimensionales y tridimensionales, de ubicación y desplazamiento en el espacio y de longitud, en su cuerpo, objetos, y dibujos, al compararlos y relacionarlos, utilizando diferentes estrategias, comunicando lo que comprendió y cómo resolvió el problema.']
        }
      }
    ]
  },
  {
    id: 'ciencia',
    name: 'Ciencia y Tecnología',
    icon: 'Microscope',
    competencies: [
      {
        id: 'indaga',
        name: 'Indaga mediante métodos científicos para construir sus conocimientos',
        capacities: [
          'Problematiza situaciones para hacer indagación.',
          'Diseña estrategias para hacer indagación.',
          'Genera y registra datos o información.',
          'Analiza datos e información.',
          'Evalúa y comunica el proceso y resultado de su evaluación.'
        ],
        standard: 'Explora los objetos, el espacio y hechos que acontecen in su entorno, hace preguntas con base en su curiosidad, propone posibles respuestas, obtiene información al observar, manipular y describir; compara aspectos del objeto o fenómeno para comprobar la respuesta y expresa en forma oral o gráfica lo que hizo y aprendió.',
        performances: {
          age3: ['Realiza preguntas de aquello que le genera curiosidad, obteniendo información a través de los sentidos y el uso de algunas herramientas de exploración, utilizando palabras, gestos o movimientos, para comunicar aquello que descubrió.'],
          age4: ['Explora objetos y hechos de su entorno con curiosidad, formula preguntas y propone posibles respuestas; obtiene información a través de la observación, manipulación y uso de algunas herramientas, compara características para comprobar sus ideas y comunica lo que descubrió mediante palabras, dibujos o gestos.'],
          age5: ['Explora objetos y fenómenos de su entorno, formula preguntas, plantea hipótesis, diseña estrategias de indagación, recoge información mediante la observación o experimentación, las registra y comunica sus descubrimientos de manera sencilla.']
        }
      }
    ]
  },
  {
    id: 'personal-social',
    name: 'Personal Social',
    icon: 'User',
    competencies: [
      {
        id: 'identidad',
        name: 'Construye su identidad',
        capacities: [
          'Se valora a sí mismo',
          'Autorregula sus emociones'
        ],
        standard: 'Construye su identidad al tomar conciencia de los aspectos que lo hacen único. Se identifica en algunas de sus características físicas, así como sus cualidades e intereses, gustos y preferencias. Se siente miembro de su familia y del grupo de aula al que pertenece. Practica hábitos saludables reconociendo que son importantes para él. Actúa de manera autónoma en las actividades que realiza y es capaz de tomar decisiones, desde sus posibilidades y considerando a los demás. Expresa sus emociones e identifica el motivo que las originan. Busca y acepta la compañía de un adulto significativo ante situaciones que lo hacen sentir vulnerable, inseguro, con ira, triste o alegre.',
        performances: {
          age3: ['Menciona sus necesidades, sensaciones, intereses y preferencias de acuerdo a sus posibilidades, e identifica a los integrantes de su familia. Realiza actividades cotidianas de acuerdo a sus intereses y expresa sus emociones empleando palabras y gestos; tolera algunos tiempos de espera anticipados por el adulto y busca compañía cuando lo requiere.'],
          age4: ['Reconoce algunas de sus características personales, gustos, intereses y preferencias, y se identifica como miembro de su familia y grupo de aula; expresa sus emociones y comienza a explicar sus causas en situaciones cotidianas, regulándolas con apoyo cuando es necesario, y actúa con mayor autonomía en sus actividades, tomando pequeñas decisiones y practicando hábitos de cuidado personal.'],
          age5: ['Reconoce y describe sus características personales, habilidades, gustos y preferencias, diferenciándose de los demás, y expresa sus emociones de manera apropiada en diversas situaciones cotidianas, mostrando autonomía en sus acciones y cuidado de sí mismo.']
        }
      },
      {
        id: 'convive',
        name: 'Convive y participa democráticamente en la búsqueda del bien común',
        capacities: [
          'Interactúa con todas las personas.',
          'Construye normas, y asume acuerdos y leyes.',
          'Participa en acciones que promueven el bienestar común.'
        ],
        standard: 'Convive y participa democráticamente cuando interactúa de manera respetuosa con sus compañeros desde su propia iniciativa, cumple con sus deberes y se interesa por conocer más sobre las diferentes costumbres y características de las personas de su entorno inmediato. Participa y propone acuerdos y normas de convivencia para el bien común. Realiza acciones con otros para el buen uso de los espacios, materiales y recursos comunes.',
        performances: {
          age3: ['Interactúa con niños y adultos de su entorno. Juega en pequeños grupos. Practica las normas de convivencia que conoce. Respeta los límites que conoce, y cuida los recursos, materiales y espacios compartidos.'],
          age4: ['Interactúa con niños y adultos de su entorno de manera respetuosa, participando en juegos y actividades grupales; practica y comienza a proponer algunas normas de convivencia con apoyo, cumple acuerdos establecidos y colabora en el cuidado de los materiales, espacios y recursos compartidos, mostrando interés por el bienestar común.'],
          age5: ['Interactúa con otros de manera respetuosa, estableciendo relaciones positivas, proponiendo y cumpliendo acuerdos y normas de convivencia, y colaborando en actividades grupales que promueven el bienestar común y el cuidado del entorno.']
        }
      },
      {
        id: 'religion',
        name: 'Construye su identidad como persona humana, amada por Dios',
        capacities: [
          'Conoce a Dios y asume su identidad religiosa y espiritual como persona digna, libre y trascendente.',
          'Cultiva y valora las manifestaciones religiosas de su entorno argumentando su fe de manera comprensible y respetuosa.'
        ],
        standard: 'Realiza acciones por propia iniciativa para agradecer el amor que recibe de su familia y de su entorno. Participa de acciones que muestren su solidaridad y generosidad hacia su prójimo como muestra del amor que recibe de Dios.',
        performances: {
          age3: ['Empieza a colaborar, saludar, y despedirse por iniciativa propia. Participa en las festividades religiosas de sus padres. Disfruta de la creación de Dios. Comparte con todos como amigos de Jesús.'],
          age4: ['Reconoce y expresa, de manera sencilla, el amor de Dios en su vida cotidiana a través de acciones de agradecimiento, respeto y solidaridad; participa con interés en algunas prácticas y celebraciones religiosas de su entorno, y comparte con los demás mostrando actitudes de amistad, generosidad y cuidado, como expresión de su fe.'],
          age5: ['El niño reconoce y expresa el amor de Dios en su vida cotidiana, participando en prácticas religiosas de su entorno familiar o comunidad y muestra actitudes de respeto y solidaridad hacia los demás.']
        }
      }
    ]
  },
  {
    id: 'psicomotriz',
    name: 'Psicomotriz',
    icon: 'Activity',
    competencies: [
      {
        id: 'motricidad',
        name: 'Se desenvuelve de manera autónoma a través de su motricidad',
        capacities: [
          'Comprende su cuerpo',
          'Se expresa corporalmente'
        ],
        standard: 'Se desenvuelve de manera autónoma a través de su motricidad cuando explora y descubre su lado dominante y sus posibilidades de movimiento por propia iniciativa en situaciones cotidianas. Realiza acciones motrices básicas en las que coordina movimientos para desplazarse con seguridad y utiliza objetos con precisión, orientándose y regulando sus acciones en relación a estos, a las personas, el espacio y el tiempo. Expresa corporalmente sus sensaciones, emociones y sentimientos a través del tono, gesto, posturas, ritmo y movimiento en situaciones de juego.',
        performances: {
          age3: ['Realiza diversos movimientos de manera autónoma, explorando las posibilidades de su cuerpo, y de coordinación óculo-manual y óculo-podal en situaciones cotidianas y de acuerdo a sus intereses. Menciona sus sensaciones corporales e identifica algunas necesidades y cambios de su cuerpo. Representa su cuerpo con diversos materiales.'],
          age4: ['Explora y utiliza su cuerpo con mayor autonomía en diversas situaciones de juego y actividad, realizando movimientos y desplazamientos que implican coordinación y equilibrio; manipula objetos con mayor control en acciones óculo-manuales y óculo-podales, orientándose en el espacio con referencia a personas y objetos, y expresa sus sensaciones, emociones y necesidades a través del movimiento, gestos y posturas.'],
          age5: ['Explora y utiliza su cuerpo de manera autónoma para realizar movimientos y acciones diversas, coordinando habilidades motrices básicas, demostrando control y precisión en sus propias acciones, así como al hacer uso de objetos; desarrollando su orientación en el espacio y tiempo, expresando sus emociones a través del movimiento.']
        }
      }
    ]
  },
  {
    id: 'transversales',
    name: 'Competencias Transversales',
    icon: 'Share2',
    competencies: [
      {
        id: 'tics',
        name: 'Se desenvuelve en entornos virtuales generados por las TICs',
        capacities: [
          'Personaliza entornos virtuales',
          'Gestiona información del entorno virtual',
          'Crea objetos virtuales en diversos formatos'
        ],
        standard: 'Se desenvuelve en entornos virtuales generados por las TICs cuando explora y reconoce funciones básicas.',
        performances: {
          age3: ['No se evidencia (----------)'],
          age4: ['No se evidencia (----------)'],
          age5: ['Explora y utiliza, con acompañamiento, diversos entornos virtuales y dispositivos tecnológicos (como tablet, computadora, cámara o grabadora), reconociendo y aplicando sus funciones básicas para buscar y registrar información; personaliza sus producciones y crea objetos virtuales sencillos (imágenes, audios o videos), mostrando cuidado y uso responsable de los recursos tecnológicos.']
        }
      },
      {
        id: 'gestion',
        name: 'Gestiona su aprendizaje de manera autónoma',
        capacities: [
          'Define metas de aprendizaje.',
          'Organiza acciones estratégicas para alcanzar sus metas de aprendizaje.',
          'Monitorea y ajusta su desempeño durante el proceso de aprendizaje.'
        ],
        standard: 'Gestiona su aprendizaje de manera autónoma al definir metas, organizar acciones y monitorear su progreso.',
        performances: {
          age3: ['No se evidencia (----------)'],
          age4: ['No se evidencia (----------)'],
          age5: ['Con apoyo de la docente, define metas sencillas de aprendizaje a partir de sus intereses y experiencias previas; propone y organiza acciones para alcanzar una tarea, monitorea su progreso revisando las estrategias que utiliza y, con ayuda, ajusta su actuación frente a dificultades; comunica lo que aprendió y muestra disposición para aplicar lo aprendido en nuevas situaciones.']
        }
      }
    ]
  }
];
