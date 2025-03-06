// Définition des différentes données des mangas à afficher
const mangas = [
  {
    title: "Demon Slayer",
    genre: "Aventure / Dark Fantasy / Arts Martiaux",
    synopsis:
      "Un jeune vendeur de charbon nommé Tanjiro mène une vie sans histoire dans les montagnes, jusqu'au jour tragique où il découvre son village et sa famille massacrés par un démon...",
    image: "img/zenitsu-demon-slayer.png",
    chapter: "Ch. 206",
  },
  {
    title: "One Piece",
    genre: "Aventure / Action / Fantasy",
    synopsis:
      "Monkey D. Luffy rêve de devenir le Roi des Pirates. Avec son équipage, il parcourt les océans à la recherche du légendaire trésor : le One Piece...",
    image: "img/jilmbei.png",
    chapter: "Ch. 1104",
  },
  {
    title: "Jujutsu Kaisen",
    genre: "Action / Surnaturel / Combat",
    synopsis:
      "Yuji Itadori est un lycéen ordinaire jusqu'à ce qu'il avale un doigt maudit et devienne l'hôte de Sukuna, le plus puissant des fléaux...",
    image: "img/sukuna.png",
    chapter: "Ch. 250",
  },
];

let currentIndex = 0;

function changeManga() {
  const titleElement = document.querySelector("#first-page h2");
  const genreElement = document.querySelector("#first-page-manga-genre");
  const synopsisElement = document.querySelector("#first-page-manga-synopsis");
  const imageElement = document.querySelector("#first-page img");
  const chapterElement = document.querySelector("#manga-chapter");

  if (
    !titleElement ||
    !genreElement ||
    !synopsisElement ||
    !imageElement ||
    !chapterElement
  ) {
    console.error("Un des éléments de la page est introuvable !");
    return;
  }

  // Appliquer la transition en fondu
  titleElement.style.opacity = 0;
  genreElement.style.opacity = 0;
  synopsisElement.style.opacity = 0;
  imageElement.style.opacity = 0;
  chapterElement.style.opacity = 0;

  setTimeout(() => {
    // Changer le contenu APRÈS la disparition
    titleElement.innerHTML = mangas[currentIndex].title;
    genreElement.innerHTML = mangas[currentIndex].genre;
    synopsisElement.innerHTML = mangas[currentIndex].synopsis;
    imageElement.src = mangas[currentIndex].image;
    chapterElement.innerHTML = mangas[currentIndex].chapter;

    // Réappliquer l'opacité progressivement
    setTimeout(() => {
      titleElement.style.opacity = 1;
      genreElement.style.opacity = 1;
      synopsisElement.style.opacity = 1;
      imageElement.style.opacity = 1;
      chapterElement.style.opacity = 1;
    }, 200); // Délai pour réapparaître en douceur

    currentIndex = (currentIndex + 1) % mangas.length;
  }, 500); // Attend 500ms avant de changer le contenu
}

setInterval(changeManga, 3000);
