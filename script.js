// ----------------------
// Scroll Animation
// ----------------------
const sections = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => {
  observer.observe(section);
});

// ----------------------
// Parallax Hero
// ----------------------
const heroText = document.querySelector(".hero-text");
const heroLogo = document.querySelector(".hero-logo");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  // Move o texto um pouco para cima
  heroText.style.transform = `translateY(${scrollY * 0.2}px)`;
  // Move a logo um pouco para baixo
  heroLogo.style.transform = `translateY(${scrollY * -0.2}px)`;
});

// ----------------------
// Interactive Particles Background
// ----------------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const mouse = { x: null, y: null, radius: 150 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > height) this.speedY = -this.speedY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }

  draw() {
    ctx.fillStyle = "rgba(140,0,255,0.7)";
    ctx.shadowColor = "#8c00ff";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particlesArray = [];
const particleCount = 100;

function init() {
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.strokeStyle = "rgba(140,0,255,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// ----------------------
// Page Transition
// ----------------------
const transition = document.querySelector(".transicao");
const authContainer = document.getElementById("auth-container");

function setupLoginButton() {
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      transition.classList.add("ativa");
      document.body.classList.add("transicao-ativa");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    });
  }
}

function updateHeaderUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.name) {
    const profileHtml = `
      <div class="user-profile">
        <img src="https://i.pravatar.cc/150?u=${user.email}" alt="Foto de Perfil" />
        <span>Olá, ${user.name}</span>
      </div>
    `;
    authContainer.innerHTML = profileHtml;
  } else {
    authContainer.innerHTML = `<button class="login-btn">Login</button>`;
    setupLoginButton(); // Re-attach listener after recreating the button
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderUI();
  setupLoginButton();
});

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    transition.classList.remove("ativa");
    document.body.classList.remove("transicao-ativa");
  }
});

// ----------------------
// Artist Cards Modal
// ----------------------
const genreCards = document.querySelectorAll("#cards .card");
const modal = document.getElementById("artist-modal");
const modalTitle = document.getElementById("artist-genre-title");
const artistContainer = document.getElementById("artist-cards-container");
const closeBtn = document.querySelector(".close-btn");

