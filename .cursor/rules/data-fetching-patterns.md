# Data Fetching Patterns

## React Query Adapters

### Categories
```tsx
// Using ProjectCategoryReactQueryAdapter
const { data, isLoading, isError } = ProjectCategoryReactQueryAdapter.client.useGetProjectCategories({});
```

### Projects
```tsx
// Using ProjectReactQueryAdapter
const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
  queryParams: {
    pageSize: number,
    tags: ProjectTag[],
  },
});
```

## Filter Types

### Project Tags
```typescript
type ProjectTag =
  | "HOT_COMMUNITY"
  | "NEWBIES_WELCOME"
  | "LIKELY_TO_REWARD"
  | "WORK_IN_PROGRESS"
  | "FAST_AND_FURIOUS"
  | "BIG_WHALE"
  | "UPDATED_ROADMAP"
  | "HAS_GOOD_FIRST_ISSUES"
```

### Common Filters
```typescript
// Good First Issues
const GOOD_FIRST_ISSUES_FILTER = {
  pageSize: 6,
  tags: ["HAS_GOOD_FIRST_ISSUES"],
}

// Trending Projects
const TRENDING_FILTER = {
  pageSize: 3,
  tags: ["HOT_COMMUNITY"],
}
```

## Data Mapping

### Project Data
```typescript
// Map API response to ProjectCard props
{
  name: project.name,
  description: project.shortDescription || "",
  categories: project.categories.map(cat => cat.name),
  logoUrl: project.logoUrl || "https://placehold.co/400",
  languageIcon: project.languages?.[0]?.logoUrl,
}
```

### Category Data
```typescript
// Map API response to CategoryCard props
{
  title: category.name,
  description: category.description,
  icon: category.iconSlug as RemixIconsName,
  projectCount: category.projectCount,
}
```

## Error Handling

### Section Level
```typescript
if (isError) {
  return <div className="text-center text-red-500">
    Failed to load categories. Please try again later.
  </div>;
}
```

### Subsection Level
```typescript
if (isError) {
  return null; // Hide section on error
}
```

## Loading States
- Always implement isLoading check before error check
- Use early return pattern
- Show skeleton UI during loading
- Match the number of skeleton items to pageSize

## Best Practices
- Always provide fallback values for optional fields
- Use proper TypeScript types for query parameters
- Handle empty states gracefully
- Implement proper error boundaries
- Use consistent error messages
- Cache responses appropriately

## Common Patterns

### Section with Filters
```tsx
interface SectionProps {
  filter: {
    queryParams: {
      pageSize: number;
      tags: ProjectTag[];
    };
  };
}

export function Section({ filter }: SectionProps) {
  const { data, isLoading, isError } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams: filter.queryParams,
  });

  // Implementation...
}
```

### Data Transformation
```tsx
// Always transform API data to match component props
const transformedData = data?.pages[0].projects.map(project => ({
  id: project.id,
  name: project.name,
  description: project.shortDescription || "",
  // ... other transformations
}));
``` 