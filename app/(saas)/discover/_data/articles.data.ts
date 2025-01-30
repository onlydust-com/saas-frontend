export interface Article {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  categories: string[];
  image?: string;
}

export const articles: Article[] = [
  {
    id: "article-1",
    title: "Stock market today: Nasdaq clobbered, Nvidia sinks 17% while Dow stages comeback as AI fears shake markets",
    description:
      "The Nasdaq tanked on Monday as a Chinese startup rattled faith in US leadership and profitability in AI, taking a hammer to Nvidia (NVDA), wiping out a record $559 billion in market value.",
    author: {
      name: "Market Analysis Team",
      avatar: "/images/avatars/market.jpg",
    },
    date: "28 Jan, 2025",
    readTime: "5 min",
    categories: ["AI", "Market", "Technology"],
    image: "/images/articles/stock-market.jpg",
  },
  {
    id: "article-2",
    title: 'DeepSeek est un "avertissement" pour l\'IA américaine, selon Trump',
    description:
      'Donald Trump a estimé, lundi, que le succès de DeepSeek, rival chinois de ChatGPT, était un "avertissement" pour les États-Unis. Le géant des semi-conducteurs Nvidia s\'est effondré en Bourse, amenant le président américain à annoncer des droits',
    author: {
      name: "Tech News Team",
      avatar: "/images/avatars/tech.jpg",
    },
    date: "28 Jan, 2025",
    readTime: "8 min",
    categories: ["AI", "Politics", "Technology"],
    image: "/images/articles/deepseek.jpg",
  },
];