const artistData = {
  forro: [
    {
      name: "Solange Almeida",
      location: "Fortaleza, CE",
      price: "R$ 5.500,00",
      rating: 5,
      genres: ["Forró Eletrônico", "Piseiro"],
      description:
        "Conhecida pela sua voz potente e marcante, Solange é uma das principais referências do forró brasileiro, com uma carreira sólida e hits que animam qualquer festa.",
      image:
        "https://i.uai.com.br/Jotu2z8LYA3KKVpUZj-b-ka7Goc=/1200x900/smart/imgsapp2.uai.com.br/app/noticia_133890394703/2025/06/16/363414/solange-almeida-revela-desejo-de-ser-mae-aos-50-_1_59046.jpg",
    },
    {
      name: "Wesley Safadão",
      location: "Fortaleza, CE",
      price: "R$ 8.000,00",
      rating: 5,
      genres: ["Forró", "Piseiro"],
      description:
        "Um dos nomes mais populares do forró nacional, Wesley Safadão é um fenômeno de público e crítica, com shows que arrastam multidões e canções que viram hits instantâneos.",
      image:
        "https://biografiaresumida.com.br/wp-content/uploads/2017/11/Wesley-Safadao-2.jpg",
    },
    {
      name: "Zé Vaqueiro",
      location: "Recife, PE",
      price: "R$ 6.200,00",
      rating: 4,
      genres: ["Piseiro", "Forró"],
      description:
        "Com um estilo que popularizou o 'piseiro', Zé Vaqueiro conquistou o Brasil com sua voz marcante e músicas dançantes, tornando-se uma das novas sensações do gênero.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQkBX-gowrAZLYe5EpzLF7bcq_cs19Ng5MSA&s",
    },
    {
      name: "João Gomes",
      location: "Petrolina, PE",
      price: "R$ 7.000,00",
      rating: 5,
      genres: ["Piseiro", "Forró de Vaquejada"],
      description:
        "O jovem cantor de piseiro que conquistou o país com o hit 'Eu Tenho a Senha', trazendo um estilo único e autêntico que resgata as raízes da vaquejada.",
      image:
        "https://caras.com.br/media/_versions/2024-janeiro/joao_gomes_widelg.jpg",
    },
  ],
  funk: [
    {
      name: "Anitta",
      location: "Rio de Janeiro, RJ",
      price: "R$ 500.000,00",
      rating: 5,
      genres: ["Pop", "Funk", "Reggaeton"],
      description:
        "Conhecida mundialmente, Anitta é um ícone do pop e do funk brasileiro, com uma carreira de sucesso e uma presença de palco inconfundível. Seus shows são verdadeiros espetáculos.",
      image:
        "https://caras.com.br/media/_versions/2025/06/anitta_0ah3r677_widelg.jpg",
    },
    {
      name: "Ludmilla",
      location: "Rio de Janeiro, RJ",
      price: "R$ 90.000,00",
      rating: 5,
      genres: ["Funk", "Pop", "Pagode"],
      description:
        "Voz forte e carisma, Ludmilla domina as paradas de sucesso com hits de funk, pop e até mesmo pagode, mostrando sua versatilidade e talento como cantora e compositora.",
      image:
        "https://stories.cnnbrasil.com.br/wp-content/uploads/sites/9/2024/07/01_12645a.webp",
    },
    {
      name: "Kevin o Chris",
      location: "Rio de Janeiro, RJ",
      price: "R$ 52.500,00",
      rating: 4,
      genres: ["Funk Carioca", "Trap Funk"],
      description:
        "Um dos principais nomes do funk 150 bpm, Kevin o Chris é um mestre em criar batidas viciantes e letras que viralizam, garantindo a animação em qualquer evento.",
      image:
        "https://assets.portalleodias.com/2024/04/noticia%25242y%252410%2524JurKS858CIu4iQ6M3gs35uuqFlC%252FN%252FjMt9e9tW8B1bw3Mjy3K.Ptu.jpg",
    },
    {
      name: "Mc Ryan SP",
      location: "São Paulo, SP",
      price: "R$ 190.000,00",
      rating: 4,
      genres: ["Funk Consciente", "Trap Funk"],
      description:
        "Conhecido pelo seu estilo único e letras que abordam a realidade das comunidades, Mc Ryan SP é uma das vozes mais autênticas do funk de São Paulo.",
      image:
        "https://dicionariompb.com.br/wp-content/uploads/2023/04/mc-ryan.webp",
    },
  ],
  jazz: [
    {
      name: "Tony Bennett",
      location: "Nova York, NY",
      price: "R$ 15.000,00",
      rating: 5,
      genres: ["Jazz Clássico", "Vocal"],
      description:
        "Uma lenda viva do jazz, Tony Bennett é conhecido por sua voz suave e interpretações emocionantes, que atravessaram décadas e continuam a encantar o público.",
      image:
        "https://variety.com/wp-content/uploads/2023/07/tony-bennett.jpg?w=1000&h=562&crop=1",
    },
    {
      name: "Norah Jones",
      location: "Nova York, NY",
      price: "R$ 10.000,00",
      rating: 5,
      genres: ["Jazz Fusion", "Pop"],
      description:
        "Norah Jones mistura o jazz com elementos de pop e folk, criando um som relaxante e cativante. Sua voz suave e suas composições complexas a tornaram um ícone da música contemporânea.",
      image:
        "https://blog.documentodoestudante.com.br/blog/wp-content/uploads/2024/10/Norah-Jones-vira-ao-Brasil-em-2025-diz-jornalista.jpeg",
    },
    {
      name: "Gregory Porter",
      location: "Califórnia, CA",
      price: "R$ 8.500,00",
      rating: 4,
      genres: ["Jazz Vocal", "Soul"],
      description:
        "Com uma voz barítono profunda e um estilo elegante, Gregory Porter é um dos nomes mais respeitados do jazz vocal moderno, trazendo uma nova vida ao gênero com suas composições originais.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdYljcdjgYs5ODG1U3yT_vOIK04mzA2jteyw&s",
    },
    {
      name: "Esperanza Spalding",
      location: "Nova York, NY",
      price: "R$ 9.000,00",
      rating: 5,
      genres: ["Jazz", "Fusion", "R&B"],
      description:
        "Baixista, vocalista e compositora, Esperanza Spalding é uma artista versátil e premiada, que explora os limites do jazz e da música fusion com sua técnica impecável e criatividade.",
      image:
        "https://media.npr.org/assets/img/2018/08/21/ttt-esperanza-spalding-edit_custom-065858ce3855759da050f466254926f2c4ee8bec.jpg",
    },
  ],
  musicaEletronica: [
    {
      name: "Vintage Culture",
      location: "Uberlândia, MG",
      price: "R$ 1.200,00",
      rating: 5,
      genres: ["Progressive", "Techno", "House"],
      description:
        "Vintage Culture é um dos maiores nomes da cena eletrônica mundial, principalmente no gênero House e Tech House. O som dele mistura vocais marcantes, batidas profundas e melodias emocionantes, criando músicas que funcionam tanto nas pistas de dança quanto em versões mais melódicas para ouvir em casa. Alguns de seus hits são “Deep Inside”, “Slow Down” e “It Is What It Is”.",
      image:
        "https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO1dfouA-default.jpg",
    },
    {
      name: "Alok",
      location: "Brasília, DF",
      price: "R$ 1.500,00",
      rating: 5,
      genres: ["Brazilian Bass", "Future House"],
      description:
        "Reconhecido internacionalmente, Alok é o principal nome da cena eletrônica brasileira. Seu estilo, o 'Brazilian Bass', é uma fusão de ritmos brasileiros com o house, resultando em um som único e popular.",
      image:
        "https://biografiaresumida.com.br/wp-content/uploads/2018/02/Alok.jpg",
    },
    {
      name: "Dubdogz",
      location: "Juiz de Fora, MG",
      price: "R$ 950,00",
      rating: 4,
      genres: ["House", "Future House"],
      description:
        "A dupla de irmãos gêmeos, Dubdogz, é conhecida por seus sets enérgicos e remixes criativos que misturam pop, hip hop e house music, animando festivais por todo o país.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2467JMjya-oI0VEP1MPTwcufEkSGGk3r6g&s",
    },
    {
      name: "Illusionize",
      location: "Uberlândia, MG",
      price: "R$ 1.100,00",
      rating: 4,
      genres: ["Tech House", "Low BPM"],
      description:
        "Criador do gênero 'Low BPM', Illusionize se destaca por suas batidas graves e hipnóticas que dominam as pistas, proporcionando uma experiência imersiva e intensa para o público.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr4930osUab7AMBU8aaHKdKtB30VLcQnpF1A&s",
    },
  ],
  pagode: [
    {
      name: "Thiaguinho",
      location: "São Paulo, SP",
      price: "R$ 7.500,00",
      rating: 5,
      genres: ["Pagode", "Samba"],
      description:
        "Ex-vocalista do Exaltasamba, Thiaguinho consolidou sua carreira solo como um dos maiores ícones do pagode romântico e moderno, com shows cheios de energia e sucessos que marcaram gerações.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMsvd2CWFsN9W2rNamhR5COszM7ozYEEuAkg&s",
    },
    {
      name: "Péricles",
      location: "São Paulo, SP",
      price: "R$ 6.000,00",
      rating: 5,
      genres: ["Pagode", "Samba"],
      description:
        "Uma das vozes mais poderosas e emotivas do pagode, Péricles, ex-integrante do Exaltasamba, é sinônimo de talento e tradição, com um repertório que vai do romântico ao mais animado.",
      image:
        "https://meridionalfm.com.br/pca/arquivos/13d0778ec_pericles100-13866666.jpg",
    },
    {
      name: "Dilsinho",
      location: "Rio de Janeiro, RJ",
      price: "R$ 4.800,00",
      rating: 4,
      genres: ["Pagode", "Samba Pop"],
      description:
        "Com um estilo que mistura pagode com pop e R&B, Dilsinho conquistou o público jovem com suas letras românticas e sua voz suave, tornando-se um dos principais nomes da nova geração.",
      image:
        "https://yt3.googleusercontent.com/YyRBhBmwcAUXWR6AM-XmSC1ppTSjOb4_6yjSDUjBdRRxdJK09grWbQlWJCgbLnfVEA7_iOg6=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      name: "Sorriso Maroto",
      location: "Rio de Janeiro, RJ",
      price: "R$ 8.000,00",
      rating: 5,
      genres: ["Pagode", "Romântico"],
      description:
        "Com mais de 25 anos de carreira, o Sorriso Maroto é um dos grupos mais aclamados do pagode, conhecido por seus hits românticos e shows que são verdadeiras celebrações de amor.",
      image:
        "https://dicasdacapital.com.br/wp-content/uploads/2024/11/3125188_52d7a0bbfa4eb76-scaled-1.jpg",
    },
  ],
  rock: [
    {
      name: "Pitty",
      location: "Salvador, BA",
      price: "R$ 6.500,00",
      rating: 5,
      genres: ["Rock Alternativo", "Hard Rock"],
      description:
        "Uma das maiores vozes do rock brasileiro, Pitty é sinônimo de atitude e letras poderosas. Seus shows são intensos e cheios de energia, provando sua força no cenário nacional.",
      image:
        "https://s2-g1.glbimg.com/kpAwl0vz5LoTZLRRI4frft8qC48=/0x0:1400x1000/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/2/v/CB8QAhRKSww7VL9Hu1jA/pitty-abre.jpg",
    },
    {
      name: "Capital Inicial",
      location: "Brasília, DF",
      price: "R$ 9.000,00",
      rating: 5,
      genres: ["Rock Nacional", "Pós-punk"],
      description:
        "Com uma carreira lendária e hinos que marcaram o rock nacional, o Capital Inicial continua a lotar shows por todo o país, mantendo sua relevância e energia de palco.",
      image:
        "https://rollingstone.com.br/wp-content/uploads/capital_inicial_credito_fernando_hiro_pequena.jpg",
    },
    {
      name: "Skank",
      location: "Belo Horizonte, MG",
      price: "R$ 10.000,00",
      rating: 5,
      genres: ["Rock", "Pop Rock", "Reggae"],
      description:
        "Uma das bandas mais influentes do rock brasileiro, o Skank é conhecido por sua mistura de rock, pop e reggae, com letras poéticas e melodias que se tornaram trilhas sonoras de uma geração.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Skank_Divulgacao.jpg/1200px-Skank_Divulgacao.jpg",
    },
    {
      name: "Legião Urbana",
      location: "Brasília, DF",
      price: "R$ 12.000,00",
      rating: 5,
      genres: ["Rock", "Rock Nacional"],
      description:
        "Liderada pelo saudoso Renato Russo, a Legião Urbana é uma das bandas mais emblemáticas da história do rock brasileiro, com letras profundas e atemporais que ressoam até hoje.",
      image:
        "https://akamai.sscdn.co/uploadfile/letras/fotos/e/8/2/c/e82cfe96f68522b73a5c525b7d5d495f.jpg",
    },
  ],
  samba: [
    {
      name: "Martinho da Vila",
      location: "Rio de Janeiro, RJ",
      price: "R$ 8.000,00",
      rating: 5,
      genres: ["Samba", "Samba de Raiz"],
      description:
        "Um dos maiores nomes da história do samba, Martinho da Vila é um poeta e compositor que traduz a alma do Brasil em suas canções, com um estilo único e inconfundível.",
      image: "https://i.scdn.co/image/ab6761610000e5eb8abfddc3911204be23a80de0",
    },
    {
      name: "Zeca Pagodinho",
      location: "Rio de Janeiro, RJ",
      price: "R$ 9.500,00",
      rating: 5,
      genres: ["Samba", "Pagode"],
      description:
        "Com seu estilo descontraído e carisma, Zeca Pagodinho é a personificação do samba de raiz, com um repertório cheio de clássicos que celebram a vida e a boemia.",
      image:
        "https://guiadacervejabr.com/wp-content/uploads/2020/05/zeca-e1588981494577.jpg",
    },
    {
      name: "Diogo Nogueira",
      location: "Rio de Janeiro, RJ",
      price: "R$ 6.800,00",
      rating: 4,
      genres: ["Samba", "Samba Rock"],
      description:
        "Filho do lendário João Nogueira, Diogo herdou o talento e a paixão pelo samba, tornando-se um dos principais nomes da nova geração, com um estilo que mistura tradição e modernidade.",
      image:
        "https://caras.com.br/media/_versions/legacy/2021/09/21/diogo-nogueira-993470_widelg.jpg",
    },
    {
      name: "Maria Rita",
      location: "São Paulo, SP",
      price: "R$ 7.200,00",
      rating: 5,
      genres: ["Samba", "MPB", "Jazz"],
      description:
        "Filha de Elis Regina, Maria Rita construiu sua própria história no samba e na MPB, com uma voz potente e uma presença de palco arrebatadora que a tornaram uma das maiores artistas do país.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJSzk0owGk8srj0BXCZRPKCm9nZaXudkJ7Q&s",
    },
  ],
  sertanejo: [
    {
      name: "Gusttavo Lima",
      location: "Goiânia, GO",
      price: "R$ 500.000,00",
      rating: 5,
      genres: ["Sertanejo", "Sertanejo Universitário"],
      description:
        "O 'Embaixador' do sertanejo, Gusttavo Lima é um fenômeno de público, com shows que batem recordes e hits que dominam as paradas de sucesso por meses. Seu carisma e voz potente são sua marca registrada.",
      image:
        "https://ofuxico.com.br/wp-content/uploads/2024/02/gusttavo-lima.jpg",
    },
    {
      name: "Henrique e Juliano",
      location: "Palmas, TO",
      price: "R$ 13.500,00",
      rating: 5,
      genres: ["Sertanejo", "Sertanejo Universitário"],
      description:
        "A dupla sertaneja mais aclamada do Brasil, Henrique e Juliano são conhecidos por suas letras românticas e shows que são uma verdadeira celebração de música e emoção. Um verdadeiro fenômeno.",
      image:
        "https://billboard-com-br.s3.amazonaws.com/wp-content/uploads/2025/04/30122432/Henrique-e-Juliano-entrevista-empresario-Grelo.jpg",
    },
    {
      name: "Jorge e Mateus",
      location: "Itumbiara, GO",
      price: "R$ 14.000,00",
      rating: 5,
      genres: ["Sertanejo", "Sertanejo Universitário"],
      description:
        "Pioneiros do sertanejo universitário, Jorge e Mateus são a dupla mais amada do Brasil, com uma trajetória de sucesso e uma infinidade de hits que se tornaram trilhas sonoras de momentos especiais.",
      image:
        "https://dicionariompb.com.br/wp-content/uploads/2021/04/Jorge-Mateus.jpg",
    },
    {
      name: "Maiara e Maraisa",
      location: "Goiânia, GO",
      price: "R$ 11.000,00",
      rating: 5,
      genres: ["Sertanejo", "Sertanejo Feminino"],
      description:
        "Dupla de sucesso no sertanejo, Maiara e Maraisa são conhecidas por sua energia no palco e por hinos que exaltam o poder feminino e a superação de desilusões amorosas.",
      image: "https://showsertanejo.com.br/wp-content/uploads/2022/08/5-2.jpg",
    },
  ],
};

