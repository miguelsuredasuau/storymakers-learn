# Design System Reference

Technical documentation for the slide layout system, primitives, and theming.

---

## Architecture Overview

The design system follows a layered architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      LAYOUTS                                 │
│  Complete slide implementations (18 layouts in 6 categories) │
├─────────────────────────────────────────────────────────────┤
│                     PRIMITIVES                               │
│  Reusable building blocks (11 components)                   │
├─────────────────────────────────────────────────────────────┤
│                   DESIGN TOKENS                              │
│  Colors, typography, spacing, effects (tokens.ts)           │
└─────────────────────────────────────────────────────────────┘
```

**Location:** `components/deck/layouts/`

---

## Design Tokens

### File: `tokens.ts`

Single source of truth for all design decisions.

### Colors

```typescript
colors = {
  brand: {
    accent: "#82c4cb",    // Primary teal - accents, highlights
    dark: "#10303A",      // Navy - dark backgrounds, primary text
    mid: "#1a4a5a",       // Mid navy - secondary dark
    light: "#e8f4f5",     // Light teal - subtle backgrounds
  },
  text: {
    primary: "#10303A",   // Main text on light
    secondary: "#64748b", // Subtitles
    muted: "#94a3b8",     // Captions
    inverted: "#ffffff",  // Text on dark
    accent: "#82c4cb",    // Teal text
  },
  surface: {
    background: "#ffffff", // Main background
    muted: "#f8fafc",      // Card backgrounds
    subtle: "#f1f5f9",     // Subtle sections
    border: "#e2e8f0",     // Borders
    dark: "#10303A",       // Dark surfaces
  },
  chart: {
    primary: "#82c4cb",    // 1st series
    secondary: "#10303A",  // 2nd series
    tertiary: "#f59e0b",   // 3rd series (amber)
    quaternary: "#8b5cf6", // 4th series (violet)
    quinary: "#ec4899",    // 5th series (pink)
    senary: "#14b8a6",     // 6th series (teal)
  },
  semantic: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  palette: {
    coral: "#f56551",
    orange: "#f97316",
    amber: "#f59e0b",
    lime: "#84cc16",
    emerald: "#10b981",
    cyan: "#06b6d4",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    pink: "#ec4899",
    rose: "#f43f5e",
  }
}
```

### Typography

```typescript
typography = {
  fonts: {
    display: "Plus Jakarta Sans",  // Headings
    body: "Inter",                 // Body text
    serif: "Merriweather",         // Quotes
    mono: "JetBrains Mono",        // Code
  },
  styles: {
    slideHeader:      { size: "text-4xl",  weight: "font-semibold" },
    slideHeaderLarge: { size: "text-5xl",  weight: "font-bold" },
    sectionTitle:     { size: "text-3xl",  weight: "font-bold" },
    subtitle:         { size: "text-xl",   weight: "font-normal" },
    body:             { size: "text-base", weight: "font-normal" },
    bodyLarge:        { size: "text-lg",   weight: "font-normal" },
    small:            { size: "text-sm",   weight: "font-normal" },
    caption:          { size: "text-xs",   weight: "font-medium" },
    overline:         { size: "text-xs",   weight: "font-bold", tracking: "tracking-widest" },
  }
}
```

### Spacing

```typescript
spacing = {
  slide: { x: "px-12", y: "py-8", full: "p-12" },
  header: { height: "h-20", paddingY: "py-4", marginBottom: "mb-6" },
  footer: { height: "h-16", paddingY: "py-4" },
  content: { gap: "gap-8", gapSmall: "gap-4", gapLarge: "gap-12" },
}
```

### Helper Functions

```typescript
// Get combined classes for a text style
getTextClasses('slideHeader') // => "text-4xl font-semibold tracking-tight leading-tight"

// Get grid column class
getGridCols(3) // => "grid-cols-3"

