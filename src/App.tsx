import { useMemo, useState } from 'react';

type Product = {
  name: string;
  price: string;
  image: string;
  tag: string;
  copy: string;
};

type Post = {
  title: string;
  excerpt: string;
  body: string;
};

type SiteData = {
  brand: string;
  shortBrand: string;
  domain: string;
  title: string;
  description: string;
  theme: string;
  accent: string;
  heroImage: string;
  location: string;
  promise: string;
  h1: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  sections: string[][];
  products: Product[];
  posts: Post[];
  faq: string[][];
};

const SITE = {
  "key": "kirkland",
  "dir": "G:\\1.Otros Sitios Web\\minoxidilkirkland\\minoxidilkirkland",
  "brand": "Kirkland Minoxidil Mexico",
  "shortBrand": "Kirkland Mexico",
  "domain": "https://minoxidilkirklandmexico.net/",
  "title": "🔥 Minoxidil Kirkland ORIGINAL CDMX | Resultados Barba en 30 Días | Iztapalapa y Nezahualcóyotl",
  "description": "✅ Minoxidil Kirkland ORIGINAL en CDMX. 🎯 Resultados GARANTIZADOS para barba y cabello. 📍 Sucursal Plaza Guelatao Iztapalapa. 🤝 Entregas personales GRATIS y pago contra entrega en CDMX, Nezahualcóyotl y zona Oriente. 💬 WhatsApp 55-6938-0408",
  "keywords": "minoxidil cdmx, minoxidil kirkland iztapalapa, crecimiento barba cdmx, minoxidil nezahualcóyotl, plaza guelatao minoxidil, tratamiento capilar méxico, minoxidil original, kirkland autentico",
  "theme": "kirkland",
  "accent": "#dc2626",
  "heroImage": "1-mes-minoxidil-kirkland-low-1.jpg",
  "location": "📍 Sucursal Plaza Guelatao, Iztapalapa | Horario: Mar-Dom 12-5 PM",
  "promise": "Entregas personales GRATIS y pago contra entrega en CDMX y Neza para tu seguridad.",
  "h1": "Minoxidil Kirkland ORIGINAL CDMX | Resultados en 30 Días",
  "subtitle": "Productos Kirkland 100% auténticos para el crecimiento de barba y cabello en CDMX, Neza y zona Oriente. Sucursal física en Plaza Guelatao, Iztapalapa.",
  "primaryCta": "Pedir por WhatsApp",
  "secondaryCta": "Autenticidad Garantizada",
  "sections": [
    [
      "Minoxidil Kirkland",
      "Productos Kirkland 100% originales para crecimiento de barba y cabello. Sucursal física."
    ],
    [
      "Original Garantizado",
      "Te decimos qué revisar: caja, botella, lote impreso y holograma para total seguridad."
    ],
    [
      "Entregas Contra Entrega CDMX",
      "Entrega personal gratis en CDMX, Iztapalapa, Nezahualcóyotl y zona Oriente. Recibe, revisa en mano y paga al recibir."
    ]
  ],
  "products": [
    {
      "name": "6 Meses Minoxidil Kirkland Liquido 5",
      "price": "$1,100",
      "image": "6-meses.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Por supuesto, aquí tienes una descripción mejorada para mejorar el SEO del producto: Kirkland para 6 meses de tratamiento 5 Extra Strength: Estimul..."
    },
    {
      "name": "3 Meses Minoxidil Kirkland Liquido 5",
      "price": "$600",
      "image": "3-meses-1.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Tratamiento Kirkland 5 Extra Strength para 3 Meses: Estimula el crecimiento capilar y fortalece tu cabello El Tratamiento Kirkland 5 Extra Strength..."
    },
    {
      "name": "Biotina Natrol de 10,000 Microgramos Con 100 Tabletas | Vitaminas para Cabello y Uñas",
      "price": "$450",
      "image": "biotina-low.jpg",
      "tag": "Biotina",
      "copy": "Biotina Marca Natrol de 10,000 MCG (Diez Mil) 100 Tabletas: Fomenta la salud capilar y promueve un aspecto radiante La Biotina Marca Natrol de 10,0..."
    },
    {
      "name": "1 Mes Minoxidil Kirkland Liquido 5",
      "price": "$250",
      "image": "1-mes-minoxidil-kirkland-low-1.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Por supuesto, aquí tienes una descripción mejorada para mejorar el SEO del producto: Tratamiento Kirkland 5 Extra Strength para 1 Mes: Estimula el ..."
    },
    {
      "name": "Bálsamo Para el Crecimiento de Barba al 12% 4 oz Maximus",
      "price": "$480",
      "image": "balsamo12.jpg",
      "tag": "Balsamo",
      "copy": "¡Nuestro producto para el crecimiento de la barba es la solución que estabas buscando! Es fácil de usar y extremadamente efectivo para estimular el..."
    },
    {
      "name": "Skin Roller 0.5 mm (derma Roller) | Estimulador de Crecimiento Capilar",
      "price": "$240",
      "image": "dermaroller.jpg",
      "tag": "Dermaroller",
      "copy": "Skin Roller (Derma Roller) de 0.5 mm: Tu herramienta versátil para el cuidado de la piel El Skin Roller, también conocido como Derma Roller, es una..."
    },
    {
      "name": "2 Meses Tratamiento Minoxidil Kirkland Líquido 5",
      "price": "$450",
      "image": "2-meses.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Tratamiento Kirkland 5 Extra Strength para 2 Meses: Estimula el crecimiento capilar y fortalece tu cabello El tratamiento Kirkland 5 Extra Strength..."
    },
    {
      "name": "12 Meses Minoxidil Kirkland Liquido 5",
      "price": "$2,000",
      "image": "12-meses.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Kirkland para 12 meses de tratamiento 5 Extra Strength: Estimula el crecimiento capilar y fortalece tu cabello durante todo un año El tratamiento K..."
    },
    {
      "name": "Kit Del Barbon 3 Meses Minoxidil Kirkland Con Biotina Natrol",
      "price": "$1,000",
      "image": "15085827-1340189009347678-3152941011026575360-n-2.jpg",
      "tag": "Kirkland Liquido",
      "copy": "Kit para el cuidado capilar con Biotina de 10,000 mcg de la marca Natrol Descubre el secreto para un cabello más fuerte, grueso y saludable con el ..."
    },
    {
      "name": "Kit Gran Barbon Minoxidil Con Balsamo",
      "price": "$780",
      "image": "3-meses-minoxidil-balsamo-low-1.jpg",
      "tag": "Balsamo",
      "copy": "3 Meses de Minoxidil Kirkland + Balsamo de Bergamota Marca Maximus Beard No hay tratamiento mas Poderoso para Crecimiento de Barba Balsamo Bergamot..."
    },
    {
      "name": "1 Mes Minoxidil Kirkland 5% Foam (espuma) Tratamiento 100% Importado.",
      "price": "$480",
      "image": "6-meses-espuma.jpg",
      "tag": "Espuma Kirkland",
      "copy": "El Minoxidil Kirkland 5% Foam es un tratamiento altamente efectivo para el crecimiento del cabello, especialmente diseñado para combatir la pérdida..."
    },
    {
      "name": "Shampoo Minoxidil Control Caida y Regeneracion de Cabello – 500 Ml.",
      "price": "$280",
      "image": "minoxidil-4.jpg",
      "tag": "Shampoo",
      "copy": "Shampoo con Minoxidil: Tratamiento Eficaz para Prevenir la Caída del Cabello El shampoo con minoxidil es un tratamiento efectivo diseñado para prev..."
    },
    {
      "name": "Kit Crecimiento de Barba 3 Meses Minoxidil + 1 Cera Karite",
      "price": "$700",
      "image": "3-meses-cera-y-minoxidil-low-1.jpg",
      "tag": "Kit Ahorro",
      "copy": "Con este KIT estimulas el crecimiento de La Barba ya que Incluye 3 Meses de Minoxidil Kirkland más Cera de Bergamotas, estos componentes comprobado..."
    },
    {
      "name": "1 Mes – Loción Para el Crecimiento de Barba al 10% + Bergamota Maximus",
      "price": "$349",
      "image": "minoxidil10-md.jpg",
      "tag": "Tratamiento",
      "copy": "¡Nuestro bálsamo para el crecimiento de la barba es la combinación perfecta de Minoxidil y Bergamota, dos poderosos ingredientes que te brindarán l..."
    },
    {
      "name": "Kit de 2 Jabones Crecimiento Para Barba. Arma tu Kit de Jabones",
      "price": "$180",
      "image": "2jabones.jpg",
      "tag": "Jabon",
      "copy": "Promoción Exclusiva: ¡Kit de Jabones de Crecimiento para Barba y Bigote! ¡Con nuestro Kit de Jabones de Crecimiento Maximus, obtendrás los mejores ..."
    },
    {
      "name": "Balsamo Bergamota, Maximus Beard (45 Gr)",
      "price": "$200",
      "image": "bergamotae55539c64f7f56f1.jpg",
      "tag": "Balsamo",
      "copy": "BALSAMO BERGAMOTA (BARBA Y BIGOTE) Balsamo :Hecho a base de productos naturales como la cera de abeja ,vitamina E, aceites esenciales,aceite de coc..."
    },
    {
      "name": "Cera Con Bergamota, Jojoba, Karite Marca Maximus",
      "price": "$160",
      "image": "cera-karite-maximus-low-1.jpg",
      "tag": "Tratamiento",
      "copy": "Nuestra nueva CERA de crecimiento de Barba – Cera de Abeja – Aceite de Jojoba – Aceite de Karite – Aceite de Romero – Aceite de Bergamota – Aceite ..."
    },
    {
      "name": "Aceite Tonico Bergamota Para Barbba y Bigote (citrix) 30 ml Maximus",
      "price": "$180",
      "image": "tonicomaximus.jpg",
      "tag": "Tratamiento",
      "copy": "Aceite de Crecimiento para Barba y Bigote Increible para el empezar el tratamiento de barba"
    },
    {
      "name": "Shampoo Bergamota Crecimiento Acelerado – Maximus 500 Ml.",
      "price": "$280",
      "image": "bergamota-6.jpg",
      "tag": "Shampoo",
      "copy": "Shampoo de Bergamota Maximus: Potente Fórmula para un Cabello Fuerte y Brillante El Shampoo de Bergamota Maximus ofrece una serie de beneficios par..."
    },
    {
      "name": "3 Rimel – Crecimiento de Pestañas y Cejas Minoxidil 5% y Biotina",
      "price": "$700",
      "image": "3pestanas.jpg",
      "tag": "Biotina",
      "copy": "🖤 Rimel de Biotina para Pestañas y Cejas – Pack Doble Transforma tus pestañas y cejas con nuestro increíble Rimel de Biotina, ahora disponible en ..."
    },
    {
      "name": "2 Rimel – Crecimiento de Pestañas y Cejas Minoxidil 5% y Biotina",
      "price": "$480",
      "image": "2pestanas.jpg",
      "tag": "Biotina",
      "copy": "◾️Incluye: 2 Rimels. Cada Rimel dura Aproximadamente 2 Semanas ◾️Los primeros resultados se empiezan a ver al mes de uso constante. ◾️Alarga tus pe..."
    },
    {
      "name": "1 Rimel – Crecimiento de Pestañas y Cejas Minoxidil 5% y Biotina",
      "price": "$250",
      "image": "1pestanas.jpg",
      "tag": "Biotina",
      "copy": "🖤 Rimel de Biotina para Pestañas y Cejas Transforma tus pestañas y cejas con nuestro increíble Rimel de Biotina, diseñado para brindarte resultado..."
    },
    {
      "name": "Pomada Suavecita 113g",
      "price": "$300",
      "image": "suavecita-1.jpg",
      "tag": "Tratamiento",
      "copy": "Pomada Suavecita para Mujeres Inspirada en nuestra icónica Pomada Suavecito Original, la Pomada Suavecita para Mujeres está diseñada específicament..."
    },
    {
      "name": "Bálsamo de Crecimiento de Barba Regrowe",
      "price": "$430",
      "image": "placeholder.jpg",
      "tag": "Balsamo",
      "copy": "Bálsamo estimulante para crecimiento de barba 60ml. para un mes de uso."
    },
    {
      "name": "Cera Para Barba y Bigote – Quioco",
      "price": "$120",
      "image": "24295882-1321911014581181-6595544907237031936-n-1.jpg",
      "tag": "Tratamiento",
      "copy": "CERA PARA BARBA Y BIGOTE Contenido neto: 12g. Elaborada con cera 100 porciento de abeja cuya composición antiséptica e imperecedera."
    },
    {
      "name": "Suavecito Pomade, Firme Hold (4oz)",
      "price": "$310",
      "image": "suavecito-firme-hold-1-1.jpg",
      "tag": "Tratamiento",
      "copy": "Suavecito Pomade Firme Hold (4oz): La Fijación Duradera para Estilos Flexibles La Suavecito Pomade Firme Hold es la elección perfecta para aquellos..."
    },
    {
      "name": "Beardbro Peine y Delineador de Barba",
      "price": "$150",
      "image": "beardpro-1.jpg",
      "tag": "Tratamiento",
      "copy": "Beard Bro Delineado de Barba: Herramienta Patentada para un Recorte Preciso El Beard Bro Delineado de Barba es la herramienta esencial que necesita..."
    },
    {
      "name": "Shampoo Para Barba y Bigote 125 ml",
      "price": "$149",
      "image": "shampoobarba.jpg",
      "tag": "Shampoo",
      "copy": "¡Nuestro Shampoo Maximus para Barba y Bigote está diseñado para brindarte una limpieza profunda y completa, así como una serie de beneficios adicio..."
    },
    {
      "name": "Bálsamo Para el Crecimiento de Barba al 5% 3 oz Maximus",
      "price": "$349",
      "image": "minoxidil5.jpg",
      "tag": "Balsamo",
      "copy": "¡Descubre nuestro revolucionario Bálsamo para el Crecimiento de Barba al 5%! Nuestro bálsamo ha sido diseñado para brindarte resultados efectivos d..."
    },
    {
      "name": "Pomada Matte 113g",
      "price": "$340",
      "image": "mattepomade-1.jpg",
      "tag": "Tratamiento",
      "copy": "¡Presentamos la Pomada Matte de Suavecito! El momento que todos estábamos esperando finalmente ha llegado. Después de innumerables horas en el labo..."
    },
    {
      "name": "Aceite Para la Barba 30 ml",
      "price": "$280",
      "image": "bearoil-1.jpg",
      "tag": "Tratamiento",
      "copy": "Suero para Barba sin Perfume con Aceite de Argán Una barba bien cuidada es una señal de un hombre que se preocupa por su apariencia. Y para lograr ..."
    },
    {
      "name": "Kit de 5 Jabones Crecimiento Para Barba. Arma tu Kit de Jabones",
      "price": "$399",
      "image": "5jabones53aa1978b651f24d-md.jpg",
      "tag": "Jabon",
      "copy": "Jabón de Biotina Maximus ¿Quieres una barba y bigote más gruesos y saludables? Nuestro Jabón de Biotina es tu aliado perfecto. Fabricado artesanalm..."
    },
    {
      "name": "Kit de 4 Jabones Crecimiento Para Barba. Arma tu Kit de Jabones",
      "price": "$360",
      "image": "5jabones.jpg",
      "tag": "Jabon",
      "copy": "Jabón de Biotina Maximus ¡Dale a tu barba y bigote un impulso de crecimiento con nuestro Jabón de Biotina! Fabricado artesanalmente, este jabón con..."
    },
    {
      "name": "Kit de 3 Jabones Crecimiento Para Barba. Arma tu Kit de Jabones",
      "price": "$270",
      "image": "2jabnes-md.jpg",
      "tag": "Jabon",
      "copy": "¡Kit Personalizado de Jabones Maximus para una Barba Poderosa! Promoción Exclusiva: ¡Arma tu Kit como Quieras! ¡Personaliza tu propio Kit de Jabone..."
    },
    {
      "name": "Shampoo Biotina Engrosar y Fortalecimiento – Maximus 500 ml | Vitaminas para Cabello y Uñas",
      "price": "$280",
      "image": "biotina-4.jpg",
      "tag": "Biotina",
      "copy": "Shampoo de Biotina Maximus: Potenciado con Vitamina H para un Cabello Más Fuerte y Brillante El Shampoo de Biotina Maximus es una poderosa fórmula ..."
    },
    {
      "name": "Shampoo Coco Anticaspa – Maximus – 500ml",
      "price": "$280",
      "image": "coco-2.jpg",
      "tag": "Shampoo",
      "copy": "Shampoo de Coco: Acondicionador Versátil para Todo Tipo de Cabello y Edades El shampoo de coco es un acondicionador ideal para todo tipo de cabello..."
    },
    {
      "name": "Black Gel – Quioco 120 gr",
      "price": "$280",
      "image": "27699746-1605531729496286-2423651063040049152-n-1.jpg",
      "tag": "Tratamiento",
      "copy": "Quio’co BLACK GEL Contenido neto 120g. Gel negro, especial para matizar el vello facial negro profundo. Ideal para tapar canas, vello claros y pigm..."
    },
    {
      "name": "Bálsamo Estimulante – Quioco 60 Grs",
      "price": "$330",
      "image": "27056483-1703564416368719-4205933315443654656-n-1.jpg",
      "tag": "Balsamo",
      "copy": "BÁLSAMO ESTIMULANTE Contenido neto: 60g."
    },
    {
      "name": "Jabon Cubrir Huecos y Suavizante – Menta y Abeja – Maximus 100 gr",
      "price": "$100",
      "image": "23588073-1748057078599983-1398711483545681920-n-2.png",
      "tag": "Jabon",
      "copy": "Jabón de Miel y Hierbabuena El jabón de Miel y es excelente para el crecimiento de barba crezca más rápido, es porque esta planta tiene propiedades..."
    },
    {
      "name": "Jabon Exfoliante y Afeitar – Avena – Maximus 100 gr",
      "price": "$100",
      "image": "23589763-1881736265200564-283622778186235904-n-1.png",
      "tag": "Jabon",
      "copy": "Este super jabón Maximus esta hecho con coco es un superalimento para tu vello facial y piel. El jabón contiene esa vitamina E que tanto necesita t..."
    },
    {
      "name": "Jabón de Crecimiento – Bergamota – Maximus 100 gr",
      "price": "$100",
      "image": "23589433-1578956302152272-82586577515053056-n-1.jpg",
      "tag": "Jabon",
      "copy": "Jabón de Bergamota El “Jabón Maximus Bergamota” uno de nuestros producto estrella, si tienes huecos o no te sale casi nada de barba este jabón está..."
    },
    {
      "name": "Suavecito Pomade, Original (4oz)",
      "price": "$300",
      "image": "suavecito-original.jpg",
      "tag": "Tratamiento",
      "copy": "Suavecito Pomade Original (4oz): La Fijación Perfecta para Estilos Flexibles La Suavecito Pomade Original es la opción ideal para aquellos que busc..."
    }
  ],
  "imageSet": [
    "1-mes-minoxidil-kirkland-low-1.jpg",
    "2-meses.jpg",
    "3-meses-1.jpg",
    "6-meses.jpg",
    "12-meses.jpg",
    "6-meses-espuma.jpg",
    "diseno-sin-titulo-1.jpg",
    "minoxidil5.jpg",
    "minoxidil10-md.jpg"
  ],
  "posts": [
    {
      "title": "Minoxidil Kirkland original: que revisar primero",
      "excerpt": "Empieza por lo visible: caja, botella, etiqueta, lote y coherencia de la presentacion. No necesitas ser experto, pero si poner atencion.",
      "body": "Empieza por lo visible: caja, botella, etiqueta, lote y coherencia de la presentacion. No necesitas ser experto, pero si poner atencion. Si el vendedor no puede explicar que vende, ahi ya tienes una respuesta."
    },
    {
      "title": "Kirkland liquido 5%: para quien conviene",
      "excerpt": "El liquido es el clasico porque rinde bien y suele tener mejor precio. Conviene a quien no se complica con aplicacion and puede dejar secar.",
      "body": "El liquido es el clasico porque rinde bien y suele tener mejor precio. Conviene a quien no se complica con aplicacion and puede dejar secar. Si odias sensacion liquida, tal vez la espuma te acomode mejor."
    },
    {
      "title": "Kirkland espuma: cuando vale pagar mas",
      "excerpt": "La espuma suele gustar por secado y textura. No es magia ni necesariamente \"mas fuerte\".",
      "body": "La espuma suele gustar por secado y textura. No es magia ni necesariamente \"mas fuerte\". Vale la pena si tu rutina necesita algo mas comodo o si el liquido te molesta demasiado en la piel."
    },
    {
      "title": "1, 3, 6 o 12 meses: como pensar el paquete",
      "excerpt": "Un mes prueba disciplina. Tres meses ya permiten revisar avance con mas sentido.",
      "body": "Un mes prueba disciplina. Tres meses ya permiten revisar avance con mas sentido. Seis meses bajan vueltas. Doce meses son para quien ya sabe que no va a abandonar. Elige por constancia, no por impulso."
    },
    {
      "title": "Por que Kirkland se busca tanto en Mexico",
      "excerpt": "Porque es una marca conocida, facil de identificar y con presentaciones populares. Justo por eso tambien se presta a copias y vendedores improvisados.",
      "body": "Porque es una marca conocida, facil de identificar y con presentaciones populares. Justo por eso tambien se presta a copias y vendedores improvisados. Comprar Kirkland exige revisar mas, no menos."
    }
  ],
  "faq": [
    [
      "¿El Minoxidil Kirkland es original en CDMX?",
      "✅ SÍ, vendemos Minoxidil Kirkland 100% ORIGINAL importado directamente. Garantizamos autenticidad con factura y garantía. Ubicados en Plaza Guelatao, Iztapalapa."
    ],
    [
      "¿En cuánto tiempo veo resultados con Minoxidil?",
      "🎯 La mayoría de nuestros clientes ven resultados visibles en 4-8 semanas. Aplicación diaria constante es clave. Resultados completos en 3-6 meses."
    ],
    [
      "¿Hacen entregas personales en CDMX y Neza?",
      "🤝 ¡SÍ! Ofrecemos entregas personales GRATIS en Iztapalapa, Nezahualcóyotl, Los Reyes La Paz, Chalco e Ixtapaluca. No arriesgues tu dinero depositando antes por internet; te entregamos físicamente, revisas tu producto en mano y pagas contra entrega."
    ],
    [
      "¿Hacen envíos al resto de México?",
      "📦 Sí. Enviamos a toda la República con tarifa fija de $140 MXN, incluyendo zonas extendidas o de difícil acceso (como Michoacán Buenavista CP 60700/Apatzingán CP 60600/Lázaro Cárdenas CP 60950, Guerrero Tlapa CP 41300/Ometepec CP 41700, Oaxaca Pinotepa Nacional CP 71600/Juchitán CP 70000, Chiapas Ocosingo CP 29950/Motozintla CP 30900, Sierra de Chihuahua Guachochi CP 33180/Guadalupe y Calvo CP 33470, etc.) vía FedEx/Estafeta."
    ],
    [
      "¿Atienden en sucursal física?",
      "📍 SÍ, sucursal en Plaza Guelatao, Iztapalapa. Local 76. Horario: Martes a Domingo, 12 PM - 5 PM. WhatsApp: 55-6938-0408"
    ]
  ]
} as SiteData;
const WHATSAPP = 'https://wa.me/525569380408?text=' + encodeURIComponent('Hola, quiero mas informacion de ' + SITE.brand);

