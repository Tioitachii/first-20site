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
      image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
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
      title: "Neon Genesis Evangelion",
      image: "https://cdn.myanimelist.net/images/anime/1314/108941.jpg",
      episodes: 26,
      synopsis:
        "Adolescentes pilotam bio-robôs gigantes para enfrentar anjos misteriosos enquanto lidam com traumas psicológicos e segredos do projeto NERV.",
      avaliacao: 4.9,
      episodioAtual: 26,
      episodiosPatrocinados: 5,
      genero: ["Psicológico", "Mecha", "Drama"],
      classificacao: "16",
      estudio: "Gainax / Tatsunoko Production",
    },
    {
      id: 103,
      title: "Fullmetal Alchemist: Brotherhood",
      image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
      episodes: 64,
      synopsis:
        "Os irmãos Elric viajam em busca da Pedra Filosofal para restaurar seus corpos após uma transmutação proibida, enfrentando conspirações militares e homúnculos.",
      avaliacao: 5.0,
      episodioAtual: 64,
      episodiosPatrocinados: 10,
      genero: ["Ação", "Aventura", "Fantasia"],
      classificacao: "14",
      estudio: "Bones",
    },
  ],
  finalizados: [
    {
      id: 201,
      title: "Jujutsu Kaisen",
      image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
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
