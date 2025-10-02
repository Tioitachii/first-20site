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
      avaliacao: 9.6,
      episodioAtual: 88,
      episodiosPatrocinados: 15,
      genero: ["Ação", "Suspense", "Drama"],
      classificacao: "16",
      estudio: "Wit Studio / MAPPA",
    },
    {
      id: 3,
      title: "Demon Slayer",
      image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      episodes: 55,
      synopsis:
        "Tanjiro Kamado ingressa no Esquadrão de Caçadores de Demônios para curar sua irmã Nezuko e enfrentar demônios poderosos.",
      avaliacao: 9.4,
      episodioAtual: 55,
      episodiosPatrocinados: 40,
      genero: ["Ação", "Fantasia", "Sobrenatural"],
      classificacao: "14",
      estudio: "ufotable",
    },
    {
      id: 4,
      title: "Chainsaw Man",
      image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
      episodes: 12,
      synopsis:
        "Denji faz um pacto com Pochita e trabalha para a Segurança Pública enfrentando demônios com sua serra elétrica.",
      avaliacao: 9.2,
      episodioAtual: 12,
      episodiosPatrocinados: 12,
      genero: ["Ação", "Terror", "Seinen"],
      classificacao: "18",
      estudio: "MAPPA",
    },
    {
      id: 5,
      title: "Bleach: Thousand-Year Blood War",
      image: "https://cdn.myanimelist.net/images/anime/1732/122902.jpg",
      episodes: 26,
      synopsis:
        "Ichigo Kurosaki retorna para enfrentar a invasão Quincy e proteger a Soul Society do império de Yhwach.",
      avaliacao: 9.3,
      episodioAtual: 26,
      episodiosPatrocinados: 20,
      genero: ["Ação", "Sobrenatural", "Shounen"],
      classificacao: "14",
      estudio: "Pierrot",
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
    {
      id: 104,
      title: "Vinland Saga",
      image: "https://cdn.myanimelist.net/images/anime/1613/102576.jpg",
      episodes: 48,
      synopsis:
        "Thorfinn busca vingança contra Askeladd enquanto presencia guerras vikings e questiona o verdadeiro significado da liberdade.",
      avaliacao: 4.9,
      episodioAtual: 48,
      episodiosPatrocinados: 6,
      genero: ["Aventura", "Histórico", "Drama"],
      classificacao: "16",
      estudio: "Wit Studio / MAPPA",
    },
    {
      id: 105,
      title: "Made in Abyss",
      image: "https://cdn.myanimelist.net/images/anime/6/86733.jpg",
      episodes: 25,
      synopsis:
        "Riko e o andróide Reg descem o Abyss enfrentando criaturas bizarras e mistérios em busca de respostas sobre sua mãe.",
      avaliacao: 4.8,
      episodioAtual: 25,
      episodiosPatrocinados: 5,
      genero: ["Aventura", "Fantasia", "Mistério"],
      classificacao: "14",
      estudio: "Kinema Citrus",
    },
    {
      id: 106,
      title: "Spy × Family",
      image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
      episodes: 37,
      synopsis:
        "O espião Twilight forma uma família falsa com a telepata Anya e a assassina Yor para completar sua missão secreta.",
      avaliacao: 4.7,
      episodioAtual: 37,
      episodiosPatrocinados: 4,
      genero: ["Comédia", "Ação", "Slice of Life"],
      classificacao: "12",
      estudio: "Wit Studio / CloverWorks",
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
      avaliacao: 4.7,
      episodioAtual: 47,
      episodiosPatrocinados: 47,
      genero: ["Ação", "Sobrenatural", "Shounen"],
      classificacao: "16",
      estudio: "MAPPA",
    },
    {
      id: 202,
      title: "Death Note",
      image: "https://cdn.myanimelist.net/images/anime/5/21439.jpg",
      episodes: 37,
      synopsis:
        "Light Yagami encontra um caderno mortal e entra em um duelo psicológico com o detetive L para redefinir o mundo.",
      avaliacao: 4.9,
      episodioAtual: 37,
      episodiosPatrocinados: 37,
      genero: ["Suspense", "Mistério", "Psicológico"],
      classificacao: "16",
      estudio: "Madhouse",
    },
    {
      id: 203,
      title: "Cowboy Bebop",
      image: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
      episodes: 26,
      synopsis:
        "Caçadores de recompensas cruzam o espaço em missões perigosas enquanto enfrentam passados turbulentos e jazz no porão.",
      avaliacao: 4.8,
      episodioAtual: 26,
      episodiosPatrocinados: 26,
      genero: ["Ação", "Ficção Científica", "Drama"],
      classificacao: "14",
      estudio: "Sunrise",
    },
    {
      id: 204,
      title: "Steins;Gate",
      image: "https://cdn.myanimelist.net/images/anime/1934/126355.jpg",
      episodes: 24,
      synopsis:
        "Okabe Rintarou e seus amigos descobrem viagens no tempo acidentais e precisam evitar linhas do tempo catastróficas.",
      avaliacao: 4.9,
      episodioAtual: 24,
      episodiosPatrocinados: 24,
      genero: ["Sci-Fi", "Thriller", "Drama"],
      classificacao: "14",
      estudio: "White Fox",
    },
  ],
};
