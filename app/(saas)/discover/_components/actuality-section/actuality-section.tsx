import { Badge } from "@/shared/ui/badge";
import { Card, CardContent } from "@/shared/ui/card";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Stock market today: Nasdaq closed, Nvidia sinks 17%",
    description: "Nvidia's stock price plummeted by 17% today, wiping out a record $568 billion in market value.",
    tags: ["AI", "Dev tool"],
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    title: 'DeepSeek est un "avertissement" pour l\'IA américaine, selon Trump',
    description:
      'Un "avertissement" pour les États-Unis. Le géant des semi-conducteurs Nvidia s\'est effondré en Bourse, annonçant la prochaine des crises.',
    tags: ["AI", "Dev tool"],
    image: "https://picsum.photos/200/300",
  },
];

export function ActualitySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Actuality</h2>
      <div className="grid grid-cols-2 gap-8">
        {newsArticles.map(article => (
          <Card key={article.id} className="cursor-pointer overflow-hidden transition-colors hover:bg-accent/50">
            <div className="relative aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.description}</p>
                <div className="flex gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
