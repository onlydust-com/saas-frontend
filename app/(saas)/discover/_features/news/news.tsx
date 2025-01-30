import { NewsCard } from "@/app/(saas)/discover/_components/news-card/news-card";
import { Section } from "@/app/(saas)/discover/_components/section/section";

export function News() {
  return (
    <Section title="News">
      <div className="grid gap-12 md:grid-cols-2">
        <NewsCard
          title="Stock market today: Nasdaq clobbered, Nvidia sinks 17% while Dow stages comeback as AI fears shake markets"
          description="The Nasdaq tanked on Monday as a Chinese startup rattled faith in US leadership and profitability in AI, taking a hammer to Nvidia (NVDA), wiping out a record $589 billion in market value."
          imageUrl="https://picsum.photos/500/200"
          categories={["AI", "Technology"]}
          date="2024-01-01"
        />
        <NewsCard
          title="DeepSeek est un 'avertissement' pour l'IA américaine, selon Trump"
          description="Donald Trump a estimé, lundi, que le succès de DeepSeek, rival chinois de ChatGPT, était un 'avertissement' pour les États-Unis. Le géant des semi-conducteurs Nvidia s'est effondré en Bourse, amenant le le président américain à annoncer des droits ..."
          imageUrl="https://picsum.photos/500/200"
          categories={["AI", "Technology"]}
          date="2025-01-01"
        />
      </div>
    </Section>
  );
}
