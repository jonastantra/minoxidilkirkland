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
  "dir": "G:\\Clonar Sitio Web Minoxidil\\1.Otros Sitios Web\\minoxidilkirkland\\minoxidilkirkland",
  "brand": "Kirkland Minoxidil Mexico",
  "shortBrand": "Kirkland Mexico",
  "domain": "https://minoxidilkirklandmexico.net/",
  "title": "Kirkland Minoxidil Mexico | Producto original para barba y cabello",
  "description": "Minoxidil Kirkland 5% en Mexico. Paquetes liquido y espuma, guia para revisar producto, compra por WhatsApp.",
  "theme": "kirkland",
  "accent": "#c62828",
  "heroImage": "1-mes-minoxidil-kirkland-low-1.jpg",
  "location": "Kirkland 5% para Mexico",
  "promise": "Sitio enfocado en Kirkland: presentaciones, diferencias, paquetes y compra responsable.",
  "h1": "Minoxidil Kirkland 5% sin imagenes raras ni promesas infladas",
  "subtitle": "Aqui el foco es el producto: liquido, espuma, paquetes por meses y detalles para comprar con mas criterio.",
  "primaryCta": "Pedir Kirkland",
  "secondaryCta": "Comparar paquetes",
  "sections": [
    [
      "Kirkland 5%",
      "Presentaciones conocidas, fotos claras y explicacion simple de cada paquete."
    ],
    [
      "Originalidad",
      "Te decimos que revisar: caja, botella, lote, empaque y coherencia del vendedor."
    ],
    [
      "Sin humo",
      "El producto ayuda segun cada caso. La constancia y las expectativas reales importan mucho."
    ]
  ],
  "products": [
    {
      "name": "1 Mes Minoxidil Kirkland Liquido 5%",
      "price": "$250",
      "image": "1-mes-minoxidil-kirkland-low-1.jpg",
      "tag": "Inicio",
      "copy": "Una botella para empezar sin comprar de mas. Ideal si quieres probar constancia, sensacion en piel y rutina."
    },
    {
      "name": "2 Meses Tratamiento Kirkland 5%",
      "price": "$450",
      "image": "2-meses.jpg",
      "tag": "Pareja",
      "copy": "Dos botellas para no cortar el ritmo justo cuando apenas estas agarrando disciplina con la aplicacion."
    },
    {
      "name": "3 Meses Minoxidil Kirkland Liquido 5%",
      "price": "$600",
      "image": "3-meses-1.jpg",
      "tag": "Recomendado",
      "copy": "El paquete mas equilibrado para llevar calendario, fotos y seguimiento sin estar comprando cada mes."
    },
    {
      "name": "6 Meses Minoxidil Kirkland 5%",
      "price": "$1,100",
      "image": "6-meses.jpg",
      "tag": "Ahorro",
      "copy": "Para quien ya sabe que va en serio. Menos vueltas, mejor precio por botella y rutina completa."
    },
    {
      "name": "12 Meses Minoxidil Kirkland",
      "price": "$2,000",
      "image": "12-meses.jpg",
      "tag": "Completo",
      "copy": "Tratamiento largo para barba o cabello cuando quieres resolver el abasto del ano de una vez."
    },
    {
      "name": "6 Meses Minoxidil Espuma Kirkland",
      "price": "$1,850",
      "image": "6-meses-espuma.jpg",
      "tag": "Espuma",
      "copy": "Textura mas practica para quien prefiere secado rapido y una aplicacion menos liquida."
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
      "excerpt": "El liquido es el clasico porque rinde bien y suele tener mejor precio. Conviene a quien no se complica con aplicacion y puede dejar secar.",
      "body": "El liquido es el clasico porque rinde bien y suele tener mejor precio. Conviene a quien no se complica con aplicacion y puede dejar secar. Si odias sensacion liquida, tal vez la espuma te acomode mejor."
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
    },
    {
      "title": "Barba con Kirkland: expectativas aterrizadas",
      "excerpt": "En barba hay zonas que responden rapido y otras que tardan. Mejillas, bigote y conectores no siempre avanzan igual.",
      "body": "En barba hay zonas que responden rapido y otras que tardan. Mejillas, bigote y conectores no siempre avanzan igual. Si llevas dos semanas y ya quieres dictamen final, te estas adelantando demasiado."
    },
    {
      "title": "Cabello con Kirkland: no mezcles todo al mismo tiempo",
      "excerpt": "Cuando empiezas con cuero cabelludo, evita meter shampoos, aceites, suplementos y cambios diarios al mismo tiempo. Si algo irrita, no sabras que fue.",
      "body": "Cuando empiezas con cuero cabelludo, evita meter shampoos, aceites, suplementos y cambios diarios al mismo tiempo. Si algo irrita, no sabras que fue. Ve simple, observa y ajusta con calma."
    },
    {
      "title": "Como guardar botellas de Kirkland",
      "excerpt": "Lugar fresco, seco y fuera de sol directo. Parece detalle menor, pero si compras paquete grande no quieres tenerlo rodando en la mochila o junto a calor.",
      "body": "Lugar fresco, seco y fuera de sol directo. Parece detalle menor, pero si compras paquete grande no quieres tenerlo rodando en la mochila o junto a calor. Orden tambien es parte del tratamiento."
    },
    {
      "title": "Diferencias entre caja de 6 meses y botellas sueltas",
      "excerpt": "La caja ayuda a mantener presentacion y control. Botellas sueltas pueden estar bien si el vendedor es claro, pero revisa que todo coincida.",
      "body": "La caja ayuda a mantener presentacion y control. Botellas sueltas pueden estar bien si el vendedor es claro, pero revisa que todo coincida. Si compras varias, pide que te expliquen exactamente que recibes."
    },
    {
      "title": "Kirkland para bigote: paciencia con esa zona",
      "excerpt": "El bigote puede desesperar porque se nota mucho cuando esta disparejo. Aplica con cuidado, no satures labios y toma fotos.",
      "body": "El bigote puede desesperar porque se nota mucho cuando esta disparejo. Aplica con cuidado, no satures labios y toma fotos. No confundas ardor o resequedad con progreso: la piel tambien cuenta."
    },
    {
      "title": "Producto barato vs producto confiable",
      "excerpt": "No todo lo barato es malo, pero lo demasiado barato debe hacerte revisar. En Kirkland hay mucha demanda y eso abre puerta a copias.",
      "body": "No todo lo barato es malo, pero lo demasiado barato debe hacerte revisar. En Kirkland hay mucha demanda y eso abre puerta a copias. Compra donde te contesten, te muestren y no te presionen."
    },
    {
      "title": "Senales de que debes pausar y revisar",
      "excerpt": "Irritacion fuerte, descamacion intensa o molestia fuera de lo normal. No fuerces por orgullo.",
      "body": "Irritacion fuerte, descamacion intensa o molestia fuera de lo normal. No fuerces por orgullo. Baja la velocidad, revisa cantidad y consulta si hace falta. Ningun tratamiento vale descuidar la piel."
    },
    {
      "title": "Kirkland y dermaroller: no lo hagas a lo loco",
      "excerpt": "Dermaroller no es juguete. Requiere limpieza, medida correcta y descanso.",
      "body": "Dermaroller no es juguete. Requiere limpieza, medida correcta y descanso. Si apenas empiezas con minoxidil, primero domina aplicacion. Meter todo junto suele traer irritacion y cero claridad."
    },
    {
      "title": "Como comprar Kirkland por WhatsApp",
      "excerpt": "Escribe paquete, presentacion y ciudad. Pregunta precio, disponibilidad y entrega.",
      "body": "Escribe paquete, presentacion y ciudad. Pregunta precio, disponibilidad y entrega. Una compra seria no necesita presionarte. Si tienes dudas, mejor resolverlas antes de pagar que despues de recibir."
    },
    {
      "title": "La rutina simple que mas recomiendo",
      "excerpt": "Horario fijo, cantidad moderada, dejar secar y fotos mensuales. Nada espectacular.",
      "body": "Horario fijo, cantidad moderada, dejar secar y fotos mensuales. Nada espectacular. Pero muchas veces eso gana sobre rutinas enormes que duran cuatro dias. Kirkland no reemplaza disciplina; la necesita."
    }
  ],
  "faq": [
    [
      "¿Solo venden Kirkland?",
      "Este sitio esta enfocado en Kirkland 5%, liquido y espuma, aunque podemos orientar sobre complementos."
    ],
    [
      "¿Como reviso si es original?",
      "Pide fotos claras, revisa caja, botella, lote y coherencia de presentacion antes de comprar."
    ],
    [
      "¿Liquido o espuma?",
      "Liquido por precio y rendimiento; espuma por comodidad y secado. Depende de tu rutina."
    ]
  ]
} as SiteData;
const WHATSAPP = 'https://wa.me/525569380408?text=' + encodeURIComponent('Hola, quiero informacion de ' + SITE.brand);

