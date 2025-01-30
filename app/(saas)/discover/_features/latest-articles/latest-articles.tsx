import { ArticleCard } from "../../_components/article-card/article-card";
import { LatestArticlesSectionProps } from "./latest-articles.types";

export function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Latest Articles</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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