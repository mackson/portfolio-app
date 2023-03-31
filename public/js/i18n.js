// i18n translations
let lang = 'ptbr';

let texts = {
  ptbr : {
    btnLanguage: 'pt-br',
    title: 'João Dom | Desenvolvedor Full Stack',
    about: 'Quem Sou',
    works: 'Trabalhos',
    contact: 'Contato',
    heroHello: 'Olá, eu sou',
    heroTitle: "E trabalho como <span class='hero-jobs'>Dev Front-End.</span>",
    heroDescription: 'Sou apaixonado em criar interfaces e experiências digitais.',
  },
  
  en: {
    btnLanguage: 'en',
    title: 'João Dom | Full Stack Developer',
    about: 'About',
    works: 'Works',
    contact: 'Contact',
    heroHello: "Hello, It's Me",
    heroTitle: "And I'm a <span class='hero-jobs'>Front-End Engineer.</span>",
    heroDescription: 'I enjoy creating delightful, human-centered digital experiences.',
  }
}

function setLanguage(language) {
  lang = language;
  updateContent();
}

function updateContent() {
  const elements = document.querySelectorAll('[i18n]');
  elements.forEach((element) => {
    const value = element.getAttribute('i18n');
    element.innerHTML = texts[lang][value];
  });
}

let langBtn = document.querySelector(".lang-button");

langBtn.onclick = () => {
  setLanguage(lang === 'en' ? 'ptbr' : 'en');
};

updateContent();

