import { TypographyH3 } from "@/shared/ui/typography";

import { ArticleCard } from "../../_components/article-card/article-card";
import { LatestArticlesSectionProps } from "./latest-articles.types";

export function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <TypographyH3>Actuality</TypographyH3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            categories={article.categories}
            date={article.date}
            image={article.image || ""}
          />
        ))}
      </div>
    </section>
  );
}
