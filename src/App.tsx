import { useMemo, useState, useEffect } from 'react';

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
  category?: string;
  date: string;
};

type SiteData = {
  brand: string;
  shortBrand: string;
  domain: string;
  title: string;
  description: string;
  heroImage: string;
  location: string;
  promise: string;
  h1: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  products: Product[];
  posts: Post[];
  faq: string[][];
};

const SITE = {
  brand: "Kirkland Minoxidil Mexico",
  shortBrand: "Kirkland Mexico",
  domain: "https://minoxidilkirklandmexico.net/",
  title: "Minoxidil Kirkland ORIGINAL CDMX | Resultados Barba en 30 Dias | Iztapalapa y Neza",
  description: "Minoxidil Kirkland ORIGINAL en CDMX. Resultados GARANTIZADOS para barba y cabello. Sucursal Plaza Guelatao Iztapalapa. Entregas personales GRATIS y pago contra entrega en CDMX, Nezahualcoyotl y zona Oriente.",
  heroImage: "1-mes-minoxidil-kirkland-low-1.jpg",
  location: "Sucursal Plaza Guelatao, Iztapalapa | Mar-Dom 12-5 PM",
  promise: "Entregas personales GRATIS y pago contra entrega en CDMX y Neza.",
  h1: "Minoxidil Kirkland Original en CDMX",
  subtitle: "Producto 100% autentico para crecimiento de barba y cabello. Sucursal fisica en Plaza Guelatao, Iztapalapa. Entregas personales gratis con pago contra entrega.",
  primaryCta: "Pedir por WhatsApp",
  secondaryCta: "Ver Autenticidad Garantizada",
  products: [
    { name: "6 Meses Minoxidil Kirkland Liquido 5", price: "$1,100", image: "6-meses.jpg", tag: "Mas Vendido", copy: "Tratamiento completo de 6 meses. El paquete mas popular: mejor precio por botella, sin interrupciones." },
    { name: "3 Meses Minoxidil Kirkland Liquido 5", price: "$600", image: "3-meses-1.jpg", tag: "Recomendado", copy: "Tres meses de tratamiento continuo. Ideal para medir avances reales y establecer rutina." },
    { name: "Biotina Natrol 10,000 MCG 100 Tabletas", price: "$450", image: "biotina-low.jpg", tag: "Complemento", copy: "Apoyo nutricional para cabello y unas. Complementa tu rutina de minoxidil desde adentro." },
    { name: "1 Mes Minoxidil Kirkland Liquido 5", price: "$250", image: "1-mes-minoxidil-kirkland-low-1.jpg", tag: "Prueba", copy: "Una botella para iniciar. Perfecto si es tu primera vez y quieres probar constancia." },
    { name: "Balsamo Crecimiento Barba 12% Maximus 4oz", price: "$480", image: "balsamo12.jpg", tag: "Barba", copy: "Balsamo estimulante para crecimiento de barba. Formula concentrada con ingredientes naturales." },
    { name: "Dermaroller 0.5 mm Skin Roller", price: "$240", image: "dermaroller.jpg", tag: "Herramienta", copy: "Estimulador de colageno y absorcion. Usar con higiene y solo 1-2 veces por semana." },
    { name: "2 Meses Minoxidil Kirkland Liquido 5", price: "$450", image: "2-meses.jpg", tag: "Duo", copy: "Dos botellas para continuidad. Evita quedarte sin producto justo cuando agarras ritmo." },
    { name: "12 Meses Minoxidil Kirkland Liquido 5", price: "$2,000", image: "12-meses.jpg", tag: "Anual", copy: "Tratamiento de ano completo. Mejor precio por botella. Para quien ya tiene rutina solida." },
    { name: "Kit Del Barbon 3M Kirkland + Biotina", price: "$1,000", image: "15085827-1340189009347678-3152941011026575360-n-2.jpg", tag: "Kit", copy: "3 meses de minoxidil Kirkland + Biotina Natrol 10,000 MCG. El combo barba completo." },
    { name: "Kit Gran Barbon Minoxidil + Balsamo", price: "$780", image: "3-meses-minoxidil-balsamo-low-1.jpg", tag: "Kit", copy: "3 meses Kirkland + Balsamo Bergamota Maximus. Tratamiento integral para barba." },
    { name: "1 Mes Minoxidil Kirkland 5% Espuma", price: "$480", image: "6-meses-espuma.jpg", tag: "Espuma", copy: "Version foam para quienes prefieren secado rapido. Ideal para pieles sensibles." },
    { name: "Shampoo Minoxidil Control Caida 500ml", price: "$280", image: "minoxidil-4.jpg", tag: "Cabello", copy: "Shampoo con minoxidil para prevenir caida y fortalecer cabello desde la raiz." },
    { name: "Kit Crecimiento Barba 3M + Cera Karite", price: "$700", image: "3-meses-cera-y-minoxidil-low-1.jpg", tag: "Kit", copy: "3 meses Kirkland + Cera Karite Maximus. Nutricion y estimulo en un solo paquete." },
    { name: "Lotion Crecimiento Barba 10% + Bergamota", price: "$349", image: "minoxidil10-md.jpg", tag: "Barba", copy: "Lotion concentrada al 10% con bergamota. Para barbas que necesitan estimulo extra." },
    { name: "Kit 2 Jabones Crecimiento Barba Maximus", price: "$180", image: "2jabones.jpg", tag: "Jabon", copy: "Jabones artesanales con biotina. Limpieza profunda que apoya el crecimiento." },
    { name: "Balsamo Bergamota Maximus Beard 45g", price: "$200", image: "bergamotae55539c64f7f56f1.jpg", tag: "Barba", copy: "Balsamo natural con cera de abeja, vitamina E y aceites esenciales para barba." },
    { name: "Cera Karite Jojoba Maximus", price: "$160", image: "cera-karite-maximus-low-1.jpg", tag: "Barba", copy: "Cera nutritiva con aceite de jojoba, karite, romero y bergamota. Hidratacion profunda." },
    { name: "Aceite Tonico Bergamota 30ml Maximus", price: "$180", image: "tonicomaximus.jpg", tag: "Barba", copy: "Aceite tonico para barba y bigote. Estimula crecimiento y da brillo natural." },
    { name: "Shampoo Bergamota Crecimiento 500ml", price: "$280", image: "bergamota-6.jpg", tag: "Cabello", copy: "Shampoo con bergamota. Formula potente para cabello fuerte, brillante y sano." },
    { name: "3 Rimel Crecimiento Pestanas Minoxidil 5%", price: "$700", image: "3pestanas.jpg", tag: "Belleza", copy: "Pack de 3 rimeles con minoxidil 5% y biotina para crecimiento de pestanas y cejas." },
    { name: "2 Rimel Crecimiento Pestanas Minoxidil 5%", price: "$480", image: "2pestanas.jpg", tag: "Belleza", copy: "Pack de 2 rimeles estimulantes. Resultados visibles al mes de uso constante." },
    { name: "1 Rimel Crecimiento Pestanas Minoxidil 5%", price: "$250", image: "1pestanas.jpg", tag: "Belleza", copy: "Rimel de biotina con minoxidil para pestanas y cejas mas largas y pobladas." },
    { name: "Pomada Suavecita 113g", price: "$300", image: "suavecita-1.jpg", tag: "Estilo", copy: "Pomada para mujer. Fijacion flexible, brillo natural y facil de lavar." },
    { name: "Cera Para Barba y Bigote Quioco 12g", price: "$120", image: "24295882-1321911014581181-6595544907237031936-n-1.jpg", tag: "Barba", copy: "Cera 100% de abeja. Antiseptica, imperecedera. Perfecta para dar forma." },
    { name: "Suavecito Pomade Firme Hold 4oz", price: "$310", image: "suavecito-firme-hold-1-1.jpg", tag: "Estilo", copy: "Pomada de fijacion fuerte. Estilos flexibles que duran todo el dia." },
    { name: "Beardbro Peine Delineador Barba", price: "$150", image: "beardpro-1.jpg", tag: "Herramienta", copy: "Herramienta patentada para recorte y delineado preciso de barba." },
    { name: "Shampoo Barba y Bigote 125ml", price: "$149", image: "shampoobarba.jpg", tag: "Barba", copy: "Shampoo especializado Maximus. Limpieza profunda sin resecar." },
    { name: "Suavecito Pomade Original 4oz", price: "$300", image: "suavecito-original.jpg", tag: "Estilo", copy: "La clasica. Fijacion media con brillo. Se lava facil con agua." },
  ],
  posts: [
    {
      title: "Minoxidil Kirkland original en CDMX: como identificarlo y no caer en imitaciones",
      excerpt: "Guia completa para verificar la autenticidad del Minoxidil Kirkland que compras en Mexico. Aprende a revisar lote, caja, tapa y presentacion.",
      body: `Comprar Minoxidil Kirkland original en la Ciudad de Mexico se ha vuelto mas comun, pero tambien han aumentado las imitaciones. Esta guia te ayudara a identificar el producto autentico antes de pagar.

## Por que Kirkland es la marca mas buscada

Kirkland Signature es la marca de Costco y su minoxidil al 5% es fabricado por Perrigo, uno de los laboratorios mas grandes del mundo. La combinacion de calidad y precio la ha convertido en la opcion preferida en Mexico para el crecimiento de barba y cabello.

## Como verificar la autenticidad del Kirkland

**El lote grabado a laser**
Las botellas legitimas de Kirkland tienen el lote impreso en amarillo o grabado directamente en la base en la parte inferior trasera. Este lote debe coincidir con el codigo impreso en la parte inferior de la caja de carton de 6 botellas.

**La tapa child-proof**
La tapa cuenta con un sistema rigido contra ninos. Para abrir, se debe presionar con fuerza hacia abajo antes de girar. La tipografia de la tapa original esta grabada con relieve limpio y el anillo inferior de plastico se rompe en el primer uso.

**Consistencia del liquido**
El minoxidil al 5% liquido es transparente o ligeramente amarillento y tiene olor a alcohol y propilenglicol. Ante bajas temperaturas durante su importacion, puede presentar pequenos cristales al fondo que se disuelven facilmente agitando a temperatura ambiente.

**Tipografia de etiquetas**
Las etiquetas traseras del producto original son de papel adhesivo de alta calidad con textos nitidos en espanol e ingles. No deben tener bordes borrosos, textos pixelados ni colores opacos. El codigo de barras y advertencias son perfectamente legibles.

## Donde comprar Minoxidil Kirkland original en CDMX

En la Ciudad de Mexico hay varias opciones, pero no todas ofrecen garantia de autenticidad. Nuestra sucursal en Plaza Guelatao, Iztapalapa (Local 76, Pasillo 5) es un punto fisico donde puedes revisar el producto en persona, verificar el lote, la fecha de caducidad y la presentacion antes de pagar.

Tambien ofrecemos entregas personales con pago contra entrega en CDMX, Iztapalapa, Nezahualcoyotl, Los Reyes La Paz, Chalco e Ixtapaluca. Escribenos por WhatsApp para confirmar disponibilidad.`,
      category: "Autenticidad",
      date: "2026-05-01",
    },
    {
      title: "Minoxidil Kirkland para barba: resultados reales en CDMX",
      excerpt: "Todo lo que necesitas saber sobre el uso de Minoxidil Kirkland para crecimiento de barba. Rutina, tiempos, resultados y errores comunes.",
      body: `El minoxidil para barba es uno de los tratamientos mas populares en Mexico. Si estas en CDMX y quieres empezar, aqui te explicamos lo que realmente funciona, basado en la experiencia de cientos de clientes.

## Como funciona el minoxidil en la barba

El minoxidil actua como vasodilatador, mejorando la circulacion sanguinea en los foliculos pilosos de la zona donde se aplica. Esto estimula la fase de crecimiento (anagena) y puede activar foliculos que estaban inactivos.

Es importante entender que el minoxidil no crea foliculos nuevos donde no los hay. Si en una zona nunca has tenido vello, es poco probable que aparezca. Pero si tienes vello fino o poco denso, el minoxidil puede ayudar a que se vuelva mas grueso y visible.

## Rutina diaria recomendada

- Lava tu cara con un jabon suave y seca bien
- Aplica 1 ml de minoxidil (aproximadamente 6-7 gotas del gotero) sobre la zona de la barba
- Distribuye con las yemas de los dedos, masajeando suavemente
- Deja secar completamente (15-20 minutos)
- No te laves la cara ni apliques otros productos en esa zona hasta que este seco
- Repite por la manana y por la noche

## Tiempos de resultados

- **Primer mes:** Adaptacion. Puede haber algo de resequedad. No esperes cambios visibles.
- **Segundo mes:** Puede aparecer vello fino y claro. Algunos notan mas densidad.
- **Tercer mes:** Los cambios empiezan a ser visibles. Vello mas oscuro y presente.
- **Sexto mes:** Resultados evidentes si has sido constante.
- **12 meses:** Maximo potencial. La mayoria alcanza su mejor resultado entre el mes 9 y 12.

## Errores que debes evitar

1. Aplicar mas de 1 ml por dosis (no acelera, solo irrita)
2. Dejar de usarlo a las 3 semanas porque "no veo nada"
3. No lavarse las manos despues de aplicar y tocarse otras zonas
4. Usar dermaroller sin desinfectar o con demasiada presion
5. Compararse con fotos de internet que no muestran el proceso real

## Comprar en CDMX: ventajas de entrega personal

Si vives en CDMX o zona metropolitana, la entrega personal tiene ventajas: ves el producto antes de pagar, revisas sellos y caducidad, y no dependes de paqueterias. Coordinamos entregas en puntos publicos seguros como metros, plazas y nuestras sucursales.

Escribenos por WhatsApp. Te orientamos sobre que paquete te conviene segun tu objetivo y presupuesto.`,
      category: "Rutina",
      date: "2026-05-02",
    },
    {
      title: "Paquetes de Minoxidil Kirkland: 1, 3, 6 o 12 meses, cual elegir",
      excerpt: "Comparativa de paquetes de tratamiento con Minoxidil Kirkland. Descubre cual se ajusta mejor a tu objetivo, presupuesto y nivel de compromiso.",
      body: `Elegir la duracion correcta de tu tratamiento con Minoxidil Kirkland puede ser la diferencia entre ver resultados y abandonar. Aqui te ayudamos a decidir.

## Paquete de 1 mes: para conocer el producto

El paquete de 1 mes incluye una botella de 60 ml. Es ideal si:
- Es tu primera vez usando minoxidil
- Quieres ver como reacciona tu piel
- No estas seguro de poder mantener la rutina diaria

No esperes ver resultados en 30 dias. Este mes sirve para probar la constancia, evaluar si hay irritacion y decidir si quieres comprometerte a un tratamiento mas largo.

## Paquete de 3 meses: el mas recomendado para empezar

El paquete de 3 meses (3 botellas) es el que mas recomiendan nuestros clientes. Te permite:
- Establecer una rutina real de aplicacion
- Observar los primeros cambios (mes 2-3)
- Tomar fotos de comparacion con sentido
- Decidir si continuas sin haber hecho una gran inversion

Es el punto medio ideal entre precio y compromiso.

## Paquete de 6 meses: para ir en serio

Cuando ya sabes que vas a seguir, 6 meses es la mejor compra. Ventajas:
- Mejor precio por botella (ahorras comparado con comprar de 1 o 3)
- No interrumpes el tratamiento por quedarte sin producto
- Tiempo suficiente para ver resultados solidos
- Menos vueltas de compra y menos envios

Es nuestro paquete mas vendido.

## Paquete de 12 meses: tratamiento completo

Para quien ya tiene experiencia con minoxidil y sabe que va a mantener la rutina todo el ano. Es la opcion mas economica por botella. Solo recomendable si:
- Ya conoces el producto y te funciona
- Tienes un lugar fresco y seco para guardar las botellas
- Estas comprometido con el tratamiento a largo plazo

## Que paquete elegir segun tu objetivo

Para barba, la mayoria logra buenos resultados en 6 meses. Para cabello, los tiempos suelen ser mas largos (6-12 meses). Si estas empezando, nuestro consejo es: prueba con 1 mes, y si te acomodas, pasate a 3 o 6.

Escribenos por WhatsApp y te ayudamos a elegir. Te mandamos foto real del producto antes de que pagues.`,
      category: "Paquetes",
      date: "2026-05-03",
    },
    {
      title: "Entregas personales de minoxidil en CDMX, Neza y zona Oriente",
      excerpt: "Como funcionan nuestras entregas personales gratis con pago contra entrega en Iztapalapa, Nezahualcoyotl, Chalco, La Paz e Ixtapaluca.",
      body: `Una de las mayores ventajas de comprar con nosotros es que puedes recibir tu Minoxidil Kirkland en persona y pagar al recibirlo. Sin depositos previos, sin esperar paqueterias, sin riesgo.

## Por que entregamos en persona

Sabemos que comprar por internet puede generar desconfianza. Por eso ofrecemos entregas personales en puntos publicos de la Ciudad de Mexico y zona oriente del Estado de Mexico: tu ves el producto, revisas que este sellado, verificas la fecha de caducidad, y pagas cuando estas satisfecho.

## Zonas de entrega personal

**Iztapalapa, CDMX:**
- Metro Guelatao (Linea A)
- Metro Tepalcates (Linea A)
- Metro Constitucion de 1917 (Linea 8)
- Plaza Guelatao (nuestra sucursal, Local 76)
- Zonas colindantes

**Nezahualcoyotl, Estado de Mexico:**
- Metro Nezahualcoyotl (Linea B)
- Metro Impulsora (Linea B)
- Av. Chimalhuacan
- Plaza Ciudad Jardin
- Oficinas en Oriente 10 #224, Colonia Reforma

**Chalco, Estado de Mexico:**
- Plaza Sendero Chalco
- Plaza Cortijo
- Centro de Chalco (Kiosco principal)

**Los Reyes La Paz:**
- Estacion Metro La Paz (Linea A)
- Plaza La Paz

**Ixtapaluca:**
- Plaza Sendero Ixtapaluca
- Galerias Ixtapaluca

## Como agendar una entrega

1. Escribenos por WhatsApp al 55-6938-0408
2. Dinos que producto quieres y en que zona estas
3. Acordamos un punto publico y un horario (mar-dom, 12-5 PM)
4. Nos vemos, revisas tu producto, y pagas en efectivo o transferencia

## Ventajas de la entrega personal

- Cero riesgo: no pagas hasta tener el producto en mano
- Rapido: usualmente podemos coordinar para el mismo dia o al siguiente
- Asesoria incluida: te explicamos como usar el producto, dosis y cuidados
- Sin costo de envio en CDMX y zona oriente

Si estas fuera de nuestra zona de entregas personales, tambien hacemos envios a toda la Republica con tarifa fija de $140 MXN por paqueteria.

          Escribenos ya por WhatsApp y coordina tu entrega.`,
      category: "Envio",
      date: "2026-05-04",
    },
    {
      title: "Minoxidil Kirkland: por que es el mas buscado en Mexico",
      excerpt: "La razon por la que Kirkland domina las busquedas de minoxidil en Mexico: precio, calidad, disponibilidad y como evitar copias.",
      body: `Si has buscado minoxidil en Mexico, seguro te has topado con el nombre Kirkland una y otra vez. No es casualidad: Kirkland Signature se ha convertido en la referencia para quienes buscan un producto efectivo a un precio razonable.

## El origen de Kirkland Signature

Kirkland es la marca propia de Costco Wholesale. Su minoxidil al 5% (Extra Strength) es fabricado por Perrigo Company, un laboratorio farmaceutico con sede en Irlanda y operaciones en Estados Unidos. Perrigo es uno de los mayores fabricantes de medicamentos de venta libre del mundo.

La formula de Kirkland es identica a la de Rogaine (marca registrada de Johnson & Johnson), pero a una fraccion del precio. Ambos contienen minoxidil al 5% como ingrediente activo, con los mismos excipientes: alcohol, propilenglicol y agua purificada.

## Por que es tan popular en Mexico

1. **Precio:** Es significativamente mas economico que otras marcas comerciales
2. **Efectividad comprobada:** Decadas de uso y estudios respaldan su eficacia
3. **Disponibilidad:** Se consigue en presentaciones de 1 a 12 meses
4. **Confianza de marca:** El respaldo de Costco y Perrigo genera seguridad
5. **Comunidad:** Miles de mexicanos comparten sus resultados en redes sociales

## El problema de las imitaciones

La popularidad de Kirkland ha generado un mercado paralelo de imitaciones. Hay vendedores que ofrecen "tipo Kirkland" o producto generico en frascos similares. Algunos incluso copian el empaque pero el contenido es de dudosa procedencia.

## Como comprar seguro en CDMX

La mejor forma de comprar Minoxidil Kirkland original es a traves de vendedores establecidos con sucursal fisica, que permitan ver el producto antes de pagar, y que ofrezcan garantia de autenticidad.

En nuestra sucursal de Plaza Guelatao (Iztapalapa, CDMX) puedes venir a revisar el producto en persona: lote, caducidad, sellado, presentacion. Tambien coordinamos entregas personales con pago contra entrega en toda la zona metropolitana y oriente del Estado de Mexico.

Escribenos por WhatsApp. Te mandamos fotos reales del lote actual y coordinamos tu compra sin riesgos.`,
      category: "Kirkland",
      date: "2026-05-05",
    },
    {
      title: "Como usar minoxidil correctamente: guia para principiantes",
      excerpt: "Aprende a usar minoxidil de forma correcta: dosis, frecuencia, cuidados de la piel y como maximizar resultados en barba y cabello.",
      body: `Usar minoxidil parece sencillo, pero hacerlo mal puede significar meses de esfuerzo sin resultados. Esta guia cubre todo lo que un principiante necesita saber.

## Preparacion antes de aplicar

La piel debe estar limpia y seca. Lava tu cara con un jabon neutro (sin alcohol, sin fragancias fuertes) y seca dando golpecitos suaves con una toalla limpia. No frotes.

Si usas otros productos (cremas, serum, bloqueador), espera a que el minoxidil se absorba completamente antes de aplicarlos. Lo ideal es aplicar minoxidil como primer producto despues del lavado.

## Dosis correcta

La dosis estandar es 1 ml, dos veces al dia (manana y noche). El gotero del frasco de Kirkland tiene una marca de 1 ml. No uses mas cantidad pensando que acelerara el proceso: el exceso no se absorbe, irrita la piel y desperdicias producto.

## Tecnica de aplicacion

1. Llena el gotero hasta la marca de 1 ml
2. Distribuye el liquido gota a gota sobre la zona a tratar
3. Con las yemas de los dedos (no las unas, no la palma), extiende suavemente
4. Masajea con movimientos circulares ligeros durante 10-15 segundos
5. Deja secar al aire (15-20 minutos para liquido, 5-10 para espuma)
6. Lavate las manos inmediatamente despues

## Frecuencia y constancia

La clave del minoxidil no es la cantidad, es la constancia. Dos veces al dia, todos los dias. Si un dia olvidas una dosis, no dupliques la siguiente: simplemente continua con tu rutina normal.

La mayoria de las personas que no ven resultados es porque abandonan antes de tiempo o aplican de forma irregular (un dia si, dos no, fines de semana no).

## Cuidados de la piel

El propilenglicol del minoxidil liquido puede causar resequedad o descamacion en algunas personas. Si te pasa:
- Usa un hidratante ligero sin alcohol 30 minutos despues de aplicar minoxidil
- Si la irritacion persiste, considera cambiar a la version en espuma (no contiene propilenglicol)
- No uses dermaroller hasta que tu piel se haya adaptado

## Complementos que si funcionan

- **Biotina:** Apoya la salud general de cabello y unas
- **Dermaroller 0.5mm:** Puede mejorar absorcion (1-2 veces por semana, con higiene extrema)
- **Shampoo suave:** Mantiene el cuero cabelludo limpio sin irritar

Escribenos por WhatsApp si tienes dudas. Podemos orientarte sobre que productos empezar y como armar tu rutina.`,
      category: "Rutina",
      date: "2026-05-06",
    },
    {
      title: "Minoxidil espuma vs liquido Kirkland: diferencias reales",
      excerpt: "Comparativa honesta entre la espuma y el liquido de Minoxidil Kirkland. Ventajas, desventajas y para quien es mejor cada presentacion.",
      body: `Una de las preguntas mas frecuentes es si conviene mas el minoxidil liquido o la espuma. Aqui te damos una comparativa honesta basada en experiencia real.

## Minoxidil liquido Kirkland 5%

**Ventajas:**
- Precio mas bajo (aproximadamente la mitad que la espuma)
- Mayor rendimiento: el liquido rinde mas aplicaciones por botella
- Facil de medir la dosis exacta con el gotero
- Mayor disponibilidad en Mexico
- Ideal para zonas amplias (cuero cabelludo)

**Desventajas:**
- Tarda 15-25 minutos en secar
- Contiene propilenglicol, que puede irritar pieles sensibles
- Sensacion ligeramente grasosa o humeda despues de aplicar
- Puede dejar residuo blanco si se acumula

## Minoxidil espuma Kirkland 5%

**Ventajas:**
- Secado mucho mas rapido (5-10 minutos)
- No contiene propilenglicol: mejor para pieles sensibles o alergicas
- Sensacion ligera, nada grasosa
- Ideal para personas con poco tiempo en las mananas
- Mejor penetracion en barbas ya pobladas

**Desventajas:**
- Precio mas alto (casi el doble que el liquido)
- Mas dificil de medir la dosis exacta (no tiene gotero)
- Menor disponibilidad en el mercado mexicano
- Menor rendimiento por envase

## Para barba: cual elegir

Si estas empezando y tu barba es escasa, el liquido es buena opcion: economico y facil de aplicar sobre la piel. Si ya tienes barba y te cuesta que el liquido llegue a la piel, la espuma penetra mejor.

Si tienes piel sensible, la espuma puede evitarte irritacion y descamacion.

## Para cabello: cual elegir

En el cuero cabelludo, el liquido suele ser la opcion mas practica. La zona es amplia y el liquido se distribuye bien. La espuma tambien funciona pero el costo se multiplica si necesitas cubrir areas grandes.

## Recomendacion final

Empieza con liquido. Es mas economico y te permite probar sin gran inversion. Si despues de un mes sientes que la textura o el tiempo de secado no te acomodan, cambia a espuma. Lo importante es que uses el producto, no cual presentacion uses.

Escribenos por WhatsApp para ver disponibilidad y precios de ambas presentaciones.`,
      category: "Producto",
      date: "2026-05-07",
    },
    {
      title: "Minoxidil en Iztapalapa y Nezahualcoyotl: donde comprar seguro",
      excerpt: "Si vives en Iztapalapa, Neza o zona oriente, conoce los puntos de venta fisicos y las opciones de entrega personal de Minoxidil Kirkland original.",
      body: `Si vives en Iztapalapa, Nezahualcoyotl o cualquier parte de la zona oriente de la CDMX y el Estado de Mexico, comprar Minoxidil Kirkland original es mas facil de lo que crees. Aqui te contamos tus opciones.

## Sucursal Plaza Guelatao (Iztapalapa)

Nuestra sucursal principal esta dentro de Plaza Guelatao, uno de los centros comerciales mas concurridos de Iztapalapa. Nos encuentras en el Local 76, Pasillo 5.

Ventajas de visitarnos en persona:
- Ves el producto antes de comprar
- Revisas lote, fecha de caducidad y sellos de fabrica
- Te explicamos como usar el producto correctamente
- Pagas en efectivo o transferencia
- Te llevas tu producto al momento

Horario: Martes a Domingo, 12:00 PM a 5:00 PM.

## Oficinas en Neza (Nezahualcoyotl)

Tenemos punto de distribucion en Oriente 10 #224, Colonia Reforma, Ciudad Nezahualcoyotl. Ideal si vives en la zona y prefieres no cruzar hasta Iztapalapa.

## Entregas personales en tu zona

Si no puedes venir a nuestras sucursales, nosotros vamos a ti. Coordinamos entregas en puntos publicos seguros en:
- Iztapalapa: Metro Guelatao, Metro Tepalcates, Metro Constitucion
- Nezahualcoyotl: Metro Neza, Metro Impulsora, Av. Chimalhuacan
- Los Reyes La Paz: Metro La Paz, Plaza La Paz
- Chalco: Plaza Sendero, Centro
- Ixtapaluca: Plaza Sendero, Galerias Ixtapaluca

## Como funciona la entrega personal

1. Nos escribes por WhatsApp (55-6938-0408)
2. Dices que producto quieres y en que zona estas
3. Acordamos un punto publico (metro, plaza, centro comercial)
4. Nos vemos, revisas el producto, y pagas al recibir
5. Sin anticipos, sin depositos, sin riesgo

## Por que comprar en persona en lugar de en linea

- Cero riesgo de estafa: no pagas hasta ver el producto
- Asesoria personalizada: te explicamos dosis, rutina y cuidados
- Sin tiempos de envio: recibes tu producto el mismo dia
- Sin costo de paqueteria

Escribenos por WhatsApp hoy y coordina tu entrega o visita a sucursal.`,
      category: "Local",
      date: "2026-05-08",
    },
    {
      title: "La ciencia del minoxidil: por que estimula el crecimiento de barba",
      excerpt: "Entender como funciona el minoxidil te ayuda a mantener la constancia. Desglose sencillo del mecanismo de accion y por que tarda semanas en verse.",
      body: `A veces uno se aplica el minoxidil sin entender bien que esta pasando ahi abajo en los foliculos. Y cuando entiendes la ciencia basica, es mas facil mantener la rutina sin desesperarte.

## Como funciona el minoxidil en los foliculos

El minoxidil originalmente era un medicamento para la presion arterial. Los medicos notaron que los pacientes a los que se los recetaban empezaban a desarrollar mas vello corporal. Ahi fue cuando le vieron potencial para el crecimiento capilar.

El mecanismo no esta 100% entendido, pero la teoria mas aceptada es que actua como vasodilatador. Basicamente ensancha los vasos sanguineos microscopicos que rodean los foliculos pilosos, lo que aumenta el flujo de sangre, oxigeno y nutrientes a la raiz del vello.

Ademas, el minoxidil estimula la fase anagena —la fase de crecimiento del pelo— y la prolonga. Esto significa que los folículos permanecen mas tiempo produciendo vello nuevo en lugar de entrar en reposo.

## Por que tarda en verse

El pelo crece aproximadamente 1 cm al mes. Para que ese vello nuevo sea visible y tenga grosor, el foliculo necesita varios ciclos de crecimiento bajo el estimulo del minoxidil. Por eso los primeros cambios notorios aparecen entre las 8 y 12 semanas.

## La clave es la irrigacion

El minoxidil no crea foliculos nuevos donde no existen. Lo que hace es despertar folículos que estaban miniaturizados o en estado de reposo prolongado. Si en una zona jamas tuviste vello (ni siquiera pelusa fina), dificilmente saldra algo. Pero si hay vello fino, debil o poco pigmentado, ahi es donde el minoxidil hace su magia compa.

Escribenos para armar tu rutina con productos Kirkland 100% originales.`,
      category: "Ciencia",
      date: "2026-05-30",
    },
    {
      title: "Minoxidil Kirkland vs Rogaine: diferencias que nadie te cuenta",
      excerpt: "Comparativa honesta entre las dos marcas mas conocidas de minoxidil al 5%. Precio, formula, presentacion y cual conviene mas en Mexico.",
      body: `Si estas investigando sobre minoxidil, seguro te has topado con Kirkland y Rogaine. Las dos tienen minoxidil al 5%, entonces cual comprar? La respuesta no es tan simple como "el mas barato".

## Mismo ingrediente, distinto precio

El ingrediente activo es identico: minoxidil 5%. Los excipientes tambien son muy similares: alcohol, propilenglicol y agua purificada. Kirkland es fabricado por Perrigo, un laboratorio farmaceutico enorme. Rogaine es la marca original de Johnson & Johnson.

La diferencia de precio es brutal: Rogaine puede costar 3 o 4 veces mas que Kirkland, y el motivo no es la calidad, sino la marca y el marketing.

## Por que Kirkland es la opcion preferida en Mexico

- **Precio:** Por lo que cuesta 1 mes de Rogaine, te compras 3 meses de Kirkland.
- **Disponibilidad:** Encontrar Rogaine original en Mexico es complicado, y hay muchas falsificaciones.
- **Resultados:** La formula es practicamente la misma. Los usuarios reportan los mismos resultados.

## Donde esta el truco

El unico riesgo con Kirkland es que, por ser economico, hay mas imitaciones en el mercado. Pero eso se resuelve comprando con distribuidores serios, con sucursal fisica, que te dejen revisar el producto antes de pagar.

Si te quieres ahorrar una lana sin sacrificar resultados, Kirkland es la respuesta. Escribenos y te mandamos fotos del lote actual para que veas que es 100% original.`,
      category: "Comparativa",
      date: "2026-05-31",
    },
    {
      title: "Como armar tu primer kit de barba: minoxidil, dermaroller y biotina",
      excerpt: "Guia para principiantes que quieren empezar con todo. Que comprar, en que orden usar los productos y como combinarlos sin irritar tu piel.",
      body: `Decidiste entrarle al crecimiento de barba y te quieres armar un kit completo. Bien. Pero hay un orden logico para no tirar dinero y no quemarte la piel al primer intento.

## El kit basico bien armado

**Minoxidil Kirkland 5% liquido.** Es tu producto principal. Aplicas 1 ml dos veces al dia, todos los dias, sin excusas ni pretextos.

**Dermaroller de 0.5 mm.** No lo compres de 1.0 o 1.5 mm si vas empezando. El de 0.5 mm es suficiente para mejorar la absorcion sin lastimar demasiado la piel. Se usa 1 o 2 veces por semana, nunca diario.

**Biotina 10,000 MCG.** Apoyo nutricional desde adentro. No hace magia sola, pero combinada con minoxidil ayuda a que el vello nuevo salga mas grueso y fuerte.

## El orden correcto de uso

Lunes a viernes (excepto el dia de dermaroller):
1. Lavas tu cara con jabon neutro
2. Secas bien
3. Aplicas minoxidil
4. Esperas que seque
5. Tomas tu biotina con el desayuno

El dia de dermaroller (digamos sabado):
1. Lavas tu cara y desinfectas el dermaroller con alcohol
2. Pasas el rodillo suavemente en cruz sobre la zona
3. Esperas al menos 12 horas (ideal 24) antes de aplicar minoxidil
4. Tomas tu biotina normal

## Por que no aplicar minoxidil justo despues del dermaroller

Los microcanales que abre el dermaroller quedan sensibles. Si aplicas minoxidil inmediatamente, el alcohol entra directo y puede causar irritacion severa, ardor y hasta quemaduras quimicas. Mejor espera.

Armate tu kit con nosotros. Tenemos el combo de 3 meses Kirkland + Biotina por $1,000. Escribenos.`,
      category: "Kit",
      date: "2026-06-01",
    },
    {
      title: "Los 7 errores que arruinan tu progreso con minoxidil",
      excerpt: "Identifica los fallos mas comunes que hacen que el tratamiento no funcione. Desde la dosis incorrecta hasta la falta de constancia.",
      body: `La mayoria de la gente que dice "el minoxidil no me funciono" cometio al menos uno de estos errores. Revisalos y haz autoevaluacion sincera de tu rutina.

## Error 1: No ser constante
El minoxidil requiere aplicacion diaria, dos veces al dia. Si un dia si y tres no, el foliculo nunca recibe la senal continua que necesita para despertar. Esto es lo mas basico y lo mas dificil: aburrirse de hacer lo mismo todos los dias.

## Error 2: Usar mas de 1 ml por dosis
Mas NO es mejor. El exceso de minoxidil no se absorbe, escurre, se evapora y solo irrita tu piel. Un mililitro exacto cada 12 horas es la dosis estudiada y comprobada.

## Error 3: Dejar el tratamiento antes de los 3 meses
Los cambios reales empiezan a verse entre la semana 8 y 12. Si abandonas a los 45 dias porque "no veia nada", tiraste tu dinero y esfuerzo.

## Error 4: No lavar la cara antes de aplicar
Si tienes grasa, sudor, crema o suciedad en la piel, el minoxidil no penetra correctamente. Cara limpia y seca siempre.

## Error 5: No desinfectar el dermaroller
El dermaroller abre microcanales. Si esta sucio, introduces bacterias directo a la piel. Alcohol antes y despues de cada uso, sin excepciones.

## Error 6: Aplicar otros productos inmediatamente despues del minoxidil
Cremas, serum, bloqueador. Todo eso crea una barrera. Espera al menos 30 minutos tras aplicar minoxidil.

## Error 7: Compararse con fotos retocadas de internet
Las fotos de "resultados en 30 dias" que ves en redes suelen tener filtros, iluminacion engañosa o incluso son photoshopeadas. Se realista con tus expectativas. El progreso es lento, gradual y diferente en cada persona.

Revisa tu rutina y corrige lo que haya que corregir. Si ocupas orientacion, escribenos sin bronca.`,
      category: "Errores",
      date: "2026-06-02",
    },
    {
      title: "Guia de frecuencia del dermaroller: ni mucho ni poco",
      excerpt: "Cada cuanto usar el dermaroller segun el tamaño de aguja. Explicacion de los tiempos de recuperacion de la piel y como evitar irritacion.",
      body: `El dermaroller es una herramienta poderosisima, pero mal usada puede fastidiarte la piel y atrasar tu progreso. Aqui la guia definitiva de frecuencia segun el calibre de aguja.

## Agujas de 0.25 mm
Estas son las mas suaves. Solo alcanzan la capa superficial (epidermis) y basicamente mejoran la absorcion de productos topicos. Puedes usarlas cada 48 horas sin problema. Pero para minoxidil, no son las mas recomendadas porque no llegan a la dermis donde estan los foliculos.

## Agujas de 0.5 mm (la dorada)
Esta es la medida ideal para minoxidil y barba. Penetra hasta la dermis papilar, justo donde estan los foliculos. La frecuencia recomendada es 1 o 2 veces por semana. El tiempo de recuperacion de la piel es de aproximadamente 72 horas, asi que nada de usarlo diario. Sabado y martes, por ejemplo.

## Agujas de 1.0 mm o mas
Estas ya son para uso profesional. Penetran profundo y requieren aplicacion de anestesia topica. El tiempo de recuperacion es de 7 a 14 dias. No las recomendamos para uso casero con minoxidil. Riesgo alto de infeccion y cicatrices.

## La regla de oro

Jamas apliques minoxidil inmediatamente despues del dermaroller. Los microcanales estan abiertos y el alcohol del minoxidil entra directo, causando irritacion severa. Espera minimo 12 horas, ideal 24 horas. La regla facil: si usas dermaroller en la noche del sabado, aplicas tu siguiente dosis de minoxidil el domingo en la noche.

Recuerda desinfectar siempre con alcohol isopropilico antes y despues de cada uso. Cambia el rodillo cada 3-4 meses porque las agujas pierden filo.

Escribenos si quieres que te recomendemos un dermaroller de calidad.`,
      category: "Dermaroller",
      date: "2026-06-03",
    },
    {
      title: "Biotina 10,000 MCG: el complemento que tu barba necesita",
      excerpt: "La biotina no reemplaza al minoxidil pero lo potencia. Como funciona, que dosis tomar, cuando se notan los efectos y que alimentos la contienen.",
      body: `La biotina (vitamina B7) es la pareja de baile del minoxidil. Sola no hace crecer barba, pero combinada con minoxidil, ayuda a que el vello nuevo salga mas grueso, oscuro y sano.

## Como funciona la biotina

La biotina participa en la sintesis de queratina, la proteina que forma el 90% de la estructura del cabello, las unas y la barba. Si tu cuerpo tiene deficiencia de biotina, el vello que produzcas sera debil, quebradizo y con poco pigmento.

El minoxidil estimula el foliculo para que produzca vello. La biotina le da a tu cuerpo los ladrillos para construir ese vello de buena calidad. Uno sin el otro es como tener albañiles sin material de construccion.

## Dosis recomendada

10,000 microgramos (MCG) al dia es la dosis mas usada para propositos cosmeticos. Se toma una tableta con el desayuno. La biotina es hidrosoluble, asi que el exceso se elimina por la orina. Por eso es segura y dificil de sobredosificar.

## Alimentos ricos en biotina

Si prefieres lo natural: huevo (la yema), higado, salmon, nueces, almendras, aguacate y camote. Pero para alcanzar los 10,000 MCG solo con comida, tendrias que comer cantidades absurdas. Por eso el suplemento es la via practica.

## Cuando se notan los efectos

La biotina no tiene efecto inmediato. A las 4-6 semanas de uso diario, notaras las unas mas duras y el cabello con mas brillo. Para la barba, los efectos se notan en conjunto con el minoxidil alrededor del tercer mes.

Nosotros manejamos Biotina Natrol de 10,000 MCG con 100 tabletas por $450. Pregunta por el combo Kit del Barbon (3 meses Kirkland + Biotina).`,
      category: "Biotina",
      date: "2026-06-04",
    },
    {
      title: "Minoxidil espuma Kirkland: para quien si y para quien no",
      excerpt: "La espuma es mas cara pero tiene ventajas reales. Analisis de a quien le conviene hacer el gasto extra y quien se puede quedar con el liquido.",
      body: `La espuma Kirkland al 5% cuesta practicamente el doble que el liquido. Vale la pena? Depende completamente de tu tipo de piel y tu estilo de vida.

## Ventajas reales de la espuma

Se seca mucho mas rapido: entre 5 y 10 minutos contra los 20-30 del liquido. Si sales temprano al jale, a la escuela o al gimnasio, la espuma te ahorra tiempo valioso cada mañana.

No contiene propilenglicol. Este compuesto del liquido es el principal causante de resequedad, descamacion y picazon en pieles sensibles. La espuma usa una base distinta, mucho mas amigable con la piel.

Textura ligera. Si ya tienes algo de barba, al liquido le cuesta llegar a la piel porque el vello lo retiene. La espuma se derrite al contacto y penetra mejor entre el vello existente.

## Desventajas

El precio. Simple y llano. Cuesta casi el doble.

Menor disponibilidad. En Mexico se consigue menos que el liquido y hay que asegurarse de que el vendedor tenga existencias constantes.

Dificil dosificar. Sin gotero, es mas complicado medir exactamente 1 ml. Requieres practica para no desperdiciar producto.

## Para quien es mejor la espuma

- Pieles sensibles que se irritan con el liquido
- Personas con poco tiempo en las mañanas
- Quienes ya tienen barba y el liquido no llega bien a la piel
- Climas calidos donde el liquido tarda mas en evaporarse

## Para quien es mejor el liquido

- Principiantes con presupuesto limitado
- Quienes necesitan cubrir areas grandes (cuero cabelludo)
- Personas sin sensibilidad al propilenglicol
- Quienes priorizan el ahorro por botella

Si estas empezando, prueba liquido un mes. Si tu piel lo tolera bien, quedate con liquido y ahorrate la diferencia. Si te irrita, la espuma es tu opcion. Escribenos para precios y disponibilidad.`,
      category: "Espuma",
      date: "2026-06-05",
    },
    {
      title: "Primer mes con minoxidil Kirkland: que esperar semana a semana",
      excerpt: "Bitacora realista de las primeras 4 semanas de tratamiento. Sin fotos retocadas ni promesas falsas. Lo que de verdad pasa.",
      body: `Empezar con minoxidil genera ilusion, pero tambien ansiedad. Aqui te contamos la cronologia honesta del primer mes, semana por semana, para que sepas que esperar y no te desanimes.

## Semana 1: Adaptacion
Aplicas tu primer dosis. El olor a alcohol te sorprende. Sientes el liquido fresco sobre la piel. Tarda en secar mas de lo que esperabas. La piel puede sentirse ligeramente tirante o seca. Ningun cambio visible en el vello. Es normal.

## Semana 2: Resequedad o nada
Para el dia 10, si tienes piel sensible, notaras algo de resequedad, escamacion o comezon ligera. No te asustes: es el propilenglicol haciendo lo suyo. Usa un hidratante sin alcohol 30 minutos despues de aplicar minoxidil. Si no sientes nada, estas de suerte: tu piel tolera bien el liquido.

## Semana 3: La semana de la duda
Aqui es donde muchos abandonan. Piensas "no veo nada, esto no funciona". Tranquilo. Los foliculos apenas se estan despertando. No esperes ver vello nuevo todavia. Lo que si puedes notar es que el vello fino que ya tenias se ve ligeramente mas oscuro.

## Semana 4: Primeras microseñales
Con suerte (y buena genetica), notaras algo de pelusa nueva muy finita y clara. Parece nada, pero es el inicio. Tambien puedes notar que el vello preexistente esta un poco mas grueso al tacto. Son señales de que el tratamiento esta funcionando.

## Lo que NO debes hacer este mes
- Tomar fotos todos los dias (te vas a frustrar)
- Compararte con fotos de internet
- Dejar de aplicar los fines de semana
- Comprar un chingo de productos extra (empieza solo con minoxidil)

El primer mes es de prueba y adaptacion. Si lograste la constancia diaria, ya ganaste la mitad de la batalla.`,
      category: "Rutina",
      date: "2026-06-06",
    },
    {
      title: "Como aplicar minoxidil en el cabello sin desperdiciar producto",
      excerpt: "Tecnica correcta para entradas, coronilla y linea media. Como separar el cabello y usar el gotero sin que el liquido se vaya a otras partes.",
      body: `Aplicar minoxidil en la cabeza no es simplemente echar gotas al tanteo. Si no tienes tecnica, desperdicias producto y los resultados tardan mas. Aqui la guia para cada zona.

## Entradas (linea frontal)
Separa el cabello con un peine fino o con los dedos para exponer la piel directamente. Aplica gota a gota sobre la zona de la entrada, cubriendo desde donde empieza la frente hasta unos 3 cm hacia atras. Distribuye con las yemas dando golpecitos, no frotando. 0.5 ml en cada lado.

## Coronilla (remolino)
Inclina la cabeza hacia abajo o usa un espejo pequeño para ver el area. Si tienes cabello alrededor, separalo en circulos concentricos para que el liquido llegue a la piel. Aplica en espiral desde el centro hacia afuera. Usa 1 ml completo para esta zona.

## Linea media (si se te marca)
Si notas que se te abre la linea del centro, aplica una linea delgada de gotas a lo largo de toda la raya. La clave es que el liquido toque piel, no cabello. Despues masajea suavemente en direccion perpendicular a la raya.

## Errores comunes en cabello
- Echar el gotero completo de golpe en un solo punto: el liquido escurre por la frente
- Aplicar con el cabello mojado: diluye el producto y no se absorbe
- Frotar fuerte: es innecesario y puede romper el cabello debilitado
- Echarse mas de 1 ml por zona: no acelera nada y gotea

Un tip: aplica el minoxidil justo despues de bañarte, con el cuero cabelludo limpio y seco. Asi aseguras maxima absorcion sin barreras de grasa o sudor.

Si estas tratando cabello, lo mas probable es que ocupes mas de un frasco al mes. Revisa nuestros paquetes de 3, 6 y 12 meses. El de 6 meses es el que mas conviene para tratamiento capilar.`,
      category: "Cabello",
      date: "2026-06-07",
    },
    {
      title: "Como lavar tu cara antes y despues del minoxidil sin arruinar el tratamiento",
      excerpt: "La limpieza facial es parte esencial de la rutina. Que jabon usar, cuando lavar, temperatura del agua y errores comunes que resecan la piel.",
      body: `Lavarse la cara suena a lo mas basico del mundo, pero cuando estas en tratamiento con minoxidil, un mal lavado puede jugarte en contra.

## Antes de aplicar

La piel debe estar limpia y seca. Si tienes grasa, sudor, residuos de crema o contaminacion, el minoxidil no penetra bien. Usa un jabon neutro, sin alcohol, sin fragancias fuertes. Los jabones medicados o muy agresivos resecan de mas.

Agua tibia, nunca caliente. El agua caliente dilata los poros si, pero tambien reseca y puede irritar la piel ya de por si sensible por el minoxidil.

Seca dando golpecitos suaves con una toalla limpia. No frotes. La friccion irrita la piel y puede causar microlesiones.

## Despues de las 4 horas

El minoxidil necesita minimo 4 horas para absorberse al 100%. Durante ese lapso: no te laves la cara, no te metas a nadar, no sudes en exceso.

Pasadas las 4 horas, lavate con el mismo jabon neutro y agua tibia. Retira bien los residuos del producto. El alcohol y el propilenglicol que quedan en la superficie resecan la piel si los dejas mucho tiempo.

Despues del lavado, aplica un hidratante ligero, sin alcohol, tipo gel o serum. Algo que no tape los poros. Esto ayuda a reparar la barrera de la piel antes de la siguiente aplicacion de minoxidil.

## Productos que debes evitar

- Jabones con alcohol o astringentes
- Exfoliantes fisicos (los que tienen granitos)
- Tonicos con acidos fuertes
- Agua micelar como unico metodo de lavado (no retira bien los residuos grasos)

Si tu piel se reseca mucho, considera cambiar de liquido a espuma o complementar con aceite de jojoba despues del lavado nocturno. Escribenos si necesitas orientacion con productos para piel sensible.`,
      category: "Rutina",
      date: "2026-06-08",
    },
    {
      title: "10 mitos del minoxidil que la mayoria cree y no son verdad",
      excerpt: "Desmentimos las creencias mas extendidas sobre el minoxidil. Desde la caida del cabello hasta los supuestos efectos secundarios permanentes.",
      body: `Hay muchisima desinformacion dando vueltas sobre el minoxidil. Aqui desmentimos los 10 mitos mas comunes que seguro has escuchado.

## Mito 1: "Si dejas de usar minoxidil se te cae mas que antes"
Falso. Lo que pasa es que pierdes las ganancias. El pelo que crecio gracias al minoxidil se cae al dejar el tratamiento porque el foliculo vuelve a su estado original. Pero no te quedas peor que al principio.

## Mito 2: "El minoxidil causa impotencia"
Este mito viene de la confusion con el finasteride, que es un medicamento distinto que actua sobre hormonas. El minoxidil es un vasodilatador topico, no afecta las hormonas ni la funcion sexual.

## Mito 3: "Si uso minoxidil me sale pelo en toda la cara aunque no aplique ahi"
Si el minoxidil solo se absorbe en el area donde lo aplicas. Si te sale vello en otras zonas es porque accidentalmente te tocas ahi con los dedos sin lavarte las manos. Solucion simple: lavate las manos despues de aplicar.

## Mito 4: "La espuma es menos efectiva que el liquido"
Misma concentracion (5%), mismo ingrediente activo. La efectividad es identica. Lo que cambia es la velocidad de secado y la tolerancia de la piel.

## Mito 5: "Los resultados son permanentes"
No. Si dejas el tratamiento, los folículos que dependian del minoxidil para mantenerse activos regresan a su estado anterior. El tratamiento es de mantenimiento.

## Mito 6: "Duele o arde al aplicarlo"
En piel sana e intacta, el minoxidil no deberia doler. Si arde, es probable que tengas la piel lastimada, irritada o que estes usando dermaroller sin esperar el tiempo adecuado.

## Mito 7: "Necesitas receta medica para comprar minoxidil"
En Mexico, el minoxidil topico al 5% es de venta libre. No necesitas receta. Pero si tienes condiciones medicas preexistentes, consulta a tu medico antes de empezar.

## Mito 8: "Funciona igual para todos"
La genetica manda. Si tu papa y tu abuelo son lampiños, el minoxidil puede ayudar pero no te va a dar barba de lenador. Los resultados varian muchisimo entre personas.

## Mito 9: "Usar mas cantidad acelera los resultados"
Usar mas de 1 ml por dosis solo causa irritacion, desperdicio y posible absorcion sistemica. Mas no es mejor.

## Mito 10: "El minoxidil hace que se te caiga el cabello sano"
El shedding (caida temporal al inicio del tratamiento) solo afecta el vello debil que iba a caerse de todos modos. Lo acelera para que salga vello nuevo mas fuerte.`,
      category: "Mitos",
      date: "2026-06-09",
    },
    {
      title: "Donde comprar minoxidil original en CDMX sin que te estafen",
      excerpt: "Identifica vendedores confiables de minoxidil en la Ciudad de Mexico. Señales de alerta y como verificar que tu compra es segura.",
      body: `Comprar minoxidil Kirkland original en CDMX deberia ser facil, pero la cantidad de vendedores patito y paginas fraudulentas que han salido hace que uno desconfie. Esta guia te ayuda a comprar seguro.

## Caracteristicas de un vendedor serio

**Sucursal fisica.** Si el vendedor tiene un local establecido al que puedes ir, inspeccionar el producto y pagar en persona, eso ya es buena señal. Los estafadores operan solo en linea y desaparecen.

**Te deja revisar antes de pagar.** Un vendedor legitimo no tiene problema en que veas el producto antes de soltar la lana. Lote, caducidad, sellos. Si se ponen nerviosos cuando pides verlo, desconfia.

**Precio congruente.** Si alguien te ofrece Kirkland a $100 pesos la botella, es falso. El precio del mercado ronda los $200-$300 por unidad, dependiendo del paquete. Lo demasiado barato es robado o pirata.

**WhatsApp de atencion.** Un numero de telefono real, no solo formulario web. Que te respondan dudas, te manden fotos reales y te orienten sin presionarte a comprar ya.

## Banderas rojas de estafa

- Solo aceptan deposito o transferencia por adelantado
- No tienen ubicacion fisica ni direccion comprobable
- Usan fotos genericas de internet, no fotos reales de su inventario
- Precios sospechosamente bajos
- Pagina web sin informacion de contacto, solo un carrito de compras
- Reseñas falsas o genericas en sus redes

## La ventaja de comprar en persona

Cuando compras en sucursal o con entrega personal contra entrega, el riesgo es cero. Revisas el producto sellado, verificas que la botella tenga el lote grabado a laser, la tapa child-proof, y la fecha de caducidad vigente. Luego pagas.

Nosotros tenemos sucursal en Plaza Guelatao, Iztapalapa, y entregas personales gratis en CDMX, Neza y zona Oriente. Escribenos al WhatsApp.`,
      category: "Compra",
      date: "2026-06-10",
    },
    {
      title: "El efecto shedding: por que se te cae el pelo y en realidad es buena señal",
      excerpt: "Todo sobre la caida temporal del cabello al iniciar minoxidil. Cuanto dura, como identificarlo y por que indica que el tratamiento esta funcionando.",
      body: `El shedding es probablemente la etapa mas desconcertante del tratamiento. Estas aplicando minoxidil religiosamente y de repente... se te empieza a caer mas pelo. Tranquilo, compa. Es esperado y hasta deseable.

## Que es el shedding

Shedding significa "muda" en ingles. Es un periodo temporal, usualmente entre las semanas 2 y 8 del tratamiento, donde notas que se te cae mas pelo de lo normal. Puede ser pelo de la barba, cabello o ambos.

## Por que pasa

El minoxidil acelera el ciclo de vida del pelo. Los folículos que estan en fase de reposo (telogena) o que estan produciendo vello debil y miniaturizado reciben la orden de "soltar" ese pelo viejo para que nazca uno nuevo mas fuerte.

Imagina que estas redecorando tu casa: primero tienes que sacar los muebles viejos para meter los nuevos. El shedding es exactamente eso. La caida es temporal (2-4 semanas maximo) y despues empieza a brotar vello nuevo, mas grueso y oscuro.

## Como diferenciarlo de una caida anormal

- El shedding afecta zonas donde aplicas minoxidil, no toda la cabeza
- Es difuso: se caen varios pelitos finos, no mechones enteros
- Despues de 3-4 semanas la caida se detiene sola
- La piel no se ve irritada ni roja (si es el caso, puede ser dermatitis)

## Que hacer durante el shedding

Nada distinto. Sigue tu rutina normal. No aumentes la dosis, no agregues productos nuevos, no dejes el tratamiento. Abandonar en esta etapa es el error clasico: te quedas con la caida sin llegar a ver el rebrote.

## Lo que NO debes hacer
- Dejar el tratamiento pensando que te esta haciendo daño
- Aplicar mas cantidad para "compensar"
- Estresarte (el cortisol empeora la caida)
- Publicar en foros que "minoxidil me dejo pelon"

Aguanta vara. En 2-3 semanas la caida para y empieza lo chido.`,
      category: "Shedding",
      date: "2026-06-11",
    },
    {
      title: "Shampoo con minoxidil: complemento, no remplazo del tratamiento",
      excerpt: "Diferencias entre el shampoo con minoxidil y el tratamiento topico. Cuando conviene usarlo y por que no sustituye la aplicacion directa.",
      body: `Cada vez ves mas seguido shampoos que dicen tener minoxidil en su formula. Esta bien integrarlos, pero ojo: no remplazan al tratamiento topico ni de chiste.

## Por que un shampoo no puede sustituir al minoxidil topico

El shampoo esta diseñado para limpiar, no para administrar medicamentos. El tiempo de contacto de un shampoo con el cuero cabelludo es de 2-3 minutos antes de enjuagarlo. En ese lapso, la cantidad de minoxidil que realmente penetra al foliculo es minuscula comparada con la aplicacion directa que se deja por 4 horas.

Ademas, los shampoos tienen detergentes (surfactantes) cuya funcion es arrastrar la grasa y suciedad. Esto tambien arrastra la mayor parte del principio activo que pudiera absorberse. La biodisponibilidad es bajisima.

## Cuando si conviene usarlo

El shampoo con minoxidil funciona bien como complemento, no como tratamiento principal. Su rol es mantener el cuero cabelludo limpio y libre de residuos que bloquean los foliculos, mientras que el minoxidil en la formula aporta un extra marginal.

Usalo como tu shampoo diario, y sigue aplicando tu minoxidil topico dos veces al dia. La combinacion puede ser beneficiosa, especialmente si tienes caspa, exceso de grasa o dermatitis seborreica que obstruye los foliculos.

## Nuestros shampoos

Manejamos el Shampoo Minoxidil Control Caida de 500 ml ($280) y el Shampoo Bergamota Crecimiento de 500 ml ($280). Ambos son buenos complementos para mantener el cuero cabelludo limpio y sano durante el tratamiento.

Pero recuerda: la base de tu tratamiento es el minoxidil topico. Lo demas es apoyo. Escribenos si quieres armar tu rutina completa con shampoo incluido.`,
      category: "Producto",
      date: "2026-06-12",
    },
    {
      title: "Jabones de crecimiento para barba: sirven o es puro marketing",
      excerpt: "Analisis honesto de los jabones artesanales con biotina y sus ingredientes. Que pueden y que no pueden hacer por el crecimiento de tu barba.",
      body: `Los jabones de crecimiento para barba estan de moda. Los ves en todos lados: bergamota, biotina, carbon activado, etc. Pero realmente sirven para que te crezca la barba?

## Lo que un jabon SÍ puede hacer

Un buen jabon mantiene la piel limpia, libre de exceso de grasa, celulas muertas y bacterias. Una piel limpia es un mejor ambiente para que el minoxidil se absorba y los foliculos funcionen sin obstrucciones.

Los jabones con ingredientes como biotina, aceite de bergamota, aceite de jojoba o vitamina E hidratan la piel y el vello existente, previniendo la resequedad que causa el minoxidil. Esto reduce la irritacion y la descamacion, haciendo que sea mas facil mantener la constancia del tratamiento.

## Lo que un jabon NO puede hacer

Un jabon no va a despertar foliculos dormidos. No importa cuantos ingredientes milagrosos le pongan. El tiempo de contacto del jabon con la piel es de 1-2 minutos antes de enjuagar. No es suficiente para que ningun activo penetre hasta la raiz del foliculo y lo estimule.

Las empresas que te venden "jabon magico para que te crezca barba en 30 dias" te estan viendo la cara. El jabon es un complemento de higiene y cuidado, no un tratamiento.

## Nuestra recomendacion honesta

Los jabones Maximus que manejamos (desde $100 pesos) son productos artesanales de buena calidad. Huelen bien, limpian sin resecar y ayudan a cuidar la piel durante el tratamiento. Pero no esperes que te hagan crecer barba donde no hay.

El combo ganador es: minoxidil topico como tratamiento principal + jabon suave para mantener la piel limpia y sana + biotina como suplemento nutricional. Tres patas de la mesa: estimulo, higiene y nutricion.`,
      category: "Producto",
      date: "2026-06-13",
    },
    {
      title: "Balsamo de bergamota: el aliado natural de tu rutina de barba",
      excerpt: "Por que el balsamo de bergamota es el complemento favorito de quienes usan minoxidil. Hidratacion, aroma y beneficios para la piel.",
      body: `El balsamo de bergamota es uno de esos productos que, sin ser el protagonista, mejora muchisimo la experiencia del tratamiento con minoxidil.

## Que es la bergamota

La bergamota es un citrico que crece principalmente en el sur de Italia. Su aceite esencial tiene propiedades antisepticas, antiinflamatorias y astringentes suaves. En el mundo del cuidado de barba, se usa para hidratar el vello, calmar la piel irritada y dar aroma fresco.

## Por que combina tan bien con minoxidil

El minoxidil, especialmente el liquido, reseca la piel por el alcohol y el propilenglicol. Con el tiempo, esa resequedad puede causar descamacion, comezon y aspecto de piel maltratada.

El balsamo de bergamota actua como reparador. Despues de tus 4 horas de minoxidil y tu lavado, aplicas una pequeña cantidad de balsamo sobre la zona de la barba. Hidrata la piel, nutre el vello y deja un aroma fresco.

## Como usarlo correctamente

1. Aplicas minoxidil en la mañana y/o noche
2. Esperas al menos 4 horas
3. Lavas tu cara con jabon neutro y secas
4. Tomas una cantidad pequeña de balsamo (tamaño de un chicharo)
5. Frotas entre las manos para calentarlo
6. Aplicas sobre la barba con movimientos hacia abajo

No lo uses ANTES del minoxidil porque crea una barrera de aceite que impide la absorcion.

## Nuestros balsamos

Manejamos Balsamo Bergamota Maximus Beard de 45g ($200), Balsamo Crecimiento al 12% ($480) y el Kit Gran Barbon (3 meses Kirkland + Balsamo por $780). Pregunta por el que mejor se ajuste a tu rutina.`,
      category: "Producto",
      date: "2026-06-14",
    },
    {
      title: "Como tomar fotos de progreso de tu barba que realmente sirvan",
      excerpt: "Metodo practico para documentar tu avance con minoxidil. Iluminacion, angulos, frecuencia y como evitar los errores que hacen que las fotos no comparen.",
      body: `Uno de los errores mas comunes es tomar fotos de progreso que no sirven para nada. Cambios de luz, angulos distintos, barba de 3 dias vs recien rasurada. Asi no se puede comparar nada.

## El metodo correcto

Toma las fotos siempre en el mismo lugar, a la misma hora y con la misma iluminacion. Lo ideal es junto a una ventana con luz natural indirecta. Nada de flash ni focos amarillos que cambian el tono de la piel.

Angulo fijo. Coloca tu celular en un tripie o apoyado contra algo. Las fotos deben ser: una de frente, una de cada perfil (derecho e izquierdo) y una del cuello hacia arriba (para ver definicion de mandibula).

## Frecuencia ideal

Una vez al mes, el mismo dia. Ni cada semana (no se ve diferencia y te frustras) ni cada 6 meses (te pierdes la motivacion de ver avances). El dia 1 de cada mes es facil de recordar.

## Condiciones para que la comparacion sea valida

- Siempre recien rasurado (al ras, con rasuradora electrica o rastrillo)
- O siempre con el mismo largo de barba (por ejemplo, crecida de 1 semana exacta)
- Sin productos en la cara (sin balsamo, sin aceite, sin brillo)
- Sin editar ni aplicar filtros (nada de blanco y negro, ni contraste, ni nada)
- Misma ropa o sin camisa (la ropa oscura hace que la barba resalte mas artificialmente)

## Como guardar las fotos

Crea un album en tu telefono que se llame "Progreso Barba" con la fecha de cada foto. Al cabo de 3, 6 y 12 meses, pones las fotos lado a lado y ahi si vas a notar la diferencia real.

La mayoria de los "resultados increibles" que ves en internet usan iluminacion engañosa. Con este metodo, tus comparaciones seran honestas y utiles para decidir si sigues o ajustas tu rutina.

Escribenos si llevas tiempo con tratamiento y sientes que te estancaste. Te orientamos.`,
      category: "Rutina",
      date: "2026-06-15",
    },
    {
      title: "Minoxidil y gimnasio: mitos y realidades de hacer ejercicio en tratamiento",
      excerpt: "Si sudar afecta el minoxidil, si el ejercicio aumenta la testosterona y acelera resultados, y como organizar tus horarios de gym y aplicacion.",
      body: `Si eres de los que van al gym y estas usando minoxidil, seguro te has preguntado si una cosa afecta a la otra. Vamos por partes.

## El sudor y el minoxidil

El minoxidil necesita un minimo de 4 horas para absorberse. Si aplicas minoxidil y a los 20 minutos te metes al gym a sudar como bestia, el sudor va a arrastrar el producto antes de que penetre. Resultado: desperdiciaste esa dosis.

Solucion sencilla: aplica minoxidil DESPUES del gym, no antes. O aplica en la mañana, dejalo secar 4 horas, y ya en la tarde vas al gym sin problema.

## El ejercicio y la testosterona

Hay una creencia de que hacer ejercicio aumenta la testosterona y que eso acelera el crecimiento de barba. Es parcialmente cierto. El ejercicio de fuerza (pesas, no cardio) produce picos temporales de testosterona. Pero ese aumento es marginal y de corta duracion.

La testosterona es uno de los factores que influyen en el crecimiento de barba, pero el principal determinante es la genetica: la sensibilidad de tus foliculos a la DHT (dihidrotestosterona). Si geneticamente no tienes receptores sensibles en la cara, por mas testosterona que tengas, no te va a crecer barba.

## El combo inteligente

Entrenar pesas ayuda a tu salud general, mejora tu circulacion sanguinea y reduce el estres. Esto indirectamente beneficia cualquier tratamiento, incluido el minoxidil. Pero no esperes que por hacer sentadillas te salga barba en 2 meses.

Organiza tus horarios:
- Mañana: Gym + baño + minoxidil
- Noche: Lavado de cara + minoxidil

O:
- Mañana temprano: Minoxidil, esperar 4 horas
- Medio dia/tarde: Gym

Lo importante es que las 4 horas posteriores a la aplicacion estes sin sudar.`,
      category: "Rutina",
      date: "2026-06-16",
    },
    {
      title: "El minoxidil mancha la ropa y la almohada: mitos y soluciones",
      excerpt: "Resuelve las dudas mas comunes: si el minoxidil destine, mancha o deja residuos. Tips practicos para mantener tu ropa y cama limpias.",
      body: `Una preocupacion frecuente, sobre todo al inicio, es si el minoxidil va a dejar manchas amarillas en la ropa, la almohada o la piel. Vamos aclarando.

## Mancha la piel?

Aplicado correctamente, no. Pero si dejas que el liquido se acumule sin limpiar los residuos, con el tiempo puede dejar un leve tono amarillento en la piel, especialmente en personas de tez clara. Esto se resuelve lavando la cara pasadas las 4 horas de absorcion. El residuo se va con agua y jabon.

## Mancha la ropa?

El minoxidil liquido, si entra en contacto con telas blancas o de colores claros, puede dejar una mancha amarillenta que con los lavados se vuelve permanente. Esto pasa porque el liquido se oxida al contacto con el aire y los tejidos.

La solucion es simple: espera a que se seque COMPLETAMENTE en tu cara (20-30 minutos, hasta que no sientas nada humedo al tacto) antes de ponerte una camisa o acostarte. Si usas gorro, buff o banda para dormir, eso protege tu almohada.

## Mancha la almohada?

Si aplicas de noche y te duermes sin esperar a que seque, si. La funda blanca agarra un tono amarillento. Soluciones:
- Usa funda de color oscuro (no se nota)
- Aplica minoxidil al menos 30-40 minutos antes de acostarte
- Duerme boca arriba si puedes
- Usa una toalla pequeña sobre la almohada

## El caso de la espuma

La espuma Kirkland no mancha. Al no contener propilenglicol y secarse en minutos, practicamente no deja residuos en telas. Si las manchas son un problema constante para ti, considera el cambio a espuma.

Un tip extra: lavate las manos inmediatamente despues de aplicar. Si te tocas la ropa con los dedos mojados de minoxidil, ahi si dejas marcas.`,
      category: "Cuidados",
      date: "2026-06-17",
    },
    {
      title: "Kit del Barbon: la mejor forma de empezar tu tratamiento de barba",
      excerpt: "Por que el combo de 3 meses de Kirkland mas Biotina es el punto de entrada ideal. Que incluye, cuanto cuesta y como usarlo.",
      body: `De todos los paquetes que manejamos, el Kit del Barbon es el mas recomendado para principiantes. Aqui te explicamos por que.

## Que incluye el Kit del Barbon

- Tres botellas de Minoxidil Kirkland 5% liquido (tratamiento para 3 meses)
- Un frasco de Biotina Natrol de 10,000 MCG con 100 tabletas
- Precio: $1,000 pesos

Es basicamente el combo inicial completo. Tienes el producto principal (minoxidil) para tres meses de aplicacion diaria, y el suplemento (biotina) para apoyar el crecimiento desde adentro.

## Por que 3 meses es el tiempo ideal para empezar

Un mes es muy poco. Apenas estas adaptandote y no ves resultados. Seis meses es mas compromiso del necesario para alguien que apenas va a probar si el tratamiento le funciona.

Tres meses es el punto dulce: te da tiempo de establecer la rutina, llegar a la etapa donde aparecen los primeros resultados (semanas 8-12), y decidir con evidencia real si quieres continuar o no.

## Cuanto te ahorras vs comprar por separado

Si compraras cada cosa individual:
- 3 botellas Kirkland (1 mes c/u a $250): $750
- Biotina Natrol 100 tabletas: $450
- Total por separado: $1,200

Con el Kit del Barbon: $1,000. Te ahorras $200 y te llevas todo junto, sin tener que volver a pedir cada mes.

## Como usar el kit

- Minoxidil: 1 ml dos veces al dia, todos los dias
- Biotina: 1 tableta diaria con el desayuno

En tres meses evaluas resultados. Si te funciono, te pasas al paquete de 6 meses que tiene mejor precio por botella.

Escribenos por WhatsApp para pedir tu Kit del Barbon. Te mandamos foto del lote actual y coordinamos la entrega.`,
      category: "Kit",
      date: "2026-06-18",
    },
    {
      title: "Rutina nocturna de minoxidil: el habito que acelera resultados",
      excerpt: "Como aprovechar la noche para maximizar la absorcion del minoxidil. Pasos, tiempos y productos complementarios para tu rutina antes de dormir.",
      body: `La aplicacion nocturna de minoxidil es, para muchos, la mas importante del dia. Durante la noche, tu cuerpo esta en modo reparacion, la circulacion es estable y no hay exposicion al sol, sudor ni contaminacion. Es el momento ideal para que el minoxidil actue sin interrupciones.

## Paso a paso de la rutina nocturna

**8:00 PM** — Lavas tu cara con jabon neutro y agua tibia. Retiras todo el residuo de la aplicacion de la mañana, mas la grasa y suciedad del dia. Secas a golpecitos.

**8:15 PM** — Aplicas 1 ml de minoxidil sobre la zona de barba (o cabello). Distribuyes suave, masajeando sin frotar. Dejas secar al aire.

**8:45 PM** — A esta hora el minoxidil ya deberia estar seco al tacto. Si usas balsamo o hidratante, este es el momento (no antes, porque bloquea la absorcion).

**9:30 PM en adelante** — Ya puedes recargarte en la almohada sin preocupacion. Si quieres proteger tu funda, pon una toalla pequeña.

## Por que de noche funciona mejor

- Cero exposicion solar (el minoxidil se degrada con luz UV directa)
- Sin sudor ni movimiento que arrastre el producto
- Piel en modo reparacion natural
- Menos probabilidad de olvidar la dosis (la asocias con tu rutina de dormir)

## Lo que NO debes hacer de noche

- Aplicar e irte a dormir inmediatamente (el producto se va a la almohada, no a tu piel)
- Usar productos con retinol o acidos fuertes en la misma zona
- Dejar el minoxidil toda la noche sin lavar en la mañana

Al dia siguiente, al despertar, lavas tu cara para retirar el residuo nocturno y aplicas tu dosis de la mañana. Dos aplicaciones diarias, separadas por 12 horas, es el ritmo que demostro mejores resultados.`,
      category: "Rutina",
      date: "2026-06-19",
    },
    {
      title: "Como guardar tu minoxidil para que dure los 6 meses sin perder efectividad",
      excerpt: "Consejos de almacenamiento para mantener tu minoxidil en optimas condiciones. Temperatura, luz, humedad y como detectar si ya caduco.",
      body: `Compraste el paquete de 6 meses. Tienes 6 botellas en casa. Como las guardas para que la ultima este tan efectiva como la primera?

## Temperatura ideal

El minoxidil debe almacenarse entre 15 y 25 grados centigrados. Alejalo de fuentes de calor como estufas, ventanas con sol directo o el interior de un coche estacionado. El calor acelera la degradacion de los compuestos.

En verano, si tu casa se calienta mucho, guarda los frascos en un cajon fresco, en la parte baja de un closet o en una caja de carton que los aisle del calor ambiental.

## Luz

El minoxidil es fotosensible. La luz directa, especialmente la ultravioleta, degrada el principio activo. Siempre guarda los frascos cerrados en su caja original o en un lugar oscuro. Nada de dejarlos en el buró junto a la ventana.

## Humedad

El baño NO es buen lugar para guardar minoxidil. La humedad del vapor de la regadera puede contaminar los frascos y afectar la formula. Aunque esten cerrados, los cambios de temperatura y humedad constantes no son ideales.

## Como saber si un frasco ya no sirve

Un minoxidil en buen estado es transparente o ligeramente amarillento. Si al abrir un frasco notas:
- Color marron o turbio
- Olor rancio o distinto al alcohol normal
- Cristales que no se disuelven al agitar a temperatura ambiente
- Sedimento visible

Probablemente ese frasco ya caduco o se almaceno mal. No lo uses. Contactanos para que te demos uno en buen estado.

## Duracion real

La fecha de caducidad en la caja es conservadora. Bien almacenado, el minoxidil puede durar 2-3 años sin perder potencia significativa. Pero si compraste para 6-12 meses, no deberias tener problema siempre que sigas las recomendaciones de arriba.

Escribenos si tienes dudas sobre el almacenamiento o quieres verificar la fecha de caducidad de los lotes actuales.`,
      category: "Cuidados",
      date: "2026-06-20",
    },
    {
      title: "Como manejar la resequedad extrema causada por el minoxidil sin dejar el tratamiento",
      excerpt: "Estrategias practicas para pieles que sufren con el propilenglicol. Productos, rutinas y cambios que alivian sin sacrificar resultados.",
      body: `La resequedad es el efecto secundario mas reportado del minoxidil liquido. Puede ser desde una ligera tirantez hasta descamacion visible que da pena. Pero no tienes que elegir entre aguantartela o abandonar.

## Por que reseca tanto

El culpable principal es el propilenglicol, un excipiente que ayuda a que el minoxidil se absorba, pero que tambien extrae humedad de la piel. Combinado con el alcohol (que evapora y se lleva parte de los aceites naturales de tu piel), el resultado es una piel seca, irritada y escamosa.

## Estrategia 1: Hidratacion post-minoxidil

Pasadas las 4 horas de absorcion, lava tu cara y aplica un hidratante. Los mejores para este caso:
- Aceite de jojoba (3-4 gotas): es el mas parecido al sebo natural de la piel
- Gel de aloe vera puro: refresca y calma
- Crema con ceramidas: repara la barrera cutanea

NUNCA apliques hidratante antes del minoxidil. Formas una pelicula que bloquea la absorcion.

## Estrategia 2: Reduce la friccion

Al lavarte, seca a golpecitos, no tallando. Usa toallas de microfibra (son mas suaves). Al aplicar minoxidil, distribuye con las yemas, no con las uñas ni la palma.

## Estrategia 3: Cambia a espuma

Si ya probaste todo y la resequedad sigue, la espuma Kirkland es tu solucion. No contiene propilenglicol y es mucho mas amigable con pieles sensibles. Si, es mas cara, pero tu comodidad lo vale.

## Estrategia 4: Dermaroller en la noche de hidratacion

El dia que uses dermaroller (sin minoxidil), aplica aceite de jojoba o un suero hidratante despues del rodillo. Los microcanales ayudan a que los hidratantes penetren mejor. Matas dos pajaros de un tiro: estimulas crecimiento e hidratas profundo.

Escribenos si la resequedad no se te quita. Podemos orientarte sobre el cambio a espuma o productos complementarios.`,
      category: "Cuidados",
      date: "2026-06-21",
    },
    {
      title: "Testosterona, DHT y barba: la relacion real explicada sin tecnicismos",
      excerpt: "Entiende el papel de las hormonas en el crecimiento de barba. Por que unos tienen barba tupida y otros no, y donde entra el minoxidil en esta ecuacion.",
      body: `La genetica de la barba es uno de los temas que mas confusion genera. Vamos a explicarlo simple, sin terminos medicos rebuscados.

## Los tres actores principales

**Testosterona:** Es la hormona masculina por excelencia. Circula por tu sangre y cumple muchas funciones. En los foliculos de la barba, la testosterona es convertida en DHT por una enzima llamada 5-alfa-reductasa.

**DHT (dihidrotestosterona):** Esta es la hormona que realmente estimula el crecimiento de la barba y el vello corporal. Es mucho mas potente que la testosterona para este proposito.

**Receptores androgenicos:** Son como "cerraduras" en tus foliculos. La DHT es la "llave". Si tus foliculos en la cara tienen muchos receptores y son sensibles a la DHT, tendras barba tupida. Si tienes pocos receptores o son poco sensibles, aunque tengas testosterona por los cielos, no te crecera barba.

## Por que hay lampiños con mucha testosterona

La cantidad de testosterona en sangre no determina la barba. Lo que determina es la sensibilidad genetica de tus foliculos faciales a la DHT. Es como tener un carro con mucha gasolina (testosterona) pero sin llave (receptores). La gasolina no sirve si no la puedes usar.

## Donde entra el minoxidil

El minoxidil no es hormonal. No afecta la testosterona ni la DHT. Actua por una via completamente distinta: mejora la circulacion y prolonga la fase de crecimiento del foliculo. Es como darle fertilizante a una planta. No cambia la genetica de la planta, pero la ayuda a crecer mas fuerte.

Por eso el minoxidil funciona mejor en personas que YA tienen algo de vello (asi sea fino). Si los foliculos estan ahi y los receptores tambien, el minoxidil les da el empujon que necesitan. Si geneticamente no tienes foliculos en la zona, el minoxidil no puede inventarlos.`,
      category: "Ciencia",
      date: "2026-06-22",
    },
    {
      title: "Guia de precios de minoxidil Kirkland en Mexico: cuanto pagar y cuanto es demasiado",
      excerpt: "Precios de referencia actualizados de Minoxidil Kirkland en el mercado mexicano. Como identificar precios justos y cuando sospechar de una oferta.",
      body: `El precio del Minoxidil Kirkland en Mexico varia muchisimo. Aqui te damos una referencia honesta para que sepas que estas pagando un precio justo y cuando te quieren ver la cara.

## Precios de referencia (Mayo-Junio 2026)

- 1 mes Kirkland liquido: $200 - $300 MXN
- 3 meses Kirkland liquido: $550 - $700 MXN
- 6 meses Kirkland liquido: $1,000 - $1,200 MXN
- 12 meses Kirkland liquido: $1,800 - $2,200 MXN
- 1 mes Kirkland espuma: $400 - $550 MXN

Estos precios asumen producto original, importado legalmente, con numero de lote vigente y caducidad de al menos 12 meses.

## Cuando un precio es demasiado bajo

Si ves 1 mes de Kirkland en $80-$150 pesos, es falso o robado. No hay forma de importar producto legitimo, pagar impuestos, distribucion y tener margen a ese precio. Desconfia.

## Cuando un precio es demasiado alto

Si te quieren cobrar $500 por 1 mes de Kirkland liquido, te estan viendo la cara. Ese es precio de Rogaine de farmacia elegante, no de Kirkland.

## Nuestros precios

Manejamos precios competitivos porque importamos directo y no tenemos los costos de una tienda de lujo ni los margenes de reventa multiple. Ademas, al comprar paquetes de 3, 6 o 12 meses, el precio por botella baja significativamente.

## Lo que incluye el precio

Cuando compras con nosotros, el precio incluye:
- Producto Kirkland 100% original con lote vigente
- Asesoria personalizada por WhatsApp
- Entrega personal gratis en CDMX, Iztapalapa y Neza
- Pago contra entrega (cero riesgo)

Escribenos para cotizar tu paquete. Te decimos precio exacto segun la presentacion que te convenga y tu zona de entrega.`,
      category: "Compra",
      date: "2026-06-23",
    },
    {
      title: "Recapitulacion de 6 meses con Kirkland: lo que aprendimos en el camino",
      excerpt: "Resumen de todo el conocimiento acumulado sobre minoxidil, Kirkland, barba y cabello. Los aprendizajes clave para quien empieza o ya va a medio camino.",
      body: `Despues de 25 articulos cubriendo practicamente todo lo relacionado con minoxidil, Kirkland, barba y cabello, hacemos un resumen de lo mas importante.

## Los 5 aprendizajes clave

**1. La constancia mata al talento.** El mejor minoxidil del mundo no sirve si lo aplicas un dia si y dos no. La rutina diaria, sin excusas, es lo unico que garantiza resultados.

**2. El producto original es innegociable.** Comprar minoxidil pirata o de dudosa procedencia no solo es tirar el dinero, es arriesgar tu piel a sustancias desconocidas. Siempre verifica lote, tapa y presentacion antes de pagar.

**3. Los complementos ayudan, pero no remplazan.** Biotina, dermaroller, shampoos y balsamos son aliados valiosos. Pero ninguno sustituye al minoxidil topico. Son acompañamiento, no plato principal.

**4. La genetica pone el limite, el minoxidil te lleva hasta ahi.** No esperes barba de vikingo si en tu familia todos son lampiños. El minoxidil maximiza tu potencial genetico, no lo reescribe.

**5. Comprar en persona es mas seguro.** Depositar por adelantado en paginas web desconocidas es un volado. La entrega personal con pago contra entrega elimina el riesgo de estafa.

## Lo que sigue

Si ya terminaste tu tratamiento de 3 o 6 meses y estas satisfecho, manten la rutina. Si te estancaste, revisa nuestro articulo sobre como romper la meseta. Si vas empezando, el Kit del Barbon es tu mejor puerta de entrada.

Escribenos por WhatsApp. No somos una tienda anonima: tenemos sucursal fisica en Iztapalapa, entregas personales en CDMX y zona Oriente, y envios a todo Mexico. Te orientamos sin compromiso.`,
      category: "General",
      date: "2026-06-24",
    },
  ],
  faq: [
    ["El Minoxidil Kirkland es original?", "Si, vendemos Minoxidil Kirkland 100% ORIGINAL importado directamente. Garantizamos autenticidad. Puedes revisar lote, caja, tapa y sellos antes de pagar."],
    ["En cuanto tiempo veo resultados?", "La mayoria de nuestros clientes ven cambios visibles en 4-8 semanas. La constancia diaria es la clave. Resultados mas completos en 3-6 meses."],
    ["Hacen entregas personales en CDMX y Neza?", "Si. Entregas GRATIS en Iztapalapa, Nezahualcoyotl, Los Reyes La Paz, Chalco e Ixtapaluca. Revisas el producto en mano y pagas contra entrega."],
    ["Hacen envios al resto de Mexico?", "Si. Envio nacional con tarifa fija de $140 MXN via FedEx/Estafeta. Incluye zonas extendidas de Michoacan, Guerrero, Oaxaca, Chiapas y Chihuahua."],
    ["Tienen sucursal fisica?", "Si, en Plaza Guelatao, Iztapalapa. Local 76, Pasillo 5. Horario: Martes a Domingo, 12 PM - 5 PM."],
    ["Cual es el paquete mas recomendado?", "El de 3 meses es el mas equilibrado para empezar. El de 6 meses es nuestro mas vendido por la relacion precio/beneficio."],
  ],
} as SiteData;