function App() {
  const [activePost, setActivePost] = useState(0);
  const selected = SITE.posts[activePost];
  const productGroups = useMemo(() => SITE.products.slice(0, 6), []);

  return (
    <main className={`site theme-${SITE.theme}`}>
      <Header />
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">{SITE.location}</p>
          <h1>{SITE.h1}</h1>
          <p className="lead">{SITE.subtitle}</p>
          <div className="hero-actions">
            <a className="button primary" href={WHATSAPP}>{SITE.primaryCta}</a>
            <a className="button secondary" href="#productos">{SITE.secondaryCta}</a>
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

      <section className="proof-strip" aria-label="Ventajas">
        {SITE.sections.map(([title, copy]) => (
          <article key={title}>
            <span />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="products" id="productos">
        <div className="section-heading">
          <p className="eyebrow">Productos</p>
          <h2>Paquetes que se entienden en diez segundos</h2>
          <p>No meti descripciones eternas: precio, meses, foto real y para que tipo de compra sirve.</p>
        </div>
        <div className="product-grid">
          {SITE.products.map((product) => (
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

      <section className="editorial" id="guia">
        <div>
          <p className="eyebrow">Guia rapida</p>
          <h2>Compra como alguien que ya sabe que revisar</h2>
        </div>
        <div className="guide-grid">
          {productGroups.map((product, index) => (
            <article key={product.name}>
              <small>0{index + 1}</small>
              <h3>{product.tag}</h3>
              <p>{product.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="blog" id="blog">
        <div className="section-heading align-left">
          <p className="eyebrow">Blog</p>
          <h2>15 entradas propias para posicionar sin sonar a texto automatico</h2>
          <p>Cada sitio habla desde una intencion distinta: local, nacional o Kirkland. La idea es que no sean copias peleando por la misma frase.</p>
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
            <p className="eyebrow">Entrada seleccionada</p>
            <h3>{selected.title}</h3>
            <p>{selected.body}</p>
            <a className="button primary" href={WHATSAPP}>Preguntar por este tema</a>
          </article>
        </div>
      </section>

      <section className="faq" id="preguntas">
        <div className="section-heading">
          <p className="eyebrow">Preguntas</p>
          <h2>Lo que conviene aclarar antes de pagar</h2>
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

      <section className="contact" id="contacto">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2>Escribenos y armamos tu pedido</h2>
          <p>Telefono y WhatsApp: 55-6938-0408. Manda ciudad, paquete deseado y si lo quieres para barba o cabello.</p>
        </div>
        <a className="button primary" href={WHATSAPP}>Abrir WhatsApp</a>
      </section>

      <Footer />
      <a className="float-wa" href={WHATSAPP}>WhatsApp</a>
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label={SITE.brand}>
        <span>{SITE.shortBrand.charAt(0)}</span>
        <strong>{SITE.brand}</strong>
      </a>
      <nav>
        <a href="#productos">Productos</a>
        <a href="#guia">Guia</a>
        <a href="#blog">Blog</a>
        <a href="#preguntas">Preguntas</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <a className="mini-wa" href={WHATSAPP}>WhatsApp</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{SITE.brand}</strong>
        <p>{SITE.description}</p>
      </div>
      <div>
        <a href="#productos">Productos</a>
        <a href="#blog">Blog</a>
        <a href="#contacto">Contacto</a>
      </div>
    </footer>
  );
}

export default App;