function createStarRating(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += `<span class="star">★</span>`;
    } else {
      stars += `<span class="star">☆</span>`;
    }
  }
  return stars;
}

function generateArtistCards(genre) {
  artistContainer.innerHTML = "";
  if (artistData[genre]) {
    artistData[genre].forEach((artist) => {
      const cardHtml = `
        <div class="artist-card">
          <img src="${artist.image}" alt="${artist.name}">
          <div class="artist-info">
            <h3>${artist.name}</h3>
            <div class="artist-details">
              <span class="price">${artist.price}</span>
              <span class="location">${artist.location}</span>
              <span class="star-rating">${createStarRating(
                artist.rating
              )}</span>
            </div>
            <div class="artist-genres">
              ${artist.genres.map((g) => `<span>${g}</span>`).join("")}
            </div>
            <p class="artist-description">${artist.description}</p>
            <button class="reserve-btn">Fazer Reserva</button>
          </div>
        </div>
      `;
      artistContainer.innerHTML += cardHtml;
    });
  }
}

genreCards.forEach((card) => {
  card.addEventListener("click", () => {
    const titleImg = card.querySelector(".title");
    const genreId = titleImg.src
      .split("/")
      .pop()
      .split("tittle.png")[0]
      .toLowerCase();

    let genreName;
    switch (genreId) {
      case "forro":
        genreName = "forro";
        break;
      case "funk":
        genreName = "funk";
        break;
      case "jazz":
        genreName = "jazz";
        break;
      case "eletronicattile":
        genreName = "musicaEletronica";
        break;
      case "pagode":
        genreName = "pagode";
        break;
      case "rock":
        genreName = "rock";
        break;
      case "samba":
        genreName = "samba";
        break;
      case "sertanejo":
        genreName = "sertanejo";
        break;
    }

    if (genreName) {
      modalTitle.textContent = genreId
        .toUpperCase()
        .replace("ELETRONICATTILE", "MÚSICA ELETRÔNICA")
        .replace("FORRO", "FORRÓ");
      generateArtistCards(genreName);
      modal.classList.add("visible");
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("visible");
});