const WHATSAPP = "https://wa.me/525569380408?text=" + encodeURIComponent("Hola, quiero mas informacion de " + SITE.brand);

function productHref(product: Product) {
  return "https://wa.me/525569380408?text=" + encodeURIComponent(
    `Hola, quiero pedir ${product.name} por ${product.price}. Estoy en:`
  );
}

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function postPath(post: Post) {
  return `#blog/${slugify(post.title)}`;
}

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  let html = "";
  let inList: string | null = null;

  for (const line of lines) {
    if (/^### /.test(line)) {
      if (inList) { html += inList === "ul" ? "</ul>" : "</ol>"; inList = null; }
      html += `<h3>${line.replace(/^### /, "")}</h3>`;
    } else if (/^## /.test(line)) {
      if (inList) { html += inList === "ul" ? "</ul>" : "</ol>"; inList = null; }
      html += `<h2>${line.replace(/^## /, "")}</h2>`;
    } else if (/^\d+\.\s/.test(line)) {
      if (inList !== "ol") { if (inList) html += inList === "ul" ? "</ul>" : "</ol>"; html += "<ol>"; inList = "ol"; }
      html += `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
    } else if (/^[-*]\s/.test(line)) {
      if (inList !== "ul") { if (inList) html += inList === "ul" ? "</ul>" : "</ol>"; html += "<ul>"; inList = "ul"; }
      html += `<li>${line.replace(/^[-*]\s+/, "")}</li>`;
    } else if (line.trim() === "") {
      if (inList) { html += inList === "ul" ? "</ul>" : "</ol>"; inList = null; }
    } else {
      if (inList) { html += inList === "ul" ? "</ul>" : "</ol>"; inList = null; }
      html += `<p>${line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`;
    }
  }
  if (inList) { html += inList === "ul" ? "</ul>" : "</ol>"; }
  return html;
}

function App() {
  const [activePost, setActivePost] = useState(0);
  const [activeVerifyStep, setActiveVerifyStep] = useState(0);
  const [catalogFilter, setCatalogFilter] = useState("kirkland");
  const [formData, setFormData] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [hash, setHash] = useState(() => window.location.hash);

  const selectedPost = SITE.posts[activePost];

  const publishedPosts = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return SITE.posts
      .filter(p => p.date <= today)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  const activeBlogPost = useMemo(() => {
    if (!hash.startsWith("#blog/")) return null;
    const slug = hash.replace("#blog/", "");
    return publishedPosts.find((p) => slugify(p.title) === slug) ?? null;
  }, [hash, publishedPosts]);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const filteredProducts = useMemo(() => {
    if (catalogFilter === "kirkland") return SITE.products.filter((p) => /kirkland|espuma/i.test(p.name));
    if (catalogFilter === "others") return SITE.products.filter((p) => !/kirkland|espuma/i.test(p.name));
    return SITE.products;
  }, [catalogFilter]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => setFormStatus("success"), 1200);
  };

  const verifySteps = [
    { title: "Lote Grabado a Laser", detail: "Las botellas legitimas de Kirkland tienen el lote impreso en amarillo o grabado en la base. Este lote debe coincidir con el codigo de la caja.", highlight: "Lote y caja coincidente." },
    { title: "Tapa Presiona y Gira", detail: "La tapa child-proof requiere presion hacia abajo antes de girar. Tipografia en relieve limpio y anillo inferior que se rompe al primer uso.", highlight: "Tapa child-proof con relieve." },
    { title: "Consistencia y Microcristales", detail: "Liquido transparente o ligeramente amarillento con olor a alcohol. Ante frio, pueden aparecer cristales que se disuelven a temperatura ambiente.", highlight: "Solucion saturada al 5%." },
    { title: "Tipografia de Etiquetas", detail: "Etiquetas de papel adhesivo de alta calidad con textos nitidos en espanol e ingles. Sin bordes borrosos ni colores opacos.", highlight: "Textos y barras nitidos." },
  ];

  if (activeBlogPost) {
    return (
      <>
        <Header />
        <section className="blog-post-page">
          <div className="blog-post-inner">
            <a className="blog-post-back" href="#blog">← Volver al blog</a>
            <span className="blog-post-category">{activeBlogPost.category ?? "Articulo"}</span>
            <h1>{activeBlogPost.title}</h1>
            <p className="blog-post-excerpt">{activeBlogPost.excerpt}</p>
            <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(activeBlogPost.body) }} />
            <div className="blog-post-cta">
              <strong>Listo para empezar tu tratamiento?</strong>
              <p>Escribenos por WhatsApp. Te mandamos foto real del producto y coordinamos la entrega en CDMX o envio nacional.</p>
              <a className="btn btn-whatsapp btn-lg" href={WHATSAPP}>Enviar mensaje por WhatsApp</a>
            </div>
          </div>
        </section>
        <Footer />
        <FloatingWA />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">100% Original Garantizado | CDMX</div>
            <h1 className="hero-title">{SITE.h1.split("Original")[0]}<em>Original</em> en CDMX</h1>
            <p className="hero-desc">{SITE.subtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-whatsapp btn-lg" href={WHATSAPP}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                {SITE.primaryCta}
              </a>
              <a className="btn btn-outline btn-lg" href="#autenticidad">{SITE.secondaryCta}</a>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="icon">●</span> Sucursal fisica en Iztapalapa
              </div>
              <div className="hero-trust-item">
                <span className="icon">●</span> Pago contra entrega sin riesgo
              </div>
              <div className="hero-trust-item">
                <span className="icon">●</span> Envio nacional $140 fijo
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap">
              <img className="hero-image" src={`/site-images/${SITE.heroImage}`} alt={SITE.brand} />
              <div className="hero-float">
                <div className="wa-dot">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                </div>
                <div><strong>WhatsApp</strong><span>Respuesta rapida</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHENTICITY CHECKER */}
      <section className="section" id="autenticidad">
        <div className="section-header">
          <span className="eyebrow">Control de Calidad</span>
          <h2>Guia Interactiva de Originalidad</h2>
          <p className="lead">Aprende a diferenciar el Kirkland original de imitaciones con estos cuatro puntos clave de seguridad.</p>
        </div>
        <div className="auth-bento">
          <div className="auth-nav">
            {verifySteps.map((step, idx) => (
              <button key={step.title} className={activeVerifyStep === idx ? "active" : ""} onClick={() => setActiveVerifyStep(idx)}>
                <span className="num">0{idx + 1}</span>
                <strong>{step.title}</strong>
                <span className="sub">{step.highlight}</span>
              </button>
            ))}
          </div>
          <div className="auth-detail">
            <h3>{verifySteps[activeVerifyStep].title}</h3>
            <p>{verifySteps[activeVerifyStep].detail}</p>
            <div className="auth-badge">Validado por Distribuidor Autorizado</div>
            <a className="btn btn-primary btn-sm" href={WHATSAPP}>Pedir fotos reales del lote actual</a>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG */}
      <section className="section" id="productos">
        <div className="section-header">
          <span className="eyebrow">Tratamientos</span>
          <h2>Catalogo Completo de Productos</h2>
          <p className="lead">Minoxidil Kirkland original y productos complementarios. Filtra para encontrar lo que buscas.</p>
          <div className="catalog-tabs">
            <button className={catalogFilter === "kirkland" ? "active" : ""} onClick={() => setCatalogFilter("kirkland")}>Minoxidil Kirkland</button>
            <button className={catalogFilter === "all" ? "active" : ""} onClick={() => setCatalogFilter("all")}>Todo el Catalogo</button>
            <button className={catalogFilter === "others" ? "active" : ""} onClick={() => setCatalogFilter("others")}>Complementos</button>
          </div>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-img">
                <img src={`/site-images/${product.image}`} alt={product.name} />
                <span className="product-tag">{product.tag}</span>
              </div>
              <div className="product-body">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.copy}</p>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <a className="product-wa-btn" href={productHref(product)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COVERAGE */}
      <section className="section" id="cobertura">
        <div className="section-header">
          <span className="eyebrow">Logistica y Cobertura</span>
          <h2>Entregas Personales y Envios Nacionales</h2>
          <p className="lead">Entregas personales gratis con pago contra entrega en CDMX y EdoMex. Envios a toda la Republica con tarifa fija.</p>
        </div>
        <div className="coverage-grid">
          <div className="coverage-card highlight">
            <h3>📍 CDMX e Iztapalapa</h3>
            <ul className="coverage-list">
              <li><strong>Iztapalapa</strong> (Entrega Gratis)</li>
              <li>Xochimilco, Tlahuac</li>
              <li>Coyoacan, Benito Juarez</li>
              <li>Venustiano Carranza</li>
            </ul>
            <span className="coverage-badge">Entrega 1-2 dias</span>
          </div>
          <div className="coverage-card">
            <h3>📍 Neza y EdoMex</h3>
            <ul className="coverage-list">
              <li><strong>Nezahualcoyotl</strong> (Entrega Gratis)</li>
              <li>Ecatepec, Los Reyes</li>
              <li>Chimalhuacan, La Paz</li>
              <li>Texcoco, Chalco, Ixtapaluca</li>
            </ul>
            <span className="coverage-badge">Entrega 1-2 dias</span>
          </div>
          <div className="coverage-card">
            <h3>📦 Envio Nacional $140</h3>
            <ul className="coverage-list">
              <li><strong>Tarifa Plana a Todo Mexico</strong></li>
              <li>Michoacan, Guerrero, Oaxaca</li>
              <li>Chiapas, Chihuahua</li>
              <li>FedEx / Estafeta con rastreo</li>
            </ul>
            <span className="coverage-badge">Envio 2-5 dias</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="testimonios">
        <div className="section-header">
          <span className="eyebrow">Opiniones reales</span>
          <h2>Lo que dicen nuestros clientes</h2>
          <p className="lead">Resultados reales de compradores en CDMX, Iztapalapa y Nezahualcoyotl.</p>
        </div>
        <div className="testimonial-grid">
          {[
            { stars: "★★★★★", text: "Excelente servicio en Iztapalapa. Mi barba crecio increiblemente con el Kirkland que compre aqui. 100% recomendado.", name: "Carlos M.", city: "Iztapalapa, CDMX", initials: "CM" },
            { stars: "★★★★★", text: "La entrega en Nezahualcoyotl fue super rapida. El producto es original y ya veo resultados. Muy profesionales.", name: "Javier R.", city: "Nezahualcoyotl, EdoMex", initials: "JR" },
            { stars: "★★★★★", text: "Compre para mi esposo y los resultados han sido excelentes. La atencion por WhatsApp es muy buena y rapida.", name: "Maria L.", city: "Xochimilco, CDMX", initials: "ML" },
          ].map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">{t.stars}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="avatar">{t.initials}</div>
                <div><strong>{t.name}</strong><span>{t.city}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="section" id="blog">
        <div className="section-header left">
          <span className="eyebrow">Blog de Kirkland</span>
          <h2>Guias y Articulos sobre Minoxidil</h2>
          <p className="lead">Informacion util para comprar y usar minoxidil con confianza. Basado en experiencia real.</p>
        </div>
        <div className="blog-layout">
          <div className="blog-list">
            {publishedPosts.map((post, index) => (
              <button
                className={`blog-list-item ${activePost === index ? "active" : ""}`}
                key={post.title}
                onClick={() => setActivePost(index)}
              >
                <span className="blog-list-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="blog-list-title">{post.title}</span>
                <span className="blog-list-excerpt">{post.excerpt.substring(0, 80)}...</span>
              </button>
            ))}
          </div>
          <div className="blog-reader">
            <span className="eyebrow">{publishedPosts[activePost]?.category ?? "Articulo"}</span>
            <h3>{publishedPosts[activePost]?.title ?? ""}</h3>
            <p>{publishedPosts[activePost]?.excerpt ?? ""}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              {publishedPosts[activePost]?.body.substring(0, 250) ?? ""}...
            </p>
            <a className="btn btn-whatsapp" href={publishedPosts[activePost] ? postPath(publishedPosts[activePost]) : "#"}>Leer articulo completo</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="preguntas">
        <div className="section-header">
          <span className="eyebrow">Preguntas Frecuentes</span>
          <h2>Respuestas rapidas y sin rodeos</h2>
        </div>
        <div className="faq-grid">
          {SITE.faq.map(([q, a]) => (
            <div className="faq-item" key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUCURSALES */}
      <section className="section" id="sucursal">
        <div className="section-header">
          <span className="eyebrow">Compra Kirkland 100% Autentico y Seguro</span>
          <h2>Puntos de Recoleccion Fisica y Contra Entrega</h2>
          <p className="lead">No arriesgues tu dinero. Recoge en sucursal o recibe en mano. Revisas el producto sellado, lote y caducidad antes de pagar.</p>
        </div>
        <div className="location-grid">
          <div className="location-card featured">
            <span className="location-badge">🔥 Zona Oriente - Entregas Gratis</span>
            <h3>Entregas Personales Chalco, La Paz, Ixtapaluca, Neza e Iztapalapa</h3>
            <p className="location-desc">
              Si vives en el Estado de Mexico Oriente, te entregamos hoy mismo en mano y sin costo: Chalco, Los Reyes La Paz, Ixtapaluca, Ciudad Neza e Iztapalapa.
            </p>
            <p className="location-detail">
              Puntos de encuentro: Plaza Sendero Chalco, Metro La Paz, Plaza Sendero Ixtapaluca, Metro Nezahualcoyotl, Metro Guelatao.
            </p>
            <div className="location-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15065.733560641209!2d-98.92429402517173!3d19.262523281878345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1e672728f11b%3A0x6a090b8fca2066c0!2sPlaza%20Sendero%20Ixtapaluca!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx" allowFullScreen loading="lazy" title="Zona Oriente" />
            </div>
            <a className="location-cta" href="https://wa.me/525569380408?text=Hola,%20vivo%20en%20la%20zona%20Oriente%20y%20quiero%20agendar%20una%20entrega%20personal.">
              Agendar Entrega en Oriente
            </a>
          </div>
          <div className="location-card">
            <span className="location-badge">Sucursal CDMX</span>
            <h3>Plaza Guelatao (Iztapalapa)</h3>
            <p className="location-desc">
              Ven directamente a nuestro local dentro de Plaza Guelatao. Inspecciona tu Minoxidil Kirkland y paga de forma segura.
            </p>
            <p className="location-detail">
              Calz. Ignacio Zaragoza 406, Local 76, Pasillo 5, Iztapalapa, 09100 CDMX.
            </p>
            <div className="location-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.0822180862024!2d-99.02517622387796!3d19.397023881874288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e2334005b757%3A0xb3cf516ea278f244!2sPlaza%20Guelatao!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx" allowFullScreen loading="lazy" title="Plaza Guelatao" />
            </div>
            <a className="location-cta" href="https://wa.me/525569380408?text=Hola,%20me%20interesa%20agendar%20recoleccion%20en%20Plaza%20Guelatao.">
              Agendar en Plaza Guelatao
            </a>
          </div>
          <div className="location-card">
            <span className="location-badge">Oficinas Neza</span>
            <h3>Oficinas en Nezahualcoyotl</h3>
            <p className="location-desc">
              Punto de distribucion oficial para recolecciones y entregas rapidas de Kirkland en la zona de Neza.
            </p>
            <p className="location-detail">
              Oriente 10 #224, Colonia Reforma, 57840 Ciudad Nezahualcoyotl, Estado de Mexico.
            </p>
            <div className="location-map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.120015949581!2d-99.01426462387802!3d19.395350381875416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1e25d2b70f0ab%3A0xc3b84ca3b006a8f1!2sOte.%2010%20224%2C%20Reforma%2C%2057840%20Ciudad%20Nezahualcoyotl%2C%20Mex.!5e0!3m2!1ses-419!2smx!4v1716300000000!5m2!1ses-419!2smx" allowFullScreen loading="lazy" title="Oficinas Neza" />
            </div>
            <a className="location-cta" href="https://wa.me/525569380408?text=Hola,%20me%20interesa%20agendar%20en%20las%20oficinas%20de%20Neza.">
              Agendar en Neza
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contacto">
        <div className="contact-grid">
          <div>
            <span className="eyebrow">Contacto Kirkland Mexico</span>
            <h2>Estamos para servirte</h2>
            <p className="lead">Contactanos por WhatsApp, email o visitanos en nuestra sucursal de Iztapalapa.</p>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <span className="label">WhatsApp</span>
                <span className="value">55-6938-0408</span>
              </div>
              <div className="contact-info-item">
                <span className="label">Email</span>
                <span className="value">ventaminoxidilmexico@gmail.com</span>
              </div>
              <div className="contact-info-item">
                <span className="label">Horario</span>
                <span className="value">Mar-Dom, 12PM - 5PM</span>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Envianos un Mensaje</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 20 }}>Tienes alguna pregunta? Nos encantaria ayudarte.</p>
            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required value={formData.nombre} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electronico</label>
                  <input type="email" id="email" name="email" placeholder="tu@email.com" required value={formData.email} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <select id="asunto" name="asunto" required value={formData.asunto} onChange={handleInputChange}>
                  <option value="">Selecciona un tema</option>
                  <option value="Consulta sobre Barba">Consulta sobre crecimiento de barba</option>
                  <option value="Consulta sobre Cabello">Consulta sobre crecimiento de cabello</option>
                  <option value="Duda sobre Envio">Duda sobre envio</option>
                  <option value="Duda sobre Originalidad">Duda sobre originalidad y lotes</option>
                  <option value="Otro Asunto">Otro asunto</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows={4} placeholder="Escribe tu mensaje aqui..." required value={formData.mensaje} onChange={handleInputChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={formStatus === "sending"}>
                {formStatus === "idle" && "Enviar Mensaje"}
                {formStatus === "sending" && "Enviando..."}
                {formStatus === "success" && "Mensaje Enviado con Exito!"}
              </button>
              {formStatus === "success" && (
                <div className="form-success">
                  Gracias por escribirnos, {formData.nombre}! Te responderemos a {formData.email} o WhatsApp lo antes posible.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWA />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="#inicio">
          <span className="brand-k">K</span>
          <span className="brand-text">{SITE.brand}<span>{SITE.location}</span></span>
        </a>
        <nav className="header-nav">
          <a href="#autenticidad">Autenticidad</a>
          <a href="#productos">Catalogo</a>
          <a href="#sucursal">Sucursales</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#blog">Blog</a>
          <a href="#preguntas">FAQ</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="btn btn-whatsapp btn-sm" href={WHATSAPP}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
          WhatsApp
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>{SITE.brand}</strong>
          <p>Distribucion especializada de Kirkland Minoxidil 5% original en Mexico. Informacion transparente para tu cuidado personal.</p>
        </div>
        <div className="footer-links">
          <a href="#autenticidad">Autenticidad</a>
          <a href="#productos">Catalogo</a>
          <a href="#sucursal">Sucursales</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#blog">Blog</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>
      <div className="footer-bottom">
        {SITE.brand} &copy; {new Date().getFullYear()} — Todos los derechos reservados. Minoxidil Kirkland original. Envios a toda la Republica Mexicana.
      </div>
    </footer>
  );
}

function FloatingWA() {
  return (
    <a className="float-wa" href={WHATSAPP} aria-label="WhatsApp" title="Escribenos por WhatsApp">
      <span className="float-wa-pulse" />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
      </svg>
    </a>
  );
}

export default App;
