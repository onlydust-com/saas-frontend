# Discover Page Component Patterns

## Component Structure
- All components should be in the `app/(saas)/discover/_components` directory
- Each component should have its own directory with the following structure:
  ```
  component-name/
  ├── component-name.tsx
  └── component-name.types.ts (if needed)
  ```

## Typography Usage
- Use Typography components from `@/shared/ui/typography`
- Section titles: `<TypographyH3>` for main sections
- Subsection titles: `<TypographyH4>` for sub-sections
- Description text: `<TypographyMuted>` for secondary text

## UI Components
- Use only shadcn components without overrides
- Common components:
  - Button: Use `variant="secondary"` for "Show more" actions
  - Card: Base container for all card components
  - Avatar: For project logos and language icons
  - Badge: For categories and tags
  - ScrollArea: For horizontal scrolling sections
  - Skeleton: For loading states

## Loading States
- Each section must implement skeleton loading with early return
- Skeleton structure:
  ```tsx
  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-48" /> {/* Title */}
          <Skeleton className="h-10 w-24" /> {/* Button */}
        </div>
        {/* Content skeletons */}
      </div>
    );
  }
  ```
- Skeleton dimensions:
  - Section title (H3): h-9
  - Subsection title (H4): h-7
  - Primary button: h-10
  - Secondary button: h-8
  - Card content: Match actual content dimensions

## Card Components
- Must implement `.Skeleton` as a static component
- Example structure:
  ```tsx
  Card.Skeleton = function CardSkeleton() {
    return (
      <Card>
        <CardContent>
          {/* Skeleton layout matching the card content */}
        </CardContent>
      </Card>
    );
  }
  ```

## Data Fetching
- Use React Query adapters for data fetching
- Implement proper loading and error states
- Early return pattern for loading states
- Hide section on error unless specified otherwise

## Layout Patterns
- Categories section:
  - Horizontal scroll with 3.5 cards visible
  - Use ScrollArea for smooth scrolling
  - Width calculation: `calc(100% + 25%)`
  - Card width: `w-[calc(100%/3.5)]`

- Project grid sections:
  - 3x3 grid for full-width sections
  - Use grid-cols-3 with gap-6
  - Consistent card heights

## Styling
- Use Tailwind classes
- Common spacing:
  - Section gap: gap-16
  - Card content gap: gap-6
  - Text content gap: gap-1
  - Item spacing: gap-4
- Padding:
  - Card padding: p-6
  - Section padding: p-8

## Error Handling
- Return null for subsections on error
- Show error message for main sections
- Use text-red-500 for error messages

## Component Props
- Use TypeScript interfaces
- Define types in separate .types.ts file if complex
- Example:
  ```typescript
  interface SectionProps {
    title: string;
    filter?: {
      queryParams: {
        pageSize: number;
        tags: string[];
      };
    };
  }
  ``` 