import { CategoryCard } from "../../_components/category-card/category-card";
import { CategoriesSectionProps } from "./categories.types";

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            count={category.count}
          />
        ))}
      </div>
    </section>
  );
} 