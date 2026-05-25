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

  const activeBlogPost = useMemo(() => {
    if (!hash.startsWith("#blog/")) return null;
    const slug = hash.replace("#blog/", "");
    return SITE.posts.find((p) => slugify(p.title) === slug) ?? null;
  }, [hash]);

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
            {SITE.posts.map((post, index) => (
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
            <span className="eyebrow">{selectedPost.category ?? "Articulo"}</span>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.excerpt}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              {selectedPost.body.substring(0, 250)}...
            </p>
            <a className="btn btn-whatsapp" href={postPath(selectedPost)}>Leer articulo completo</a>
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
