# Skeleton Loading Patterns

## Component Organization
- Skeleton components should be defined as static components
- Place skeleton component in the same file as the main component
- Follow the pattern: `ComponentName.Skeleton`

## Implementation Pattern
```tsx
ComponentName.Skeleton = function ComponentNameSkeleton() {
  return (
    // Skeleton implementation
  );
};
```

## Common Skeleton Dimensions

### Typography
- H3 (Section titles): `h-9 w-48`
- H4 (Subsection titles): `h-7 w-48`
- Body text: `h-4 w-full`
- Description text: `h-4 w-24`

### Buttons
- Primary: `h-10 w-24`
- Secondary: `h-8 w-20`
- Small: `h-7 w-16`

### Cards
- Project Avatar: `h-24 w-24 rounded-xl`
- Language Icon: `h-5 w-5 rounded-full`
- Category Badge: `h-5 w-16 rounded-full`

## Loading State Pattern
```tsx
if (isLoading) {
  return (
    <section className="space-y-4">
      {/* Header Skeletons */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      
      {/* Content Skeletons */}
      <div className="grid grid-cols-3 gap-6">
        {Array(itemCount)
          .fill(null)
          .map((_, index) => (
            <ComponentName.Skeleton key={index} />
          ))}
      </div>
    </section>
  );
}
```

## Styling Guidelines
- Use `animate-pulse` for loading animation
- Use `bg-muted` for skeleton background
- Maintain consistent border radius with actual components
- Match exact dimensions of the content being loaded

## Best Practices
- Always show header skeletons (title, actions)
- Match the exact number of items being loaded
- Maintain the same layout and spacing as the loaded state
- Use the same container classes as the loaded state
- Keep skeleton widths proportional to expected content

## Common Patterns by Component Type

### List Items
```tsx
<div className="flex items-start gap-4">
  <Skeleton className="h-24 w-24 rounded-xl" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-full" />
  </div>
</div>
```

### Grid Items
```tsx
<div className="grid grid-cols-3 gap-6">
  {Array(count).fill(null).map((_, i) => (
    <Skeleton key={i} className="h-40 w-full rounded-lg" />
  ))}
</div>
```

### Text Content
```tsx
<div className="space-y-2">
  <Skeleton className="h-6 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
</div>
``` 