function App() {
  const [activePost, setActivePost] = useState(0);
  const [activeVerifyStep, setActiveVerifyStep] = useState(0);
  const [catalogFilter, setCatalogFilter] = useState('kirkland'); // 'kirkland', 'all', 'others'
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
    }, 1200);
  };

  const selectedPost = SITE.posts[activePost];

  const filteredProducts = useMemo(() => {
    if (catalogFilter === 'kirkland') {
      return SITE.products.filter(p => /kirkland|espuma/i.test(p.name));
    } else if (catalogFilter === 'others') {
      return SITE.products.filter(p => !/kirkland|espuma/i.test(p.name));
    }
    return SITE.products;
  }, [catalogFilter]);

  const verifySteps = [
    {
      title: 'Lote Grabado a Laser',
      detail: 'Las botellas legitimas de Kirkland tienen el lote impreso en amarillo o grabado directamente en la base en la parte inferior trasera. Este lote debe coincidir con el codigo impreso en la parte inferior de la caja de carton de 6 botellas.',
      highlight: 'Lote y caja coincidente.'
    },
    {
      title: 'Tapa Presiona y Gira',
      detail: 'La tapa cuenta con un sistema child-proof rigido contra niños. Para abrir, se debe presionar con fuerza hacia abajo antes de girar. La tipografia de la tapa original esta grabada con relieve limpio y el anillo inferior de plastico se rompe en el primer uso.',
      highlight: 'Tapa child-proof con relieve.'
    },
    {
      title: 'Consistencia y Microcristales',
      detail: 'El minoxidil al 5% liquido es transparente o ligeramente amarillento y tiene olor a alcohol y propilenglicol. Ante bajas temperaturas durante su importacion, puede presentar pequeños cristales al fondo que se disuelven facilmente agitando a temperatura ambiente.',
      highlight: 'Solucion saturada al 5%.'
    },
    {
      title: 'Tipografia de Etiquetas',
      detail: 'Las etiquetas traseras del producto original son de papel adhesivo de alta calidad con textos nítidos en español e inglés. No deben tener bordes borrosos, textos pixelados ni colores opacos. El código de barras y advertencias son perfectamente legibles.',
      highlight: 'Textos y barras nitidos.'
    }
  ];

  return (
    <main className="site theme-kirkland">
      {/* HEADER */}
      <header className="header">
        <a className="brand" href="#inicio" aria-label={SITE.brand}>
          <span className="logo-k">K</span>
          <strong>{SITE.brand}</strong>
        </a>
        <nav>
          <a href="#autenticidad">Autenticidad</a>
          <a href="#productos">Catalogo</a>
          <a href="#sucursal">Sucursales</a>
          <a href="/sucursales.html">Pagina sucursales</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#testimonios">Testimonios</a>
          <a href="#blog">Blog</a>
          <a href="#preguntas">FAQ</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="mini-wa" href={WHATSAPP}>WhatsApp</a>
      </header>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">{SITE.location}</p>
          <h1>{SITE.h1}</h1>
          <p className="lead">{SITE.subtitle}</p>
          <div className="hero-actions">
            <a className="button primary" href={WHATSAPP}>{SITE.primaryCta}</a>
            <a className="button secondary" href="#autenticidad">{SITE.secondaryCta}</a>
          </div>
        </div>
        <div className="hero-media">
          <img src={`/site-images/${SITE.heroImage}`} alt={SITE.brand} />
          <div className="hero-note">
            <strong>{SITE.shortBrand}</strong>
            <span>{SITE.promise}</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN INTERACTIVA DE AUTENTICIDAD (BENTO GRID) */}
      <section className="autenticidad" id="autenticidad">
        <div className="section-heading">
          <p className="eyebrow">Control de Calidad</p>
          <h2>Guia Interactiva de Originalidad</h2>
          <p>Aprende a diferenciar el Kirkland original de imitaciones baratas con estos cuatro puntos clave de seguridad.</p>
        </div>
        <div className="verify-bento">
          <div className="verify-nav">
            {verifySteps.map((step, idx) => (
              <button 
                key={step.title}
                className={activeVerifyStep === idx ? 'active' : ''}
                onClick={() => setActiveVerifyStep(idx)}
              >
                <span>0{idx + 1}</span>
                <strong>{step.title}</strong>
                <small>{step.highlight}</small>
              </button>
            ))}
          </div>
          <div className="verify-details-card">
            <h3>{verifySteps[activeVerifyStep].title}</h3>
            <p>{verifySteps[activeVerifyStep].detail}</p>
            <div className="details-badge">Validado por Distribuidor Autorizado</div>
            <a className="button primary" href={WHATSAPP}>Pedir fotos reales de lote actual</a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PRODUCTOS CON FILTRO */}
      <section className="products" id="productos">
        <div className="section-heading">
          <p className="eyebrow">Tratamientos</p>
          <h2>Selecciona tu tratamiento original</h2>
          <p>Disponemos del catalogo completo de Minoxidil en CDMX. Filtra para ver las opciones Kirkland o productos complementarios.</p>
          
          <div className="catalog-tabs">
            <button className={catalogFilter === 'kirkland' ? 'active' : ''} onClick={() => setCatalogFilter('kirkland')}>
              Minoxidil Kirkland
            </button>
            <button className={catalogFilter === 'all' ? 'active' : ''} onClick={() => setCatalogFilter('all')}>
              Todo el Catalogo
            </button>
            <button className={catalogFilter === 'others' ? 'active' : ''} onClick={() => setCatalogFilter('others')}>
              Jabones y Complementos
            </button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <img src={`/site-images/${product.image}`} alt={product.name} />
                <b>{product.tag}</b>
              </div>
              <div className="product-body">
                <h3>{product.name}</h3>
                <p>{product.copy}</p>
                <div className="product-buy">
                  <strong>{product.price}</strong>
                  <a href={WHATSAPP}>Pedir por WhatsApp</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COBERTURA DE ENTREGAS */}
      <section className="cobertura" id="cobertura">
        <div className="section-heading">
          <p className="eyebrow">Logística y Cobertura</p>
          <h2>Entregas Personales y Envíos Nacionales</h2>
          <p>Ofrecemos entregas personales gratis y pago contra entrega en CDMX y EdoMex para tu total seguridad (sin depósitos previos). Para el resto del país, envíos por paquetería con tarifa fija de $140 MXN.</p>
        </div>
        <div className="cobertura-grid">
          <div className="cobertura-card cdmx">
            <h3>📍 CDMX e Iztapalapa</h3>
            <ul className="cobertura-list">
              <li><strong>Iztapalapa</strong> (Entrega Gratis)</li>
              <li>Xochimilco</li>
              <li>Tláhuac</li>
              <li>Coyoacán</li>
              <li>Benito Juárez</li>
              <li>Venustiano Carranza</li>
            </ul>
            <div className="cobertura-time">🕒 Entrega Personal: 1-2 días hábiles</div>
          </div>
          
          <div className="cobertura-card edomex">
            <h3>📍 Nezahualcóyotl y EdoMex</h3>
            <ul className="cobertura-list">
              <li><strong>Nezahualcóyotl</strong> (Entrega Gratis)</li>
              <li>Ecatepec</li>
              <li>Los Reyes</li>
              <li>Chimalhuacán</li>
              <li>La Paz</li>
              <li>Texcoco</li>
            </ul>
            <div className="cobertura-time">🕒 Entrega Personal: 1-2 días hábiles</div>
          </div>

          <div className="cobertura-card nacional" style={{ border: '1px solid rgba(220, 38, 38, 0.3)', background: 'rgba(220, 38, 38, 0.02)' }}>
            <h3>📦 Envío Nacional Fijo $140</h3>
            <ul className="cobertura-list">
              <li><strong>Tarifa Plana a Todo México</strong></li>
              <li>Michoacán: Buenavista (60700), Apatzingán (60600), Lázaro Cárdenas (60950)</li>
              <li>Guerrero: Tlapa (41300), Ometepec (41700), Costa Chica</li>
              <li>Oaxaca: Pinotepa Nacional (71600), Juchitán (70000)</li>
              <li>Chiapas: Ocosingo (29950), Motozintla (30900)</li>
              <li>Chihuahua: Guachochi (33180), Guadalupe y Calvo (33470)</li>
              <li>FedEx / Estafeta / Redpack con guía de rastreo</li>
            </ul>
            <div className="cobertura-time">🕒 Envíos: 2-5 días hábiles con guía</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonios" id="testimonios">
        <div className="section-heading">
          <p className="eyebrow">Opiniones reales</p>
          <h2>Lo que dicen nuestros clientes</h2>
          <p>Resultados reales y opiniones de compradores de CDMX y Nezahualcóyotl.</p>
        </div>
        <div className="testimonios-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Excelente servicio en Iztapalapa. Mi barba creció increíblemente con el Kirkland que compré aquí. 100% recomendado."</p>
            <div className="user">
              <strong>Carlos M.</strong>
              <span>Iztapalapa, CDMX</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"La entrega en Nezahualcóyotl fue súper rápida. El producto es original y ya veo resultados. Muy profesionales."</p>
            <div className="user">
              <strong>Javier R.</strong>
              <span>Nezahualcóyotl, EdoMex</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="quote">"Compré para mi esposo y los resultados han sido excelentes. La atención por WhatsApp es muy buena."</p>
            <div className="user">
              <strong>María L.</strong>
              <span>Xochimilco, CDMX</span>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog" id="blog">
        <div className="section-heading align-left">
          <p className="eyebrow">Blog de Kirkland</p>
          <h2>Notas y Resolucion de Mitos sobre Kirkland</h2>
          <p>Informacion basada en ciencia, lotes de importacion y uso responsable.</p>
        </div>
        <div className="blog-layout">
          <div className="blog-list">
            {SITE.posts.map((post, index) => (
              <button className={activePost === index ? 'active' : ''} key={post.title} onClick={() => setActivePost(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{post.title}</strong>
                <small>{post.excerpt}</small>
              </button>
            ))}
          </div>
          <article className="post-reader">
            <p className="eyebrow">Analisis del Articulo</p>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
            <a className="button primary" href={WHATSAPP}>Consultar por este tema</a>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="preguntas">
        <div className="section-heading">
          <p className="eyebrow">Preguntas Frecuentes</p>
          <h2>Respuestas rapidas y sin rodeos</h2>
        </div>
        <div className="faq-grid">
          {SITE.faq.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SUCURSALES */}
      <section className="sucursal-section" id="sucursal">
        <div className="section-heading">
          <p className="eyebrow">🛡️ Compra Kirkland 100% Auténtico y Seguro</p>
          <h2>Puntos de Recolección Física y Contra Entrega</h2>
          <p>No pongas en riesgo tu dinero depositando por adelantado en páginas web dudosas o esperando envíos locales lentos que pueden perderse. Te invitamos a recoger tu Minoxidil Kirkland original directamente en nuestras instalaciones físicas. Podrás revisar el sellado original de fábrica, lote de importación y fecha de caducidad con el producto en mano antes de realizar tu pago contra entrega.</p>
          <a className="button secondary" href="/sucursales.html">Ver pagina dedicada de sucursales</a>
        </div>
        
        <div className="sucursales-grid">
          <div className="sucursal-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Plaza Guelatao (Iztapalapa / CDMX)</h3>
            <p className="address" style={{ flexGrow: 1, fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Dirección:</strong> Calz. Ignacio Zaragoza 406, Juan Escutia, Iztapalapa, 09100 Ciudad de México, CDMX.<br />
              <span className="detalles-tienda" style={{ display: 'inline-block', marginTop: '6px' }}>Dentro de Plaza Guelatao, Local 76, Pasillo 5. Local comercial físico establecido.</span>
            </p>
            <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', padding: '12px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.88rem', color: '#16a34a' }}>
              <strong style={{ color: '#15803d', display: 'block', marginBottom: '4px' }}>🏬 Recolección Directa en Tienda:</strong>
              Ven directamente a nuestro local dentro de la Plaza. Nuestro personal te atenderá en persona, podrás inspeccionar tu Minoxidil Kirkland y pagar de forma segura en efectivo o transferencia rápida al momento de recibirlo.
            </div>
            <div className="map-container" style={{ marginBottom: '16px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.0822180862024!2d-99.02517622387796!3d19.397023881874288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e2334005b757%3A0xb3cf516ea278f244!2sPlaza%20Guelatao!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx"
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Plaza Guelatao"
              ></iframe>
            </div>
            <a className="button primary block" href={'https://wa.me/525569380408?text=' + encodeURIComponent('Hola, me interesa agendar recolección personal de Minoxidil Kirkland en la sucursal de Plaza Guelatao.')}>
              Agendar Recolección en Plaza Guelatao
            </a>
          </div>
          
          <div className="sucursal-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Oficinas en Neza (EdoMex)</h3>
            <p className="address" style={{ flexGrow: 1, fontSize: '0.92rem', lineHeight: '1.6' }}>
              <strong>Dirección:</strong> Oriente 10 #224, Colonia Reforma, 57840 Ciudad Nezahualcóyotl, Estado de México.<br />
              <span className="detalles-tienda" style={{ display: 'inline-block', marginTop: '6px' }}>Punto de distribución oficial para recolecciones y entregas rápidas de Kirkland.</span>
            </p>
            <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', padding: '12px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.88rem', color: '#16a34a' }}>
              <strong style={{ color: '#15803d', display: 'block', marginBottom: '4px' }}>🏢 Recolección Física en Oficinas:</strong>
              Ven por tu tratamiento original de Minoxidil Kirkland directamente a nuestras oficinas en Neza. Te entregamos tu tratamiento en mano para que lo verifiques antes de pagar de forma directa.
            </div>
            <div className="map-container" style={{ marginBottom: '16px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.120015949581!2d-99.01426462387802!3d19.395350381875416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e25d2b70f0ab%3A0xc3b84ca3b006a8f1!2sOte.%2010%20224%2C%20Reforma%2C%2057840%20Ciudad%20Nezahualc%C3%B3yotl%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx"
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Oficinas en Neza"
              ></iframe>
            </div>
            <a className="button primary block" href={'https://wa.me/525569380408?text=' + encodeURIComponent('Hola, me interesa agendar recolección personal de Minoxidil Kirkland en las oficinas de Neza.')}>
              Agendar Recolección en Neza
            </a>
          </div>

          <div className="sucursal-card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid #dc2626', background: '#1c1f26' }}>
            <div className="badge-oriente" style={{ background: '#dc2626', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem', alignSelf: 'flex-start', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              🔥 Zona Oriente - Entregas Personales Gratis
            </div>
            <h3 style={{ color: '#fff' }}>Entregas Personales en Chalco, La Paz, Ixtapaluca, Neza e Iztapalapa</h3>
            <p className="address" style={{ flexGrow: 1, fontSize: '0.92rem', lineHeight: '1.6', color: '#9ca3af' }}>
              Si vives en el Estado de México Oriente, las paqueterías suelen cobrarte tarifas de "zona extendida" y tardar días. Nosotros te entregamos <strong>hoy mismo</strong> en mano y <strong>sin costo de entrega</strong> en: <br />
              • <strong>Chalco:</strong> Plaza Sendero Chalco, Plaza Cortijo y Centro de Chalco (Kiosco principal).<br />
              • <strong>Los Reyes La Paz:</strong> Estación Metro La Paz (Línea A), Plaza La Paz.<br />
              • <strong>Ixtapaluca:</strong> Plaza Sendero Ixtapaluca (área de comida o entrada principal) y Galerías Ixtapaluca.<br />
              • <strong>Ciudad Neza:</strong> Av. Chimalhuacán, Plaza Ciudad Jardín, Metro Nezahualcóyotl o Metro Impulsora.<br />
              • <strong>Iztapalapa:</strong> Metro Guelatao, Metro Tepalcates, Metro Constitución de 1917 y zonas colindantes.
            </p>
            <div style={{ background: '#111827', border: '1px solid rgba(220, 38, 38, 0.3)', padding: '12px 14px', borderRadius: '6px', marginBottom: '14px', fontSize: '0.88rem', color: '#f3f4f6' }}>
              <strong style={{ color: '#ef4444', display: 'block', marginBottom: '4px' }}>🤝 Pago Contra Entrega en Mano:</strong>
              Nos vemos en un punto público y seguro. Inspeccionas tu tratamiento de Minoxidil Kirkland original, confirmas sellos de fábrica y caducidad, y pagas en mano por transferencia o efectivo al recibir. ¡Cero anticipos!
            </div>
            <div className="map-container" style={{ marginBottom: '16px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15065.733560641209!2d-98.92429402517173!3d19.262523281878345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1e672728f11b%3A0x6a090b8fca2066c0!2sPlaza%20Sendero%20Ixtapaluca!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx"
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Puntos de Entrega Oriente"
              ></iframe>
            </div>
            <a className="button primary block" href={'https://wa.me/525569380408?text=' + encodeURIComponent('Hola, vivo en la zona Oriente y quiero agendar una entrega personal contra entrega de Minoxidil Kirkland.')}>
              Agendar Entrega en Oriente
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contacto-section" id="contacto">
        <div className="contacto-container">
          <div className="contacto-info">
            <p className="eyebrow">Contacto Kirkland Mexico</p>
            <h2>Información de Contacto General</h2>
            <p>Estamos para servirte. Contáctanos por cualquiera de estos medios o envíanos un mensaje directo.</p>
            
            <div className="info-detalles">
              <div className="info-item">
                <strong>WhatsApp</strong>
                <span><a href={WHATSAPP} style={{ color: 'var(--accent)', fontWeight: 800 }}>55-6938-0408</a></span>
              </div>
              <div className="info-item">
                <strong>Email</strong>
                <span>ventaminoxidilmexico@gmail.com</span>
              </div>
              <div className="info-item">
                <strong>Horario</strong>
                <span>Mar-Dom, 12PM - 5PM</span>
              </div>
            </div>
          </div>
          
          <div className="contacto-form-card">
            <h3>Envíanos un Mensaje</h3>
            <p className="form-sub">¿Tienes alguna pregunta? Nos encantaría ayudarte.</p>
            
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    placeholder="Tu nombre" 
                    required 
                    value={formData.nombre} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="tu@email.com" 
                    required 
                    value={formData.email} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <select 
                  id="asunto" 
                  name="asunto" 
                  required 
                  value={formData.asunto} 
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona un tema</option>
                  <option value="Consulta sobre Barba">Consulta sobre crecimiento de barba</option>
                  <option value="Consulta sobre Cabello">Consulta sobre crecimiento de cabello</option>
                  <option value="Duda sobre Envío">Duda sobre envío express o nacional</option>
                  <option value="Duda sobre Originalidad">Duda sobre originalidad y lotes</option>
                  <option value="Otro Asunto">Otro asunto</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea 
                  id="mensaje" 
                  name="mensaje" 
                  rows={4} 
                  placeholder="Escribe tu mensaje aquí..." 
                  required 
                  value={formData.mensaje} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button type="submit" className="button primary block" disabled={formStatus === 'sending'}>
                {formStatus === 'idle' && 'Enviar Mensaje'}
                {formStatus === 'sending' && 'Enviando...'}
                {formStatus === 'success' && '¡Mensaje Enviado con Éxito! ✓'}
              </button>
              
              {formStatus === 'success' && (
                <div className="form-success-alert">
                  <p>¡Gracias por escribirnos, <strong>{formData.nombre}</strong>!</p>
                  <p>Te responderemos a <strong>{formData.email}</strong> o WhatsApp lo antes posible.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <strong>{SITE.brand}</strong>
          <p>Distribucion especializada de Kirkland Minoxidil 5% original en Mexico. Informacion transparente para tu cuidado personal.</p>
        </div>
        <div>
          <a href="#autenticidad">Autenticidad</a>
          <a href="#productos">Catalogo</a>
          <a href="#sucursal">Sucursales</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#blog">Blog</a>
          <a href="#contacto">Contacto</a>
        </div>
      </footer>
      <a className="float-wa" href={WHATSAPP}>WhatsApp</a>
    </main>
  );
}

export default App;
