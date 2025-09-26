export type Anime = {
  id: number;
  title: string;
  image: string;
  episodes: number;
  synopsis: string;
  avaliacao: number; // nota
  episodioAtual: number;
  episodiosPatrocinados: number;
  genero: string[];
  classificacao: string; // classificação indicativa
  estudio: string;
};

export type AnimeCollections = {
  patrocinados: Anime[];
  sugestoes: Anime[];
  finalizados: Anime[];
};

export const animeData: AnimeCollections = {
  patrocinados: [
    {
      id: 1,
      title: "One Piece",
      image: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
      episodes: 1144,
      synopsis:
        "Acompanha Monkey D. Luffy, um jovem que sonha em se tornar o Rei dos Piratas e encontrar o lendário tesouro One Piece, deixado pelo antigo Rei dos Piratas, Gold Roger.",
      avaliacao: 9.9,
      episodioAtual: 1144,
      episodiosPatrocinados: 1144,
      genero: ["Aventura", "Fantasia", "Ação"],
      classificacao: "12",
      estudio: "Toei Animation",
    },
    {
      id: 2,
      title: "Attack on Titan",
      image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      episodes: 94,
      synopsis:
        "Em um mundo murado, a humanidade luta pela sobrevivência contra Titãs, desvendando segredos sombrios sobre sua própria existência.",
      avaliacao: 4.8,
      episodioAtual: 88,
      episodiosPatrocinados: 15,
      genero: ["Ação", "Suspense", "Drama"],
      classificacao: "16",
      estudio: "Wit Studio / MAPPA",
    },
  ],
  sugestoes: [
    {
      id: 101,
      title: "Frieren",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjVjZGU5ZTctYjA0Mi00ZjY2LTg5YjktYzE4YjJmY2Q0NTMwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
      episodes: 28,
      synopsis:
        "Após a derrota do Rei Demônio, a maga elfa Frieren reflete sobre o tempo e o significado das relações efêmeras com humanos.",
      avaliacao: 5.0,
      episodioAtual: 28,
      episodiosPatrocinados: 4,
      genero: ["Fantasia", "Aventura", "Slice of Life"],
      classificacao: "12",
      estudio: "Madhouse",
    },
    {
      id: 102,
      title: "Solo Leveling",
      image:
        "https://m.media-amazon.com/images/M/MV5BYjI5ZTEwYjktM2ZjNC00Y2Y0LWFlZDgtOGFmNDU3YjM1OTQyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
      episodes: 12,
      synopsis:
        "Em um mundo de portais, Sung Jinwoo ganha habilidades extraordinárias e inicia sua ascensão ao topo.",
      avaliacao: 4.7,
      episodioAtual: 12,
      episodiosPatrocinados: 3,
      genero: ["Ação", "Fantasia", "Sobrenatural"],
      classificacao: "14",
      estudio: "A-1 Pictures",
    },
    {
      id: 103,
      title: "Mushoku Tensei",
      image:
        "https://m.media-amazon.com/images/M/MV5BMGRkOGQ4OGItMjAzYi00ZDEyLTgyYmEtYmJjMjA0MTZlOGI5XkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg",
      episodes: 48,
      synopsis:
        "Um recluso reencarna como Rudeus Greyrat em um mundo de fantasia e decide viver ao máximo como um mago poderoso.",
      avaliacao: 4.6,
      episodioAtual: 30,
      episodiosPatrocinados: 7,
      genero: ["Fantasia", "Aventura", "Drama"],
      classificacao: "16",
      estudio: "Studio Bind",
    },
  ],
  finalizados: [
    {
      id: 201,
      title: "Jujutsu Kaisen",
      image:
        "https://cdn.myanimelist.net/images/anime/1607/136734.jpg",
      episodes: 47,
      synopsis:
        "Yuji Itadori envolve-se com uma sociedade de Feiticeiros para eliminar maldições e torna-se hospedeiro de Sukuna.",
      avaliacao: 6.7,
      episodioAtual: 47,
      episodiosPatrocinados: 47,
      genero: ["Ação", "Sobrenatural", "Shounen"],
      classificacao: "16",
      estudio: "MAPPA",
    },
  ],
};