// Get nested color value
getColor('brand.accent') // => "#82c4cb"
```

---

## Primitives

### Location: `primitives/`

Reusable building blocks for composing layouts.

### Layout Zone Primitives

| Primitive | Purpose | Key Props |
|-----------|---------|-----------|
| **SlideContainer** | Main slide wrapper | `variant`, `header`, `footer`, `noPadding` |
| **SlideHeader** | Title zone | `title`, `badge`, `centered`, `variant` |
| **SlideFooter** | Footer with logo, page number | Multiple element controls |
| **SlideContent** | Content area wrapper | Handles padding/constraints |

### Content Primitives

| Primitive | Purpose | Key Props |
|-----------|---------|-----------|
| **SectionTitle** | Section/column headings | `align`, `variant`, `size` |
| **BulletList** | Styled list component | `bulletStyle`, `size`, `gap` |
| **ColumnGrid** | Multi-column layout | `columns` (1-4), `separator`, `gap` |
| **Separator** | Visual dividers | `orientation`, `variant`, `color` |
| **EmptySpace** | Spacer component | `height`, `className` |
| **Kicker** | Highlighted message bar (coral) | `message`, `variant`, `align` |

### Image Primitives

| Primitive | Purpose | Key Props |
|-----------|---------|-----------|
| **SlideImage** | Advanced image with S3 support | `objectFit`, `aspectRatio`, `rounded`, `shadow` |
| **ImageBlock** | Image with context/caption | Wraps SlideImage |

### Usage Example

```tsx
import {
  SlideContainer,
  SlideHeader,
  SlideContent,
  ColumnGrid,
  BulletList,
  SlideImage,
  Kicker
} from "../primitives";
import { colors, getTextClasses } from "../tokens";

const MyLayout = ({ title, bullets, imagePath, metadata }) => (
  <SlideContainer variant="light">
    <SlideHeader title={title} />
    <SlideContent>
      <ColumnGrid columns={2} separator>
        <div>
          <BulletList items={bullets} bulletStyle="dot" />
        </div>
        <div>
          <SlideImage path={imagePath} objectFit="cover" />
        </div>
      </ColumnGrid>
    </SlideContent>
    {/* Optional kicker message at bottom of content */}
    {metadata?.kicker && <Kicker message={metadata.kicker} variant="coral" />}
  </SlideContainer>
);
```

---

## Layout System

### Categories (6)

| Category | Purpose | Examples |
|----------|---------|----------|
| **cover** | Title/opening slides | `layout-cover` |
| **section** | Section breaks | `layout-section-header`, `layout-anlak-section` |
| **text** | Text-heavy content | `layout-standard`, `layout-two-col-text`, `layout-flexible-columns` |
| **image** | Image-focused | `layout-full-image`, `layout-two-col-image-right`, `layout-screenshot` |
| **hybrid** | Mixed content | `layout-big-stat`, `layout-quote`, `layout-framework`, `layout-impact` |
| **agenda** | Process/lists | `layout-process`, `layout-agenda` |

### Current Layouts (18)

| ID | Label | Category | Description |
|----|-------|----------|-------------|
| `layout-cover` | Cover (Premium) | cover | Cinematic brand cover with media support |
| `layout-section-header` | Section Header | section | Section break with title |
| `layout-anlak-section` | Anlak Section | section | Branded section break |
| `layout-standard` | Standard | text | Simple text + bullets |
| `layout-two-col-text` | Comparison 2-Col | text | Light/dark panel comparison |
| `layout-flexible-columns` | Flexible Columns | text | Dynamic 1-4 column layout |
| `layout-three-col-cards` | Three Cards | hybrid | Bento-style 3-card grid |
| `layout-two-col-image-right` | Two Col Image Right | image | Text left, image right |
| `layout-full-image` | Full Image | image | Full-bleed image |
| `layout-screenshot` | Screenshot | image | Screenshot with caption |
| `layout-big-stat` | Big Stat | hybrid | Large number + context |
| `layout-quote` | Quote | hybrid | Light quote layout |
| `layout-quote-red` | Quote Red | hybrid | Coral-accented quote |
| `layout-framework` | Framework | hybrid | 2x2 Matrix or pillars |
| `layout-process` | Process | agenda | Step-by-step process flow |
| `layout-agenda` | Agenda | agenda | Multi-step agenda |
| `layout-disclaimer` | Disclaimer | text | Legal/disclaimer text |
| `layout-impact` | Impact | hybrid | Impact statement |

---

## Creating a New Layout

### Step 1: Create Folder Structure

```
layouts/library/my-layout/
├── MyLayout.tsx      # Component
├── metadata.ts       # Field definitions
├── index.ts          # Barrel export
└── types.ts          # (optional) Custom types
```

### Step 2: Define Metadata

```typescript
// metadata.ts
import type { LayoutMetadata } from "../../types";

