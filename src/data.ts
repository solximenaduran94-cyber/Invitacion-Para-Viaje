/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DestinationDetails } from './types';

export const DESTINATIONS: DestinationDetails[] = [
  {
    id: 'calafate',
    title: 'El Calafate',
    province: 'Santa Cruz, Patagonia',
    poeticSubtitle: 'La Catedral del Silencio y los Hielos Eternos',
    description: 'Donde el viento esculpe gigantes celestes y la inmensidad invita al asombro.',
    paragraphs: [
      'Allí donde la tierra se desvanece para dar paso al misterio del azul eterno, se alza un santuario esculpido por el tiempo. En El Calafate, los glaciares no son solo hielo; son el pulso pausado de la Tierra, monumentos de cristal que cantan su propia balada milenaria con cada quiebre y desprendimiento.',
      'Caminar juntos ante estas murallas sagradas es descubrir una belleza pura e incontaminada, un paisaje que inspira solemnidad y que, en su frío místico, nos invita a buscar el abrigo cálido en la cercanía del otro, contemplando el amanecer dorado encender las agujas de piedra y los campos helados.'
    ],
    imageSrc: '/images/calafate_glacier_1781636469547.jpg',
    themeColor: 'from-[#e0f2fe] via-[#bbeeeb] to-[#0c4a6e]',
    accentColor: '#0284c7',
    highlights: [
      'Caminar de la mano contemplando la inmensidad infinita del Glaciar Perito Moreno.',
      'Escuchar el místico estruendo de los gigantes de hielo al entregarse al lago.',
      'Navegar entre témpanos de cristal turquesa flotando en las aguas del Lago Argentino.',
      'Brindar con un licor de calafate helado mientas la tarde pinta de rosa las cumbres.'
    ],
    poeticQuote: '“En el susurro de la estepa y la mirada azul del glaciar, el mundo aguarda en calma, para que solo existamos nosotros.”',
    activities: [
      {
        title: 'Navegación "Todo Glaciares"',
        subtitle: 'Un crucero azul entre témpanos gigantes',
        description: 'Embarcaremos juntos en un moderno catamarán para surcar las aguas turquesas del Lago Argentino. Navegaremos rodeados de imponentes icebergs a la deriva, contemplando de cerca las colosales murallas celestes de los glaciares Spegazzini y Upsala.',
        imageSrc: '/images/calafate_glaciers_boat_1781637181596.jpg'
      },
      {
        title: 'Gastronomía en "Nativo Experience"',
        subtitle: 'Cena a la luz de las velas dentro de una mística cueva patagónica',
        description: 'Una noche bajo el amparo de la roca viva de la estepa. Al atardecer, nos refugiaremos en una cueva patagónica templada por calefactores y velas, para disfrutar de un menú gourmet de tres pasos con carnes locales y vinos finos, contemplando el lago suspendido en la penumbra.',
        imageSrc: '/images/calafate_cave_dining_1781637192828.jpg'
      },
      {
        title: 'Minitrekking sobre el Glaciar',
        subtitle: 'Ruta de Hielo y aventura en el Perito Moreno',
        description: 'Una expedición legendaria. Equipados con grampones y tomados de la mano, caminaremos sobre las ondulaciones vítreas del imponente Glaciar Perito Moreno, explorando grietas, lagunas celestes y sumideros helados en una aventura inolvidable.',
        imageSrc: '/images/calafate_ice_trekking_1781637204095.jpg'
      }
    ]
  },
  {
    id: 'bariloche',
    title: 'San Carlos de Bariloche',
    province: 'Río Negro, Patagonia',
    poeticSubtitle: 'El Refugio de los Bosques Mágicos y el Fuego',
    description: 'Donde los lagos espejados dibujan montañas y el calor del hogar te espera.',
    paragraphs: [
      'Enmarcado en bosques de cuentos de hadas que parecen creados a pinceladas, Bariloche es el cantar de las aguas transparentes y las cumbres protectoras. Sus caminos huelen a pino, ciprés y chocolate recién fundido; un rincón patagónico donde el invierno teje una alfombra blanca sobre la cual caminar cobijados.',
      'Es un destino hecho para la complicidad de las tardes templadas por el fuego de una chimenea, para perderse entre senderos mágicos de arrayanes color canela y para contemplar el atardecer tiñendo el Nahuel Huapi de violetas y dorados memorables.'
    ],
    imageSrc: '/images/bariloche_lake_1781636484395.jpg',
    themeColor: 'from-[#ffedd5] via-[#fed7aa] to-[#7c2d12]',
    accentColor: '#ea580c',
    highlights: [
      'Ascender juntos a las cumbres para tocar el cielo con las manos sobre lagos infinitos.',
      'Caminar el sendero de los arrayanes dorados, oyendo el secreto que guardan sus hojas.',
      'Estar bien abrigados compartiendo una taza de chocolate caliente frente al hogar a leña.',
      'Recorrer rincones alpinos sintiendo la mística de los bosques nevados bajo el crepúsculo.'
    ],
    poeticQuote: '“Donde el aroma a leña encendida y la complicidad de las copas de chocolate caliente transforman el frío patagónico en el abrazo eterno de nuestro viaje.”',
    activities: [
      {
        title: 'Refugio Neumeyer: Caminata Laguna Congelada',
        subtitle: 'Aventura invernal en bosques blancos',
        description: 'Una travesía guiada caminando con raquetas sobre el manto blanco del bosque nativo. Avanzaremos entre copas de lengas cargadas de nieve y arroyos cordilleranos helados, hasta descubrir la majestuosa mística de una laguna totalmente congelada.',
        imageSrc: '/images/bariloche_caminata_1781637569506.jpg'
      },
      {
        title: 'La Cueva Catedral: Travesía & Sabores nocturnos',
        subtitle: 'Adrenalina en motos de nieve y cena alpina',
        description: 'Una excursión legendaria bajo las estrellas. Conduciremos potentes motos de nieve cruzando el bosque silencioso del cerro, para refugiarnos finalmente en una cálida cueva iluminada por antorchas y fogones, deleitándonos con sabores gourmet de la Patagonia.',
        imageSrc: '/images/bariloche_snowmobiles_1781637552893.jpg'
      },
      {
        title: 'Experiencia Patagónica WineHouse',
        subtitle: 'Maridaje de Quesos & Vinos finos',
        description: 'Una velada íntima de sabores refinados en el cálido corazón de San Carlos de Bariloche. Compartiremos una degustación guiada de vinos boutique, perfectamente armonizados con quesos regionales artesanales, fiambres ahumados y chocolates.',
        imageSrc: '/images/bariloche_winehouse_1781637584869.jpg'
      }
    ]
  }
];
