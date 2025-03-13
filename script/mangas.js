const mangaGrid = document.getElementById("manga-grid");
const searchBar = document.getElementById("search-bar");
const filterSelect = document.getElementById("filter-select");
const loadMoreBtn = document.getElementById("load-more");

let offset = 0;
const limit = 8; // Nombre de mangas chargés par page
let orderBy = "popularity";
let isLoading = false;

// Liste des genres interdits
const bannedGenres = ["Ero", "Hentai", "Yaoi", "Yuri", "Ecchi", "Adult", "Smut", "Romance", "Boys Love", "Erotica"];

// 🔹 Fonction pour récupérer les mangas avec correction des filtres
async function fetchMangas(query = "", sortOrder = orderBy, reset = false) {
    if (isLoading) return;
    isLoading = true;

    if (reset) {
        mangaGrid.innerHTML = "";
        offset = 0; // 📌 Réinitialisation de l’offset
    }

    let sortType = sortOrder === "score" ? "desc" : "asc"; // 📌 Le tri par score doit être en DESC

    let url = `https://api.jikan.moe/v4/manga?order_by=${sortOrder}&sort=${sortType}&limit=${limit}&offset=${offset}`;
    
    if (query) {
        url = `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&order_by=${sortOrder}&sort=${sortType}&limit=${limit}&offset=${offset}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();

        const filteredMangas = filterMangas(data.data);

        if (filteredMangas.length === 0 && offset === 0) {
            mangaGrid.innerHTML = `<p class="no-results">❌ Aucun manga trouvé pour "${query}".</p>`;
        } else {
            displayMangas(filteredMangas);
            offset += limit; // 📌 Mise à jour correcte de l'offset
        }
    } catch (error) {
        console.error("Erreur lors du chargement des mangas :", error);
    } finally {
        isLoading = false;
    }
}

// 🔹 Filtrer les mangas pour exclure ceux avec des genres interdits
function filterMangas(mangas) {
    return mangas.filter(manga => {
        if (!manga.genres) return true;
        return !manga.genres.some(genre => bannedGenres.includes(genre.name));
    });
}

// 🔹 Affichage des mangas
function displayMangas(mangas) {
    mangas.forEach(manga => {
        const mangaCard = document.createElement("div");
        mangaCard.classList.add("manga-card");

        mangaCard.innerHTML = `
            <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
            <h3>${manga.title}</h3>
            <div class="manga-info">
                <span class="manga-score">⭐ ${manga.score ? manga.score : "N/A"}</span>
                <button class="view-more-btn" onclick="showDetails('${manga.mal_id}')">Voir</button>
            </div>
        `;
        mangaGrid.appendChild(mangaCard);
    });
}

// 🔹 Fonction pour voir plus de détails
function showDetails(malId) {
    window.open(`https://myanimelist.net/manga/${malId}`, "_blank");
}

// 🔹 Correction du bouton "Voir plus"
loadMoreBtn.addEventListener("click", () => {
    fetchMangas(searchBar.value, orderBy, false);
});

// 🔹 Correction des filtres (tri correctement appliqué et offset remis à zéro)
filterSelect.addEventListener("change", () => {
    orderBy = filterSelect.value;
    offset = 0;
    fetchMangas(searchBar.value, orderBy, true);
});

// 🔹 Correction de la recherche
searchBar.addEventListener("input", () => {
    offset = 0;
    fetchMangas(searchBar.value, orderBy, true);
});

// 📌 🔥 Charger immédiatement les mangas populaires au démarrage
window.addEventListener("DOMContentLoaded", () => {
    filterSelect.value = "popularity";
    fetchMangas("", "popularity");
});
