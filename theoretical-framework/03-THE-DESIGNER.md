# The Designer: Visuals & Clarity

## Role Definition

The Designer is responsible for the **visual communication** of the presentation. They ensure that every slide is instantly comprehensible, that data tells a story, and that visual noise is eliminated.

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

---

## Core Principles

### 1. Less is More

**The Problem with Most Slides:**
- Too much text (audiences read faster than you speak)
- Chart junk (unnecessary visual elements)
- Competing focal points (eye doesn't know where to look)
- Decoration over communication

**The Designer's Mandate:**
Every element must EARN its place on the slide. If it doesn't directly support the message, remove it.

### 2. Data-Ink Ratio

**Edward Tufte's Principle:**
```
                    Ink used for data
Data-Ink Ratio = ─────────────────────
                   Total ink on chart
```

**Goal:** Maximize this ratio. Remove:
- Gridlines (or make very subtle)
- Unnecessary axis labels
- Redundant legends
- Background colors
- 3D effects
- Decorative elements

**Before & After:**
```
BEFORE (Low Data-Ink):              AFTER (High Data-Ink):
┌─────────────────────────┐
│ ████ Q1 Sales by Region │         Q1 Sales by Region
│ ┌───┬───┬───┬───┬───┐   │
│ │   │   │   │   │   │   │         North ████████████ $2.4M
│ │   │   │   │   │   │   │         South ██████████   $2.1M
│ │ █ │ █ │ █ │ █ │ █ │   │         West  ████████     $1.8M
│ │ █ │ █ │ █ │ █ │ █ │   │         East  ██████       $1.5M
│ └───┴───┴───┴───┴───┘   │
│   N   S   W   E   C     │
└─────────────────────────┘
```

### 3. Gestalt Principles

The brain automatically organizes visual information. Use this:

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Proximity** | Close things are grouped | Group related items |
| **Similarity** | Similar things are grouped | Use consistent colors/shapes |
| **Enclosure** | Enclosed things are grouped | Use boxes, backgrounds |
| **Continuity** | Eyes follow lines/curves | Align elements |
| **Closure** | Mind completes incomplete shapes | Simplify visuals |
| **Connection** | Connected things are related | Use lines, arrows |

### 4. Visual Hierarchy

Guide the eye through intentional emphasis:

```
STRONGEST EMPHASIS
        ▲
        │    Size (bigger = more important)
        │    Color (contrast draws attention)
        │    Position (top-left first in Western reading)
        │    Weight (bold > regular > light)
        │    Space (isolation creates emphasis)
        ▼
WEAKEST EMPHASIS
```

---

## The Designer at Each Level

### At BLOCKS: Plan the Evidence

**Tool: The Plausibility Loop**

For each block, map the evidence needed to support your argument:

```
┌─────────────────────────────────────────────────────────────┐
│ BLOCK: "We should acquire TechCo"                           │
├─────────────────────────────────────────────────────────────┤
│ Claim             │ Evidence Needed       │ Visual Type     │
├───────────────────┼───────────────────────┼─────────────────┤
│ Market is growing │ Market size data      │ Line chart      │
│ TechCo is leader  │ Market share          │ Pie/Bar chart   │
│ Tech is superior  │ Feature comparison    │ Matrix/Table    │
│ Price is fair     │ Valuation analysis    │ Waterfall       │
│ We can integrate  │ Timeline/milestones   │ Gantt/Roadmap   │
└───────────────────┴───────────────────────┴─────────────────┘
```

**Evidence Types:**
- **Quantitative:** Numbers, statistics, trends
- **Qualitative:** Quotes, testimonials, examples
- **Comparative:** Benchmarks, before/after, alternatives
- **Visual Proof:** Screenshots, photos, demos

### At LOOPS: Storyboard the Data

**Tool: Reveal vs. Headline Strategy**

Two approaches to presenting data:

| Headline First | Progressive Reveal |
|----------------|-------------------|
| State insight → Show proof | Build evidence → Arrive at insight |
| "Sales grew 40%" [then show chart] | [Show chart] → "What's driving this 40% growth?" |
| Best for: Time-pressed audiences | Best for: Skeptical audiences |
| Executive summaries | Analytical deep-dives |

**Tool: Data Story Arc**

Within a loop, data should follow a narrative:

```
1. CONTEXT          "Here's what we were tracking..."
       ↓
2. CONFLICT         "But something unexpected happened..."
       ↓
3. INSIGHT          "When we looked closer, we found..."
       ↓
4. IMPLICATION      "This means we should..."
```

**Tool: Chart Selection Guide**

| If You Want To Show... | Use... |
|------------------------|--------|
| Change over time | Line chart |
| Part of whole | Pie (≤5 parts), Stacked bar |
| Comparison | Bar chart (horizontal for many items) |
| Correlation | Scatter plot |
| Distribution | Histogram, Box plot |
| Flow/Process | Sankey, Waterfall |
| Ranking | Horizontal bar (sorted) |
| Composition | Treemap, Stacked area |
| Geographic | Map |
| Simple KPI | Big number |

---

### At SLIDES: Refine the Signal

**Tool: The Squint Test**

If you squint at your slide and can't tell what's important, you have a hierarchy problem.

**Tool: The 3-Second Rule**

Audiences should grasp the main point in 3 seconds. If they need to read to understand, simplify.

**Tool: The One Idea Rule**

Each slide = One idea. If you have two ideas, you have two slides.

**Layout Principles:**

```
┌─────────────────────────────────────────┐
│ ACTION TITLE THAT STATES THE INSIGHT    │  ← Message
├─────────────────────────────────────────┤
│                                         │
│                                         │
│         VISUAL PROOF AREA               │  ← Evidence
│         (Chart, Diagram, Image)         │
│                                         │
│                                         │
├─────────────────────────────────────────┤
│ Source: ... | Annotation                │  ← Context
└─────────────────────────────────────────┘
```

**Color Strategy:**

| Purpose | Recommendation |
|---------|----------------|
| Emphasis | One accent color for key data |
| Categories | Max 5-7 distinct colors |
| Sentiment | Red (negative), Green (positive), Gray (neutral) |
| Hierarchy | Dark (important) → Light (supporting) |
| Accessibility | Test for color blindness |

---

## Designer's Toolkit

### Chart Improvement Checklist

- [ ] Does the title state the insight?
- [ ] Is the chart type appropriate?
- [ ] Are unnecessary gridlines removed?
- [ ] Is the key data point highlighted?
- [ ] Are labels readable without legend?
- [ ] Is the source cited?

### Slide Layout Templates

**The Big Statement:**
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│          "KEY QUOTE OR                  │
│           BIG NUMBER"                   │
│                                         │
│              — Source                   │
│                                         │
└─────────────────────────────────────────┘
```

**The Comparison:**
```
┌──────────────────┬──────────────────────┐
│                  │                      │
│     BEFORE       │       AFTER          │
│     OLD WAY      │       NEW WAY        │
│     PROBLEM      │       SOLUTION       │
│                  │                      │
└──────────────────┴──────────────────────┘
```

**The Framework:**
```
┌─────────────────────────────────────────┐
│          FRAMEWORK NAME                 │
├────────────┬────────────┬───────────────┤
│            │            │               │
│  ELEMENT 1 │  ELEMENT 2 │   ELEMENT 3   │
│            │            │               │
└────────────┴────────────┴───────────────┘
```

**The Process:**
```
┌─────────────────────────────────────────┐
│                                         │
│   ┌───┐     ┌───┐     ┌───┐     ┌───┐  │
│   │ 1 │────►│ 2 │────►│ 3 │────►│ 4 │  │
│   └───┘     └───┘     └───┘     └───┘  │
│   Step 1    Step 2    Step 3    Step 4  │
│                                         │
└─────────────────────────────────────────┘
```

---

## Designer's Checklist

### Before Starting:
- [ ] What visual assets do I have/need?
- [ ] What is the visual style guide?
- [ ] What are the brand colors/fonts?

### At Block Level:
- [ ] Is there a visual evidence plan for each claim?
- [ ] Is there variety in visual types?
- [ ] Are key visuals placed at emotional peaks?

### At Loop Level:
- [ ] Is the data reveal strategy intentional?
- [ ] Do visuals build on each other?
- [ ] Are transitions visually smooth?

### At Slide Level:
- [ ] Does it pass the squint test?
- [ ] Does it pass the 3-second test?
- [ ] Is there ONE focal point?
- [ ] Is data-ink ratio maximized?

---

## Common Designer Mistakes

1. **Chart Junk:** 3D effects, unnecessary decoration
2. **Rainbow Charts:** Too many colors competing
3. **Wall of Text:** Slides that are documents
4. **Tiny Labels:** Unreadable from back of room
5. **Buried Insight:** Key data not emphasized
6. **Inconsistent Style:** Different fonts, colors, layouts
7. **Missing Source:** Data without attribution
8. **Wrong Chart Type:** Pie chart for trends, etc.

---

## Key Sources

- Tufte, Edward. *The Visual Display of Quantitative Information*
- Schwabish, Jonathan. *Better Data Visualizations*
- Knaflic, Cole Nussbaumer. *Storytelling with Data*
- Duarte, Nancy. *Slideology: The Art and Science of Creating Great Presentations*
- Berinato, Scott. *Good Charts: The HBR Guide to Making Smarter, More Persuasive Data Visualizations*