export const metadata: LayoutMetadata = {
  id: "layout-my-layout",
  label: "My Layout",
  category: "hybrid",  // cover | section | text | image | hybrid | agenda
  description: "Description for UI selector",
  fields: [
    { name: "title", label: "Title", type: "text", placeholder: "..." },
    { name: "subtitle", label: "Subtitle", type: "textarea" },
    { name: "imagePath", label: "Image", type: "image", showObjectFit: true },
    { name: "bullets", label: "Bullet Points", type: "bullets" },
    { name: "metadata.customField", label: "Custom", type: "text", optional: true },
    // Repeater for dynamic items
    {
      name: "metadata.items",
      label: "Items",
      type: "repeater",
      itemLabel: "Item",
      minItems: 1,
      maxItems: 5,
      itemFields: [
        { name: "title", label: "Item Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
};
```

### Step 3: Implement Component

```typescript
// MyLayout.tsx
import type { BaseLayoutProps } from "../../types";
import {
  SlideContainer,
  SlideHeader,
  SlideContent,
} from "../../primitives";
import { colors, typography, getTextClasses } from "../../tokens";

interface MyLayoutMetadata {
  customField?: string;
  items?: Array<{ title: string; description: string }>;
}

const MyLayout = ({
  title,
  subtitle,
  bullets,
  imagePath,
  metadata,
}: BaseLayoutProps<MyLayoutMetadata>) => {
  const items = metadata?.items || [];

  return (
    <SlideContainer variant="light">
      <SlideHeader title={title} />
      <SlideContent>
        {/* Layout content using primitives and tokens */}
        <div className={getTextClasses("body")}>
          {subtitle}
        </div>
      </SlideContent>
    </SlideContainer>
  );
};

export default MyLayout;
```

### Step 4: Create Barrel Export

```typescript
// index.ts
export { default } from "./MyLayout";
export { metadata } from "./metadata";
```

### Step 5: Register in Registry

```typescript
// registry.ts
import MyLayout, { metadata as metaMyLayout } from "./library/my-layout";

export const LAYOUTS: Record<string, SlideLayoutComponent> = {
  // ... existing layouts
  [metaMyLayout.id]: MyLayout,
};

export const LAYOUT_METADATA: LayoutMetadata[] = [
  // ... existing metadata
  metaMyLayout,
];
```

---

## Field Types Reference

| Type | Description | Options |
|------|-------------|---------|
| `text` | Single line input | `placeholder` |
| `textarea` | Multi-line input | `placeholder` |
| `image` | Image picker with S3 | `showObjectFit`, `defaultObjectFit`, `enableGeneration` |
| `date` | Date picker | - |
| `select` | Dropdown | `options: [{value, label}]` |
| `bullets` | Bullet point editor | - |
| `repeater` | Dynamic list of items | `itemFields`, `minItems`, `maxItems`, `itemLabel` |

### Field Options

```typescript
interface LayoutField {
  name: string;           // Field path (e.g., 'title', 'metadata.date')
  label: string;          // Display label
  type: FieldType;
  placeholder?: string;
  defaultValue?: unknown;
  optional?: boolean;
  // For select
  options?: Array<{ value: string; label: string }>;
  // For image
  showObjectFit?: boolean;
  defaultObjectFit?: "fill" | "cover" | "contain" | "none" | "scale-down";
  enableGeneration?: boolean;
  generationAspectRatio?: "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
  // For repeater
  itemFields?: LayoutField[];
  minItems?: number;
  maxItems?: number;
  itemLabel?: string;
}
```

---

## Best Practices

### Token Usage

```typescript
// Good - use tokens
className={`text-[${colors.brand.accent}]`}
className={getTextClasses('slideHeader')}

// Avoid - hardcoded values
className="text-[#82c4cb]"
className="text-4xl font-semibold"
```

### Primitive Composition

```typescript
// Good - use primitives for structure
<SlideContainer variant="light">
  <SlideHeader title={title} />
  <SlideContent>
    <ColumnGrid columns={2}>
      {/* content */}
    </ColumnGrid>
  </SlideContent>
</SlideContainer>

// Avoid - raw divs for standard structure
<div className="p-12 bg-white">
  <h1>{title}</h1>
  <div className="grid grid-cols-2">
    {/* content */}
  </div>
</div>
```

### Metadata Patterns

```typescript
// Direct fields - for standard slide properties
{ name: "title", ... }
{ name: "subtitle", ... }
{ name: "bullets", ... }
{ name: "imagePath", ... }

// Nested fields - for layout-specific data
{ name: "metadata.author", ... }
{ name: "metadata.stats.value", ... }
```

---

## File Reference

| File | Purpose |
|------|---------|
| `tokens.ts` | Design tokens (colors, typography, spacing) |
| `types.ts` | TypeScript type definitions |
| `registry.ts` | Layout registration |
| `utils.tsx` | Shared utilities (DecorativeBlob) |
| `primitives/` | Reusable building blocks |
| `library/` | Layout implementations |
