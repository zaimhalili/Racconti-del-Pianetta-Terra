# Bambini Bonsai - AI Agent Instructions

## Project Overview

A cinematic, cyberpunk dystopian storytelling website about "Bambini Bonsai". Features split-screen layouts, data visualizations, animated particles, character cards, and interactive UI elements. **NO GRADIENTS** - only solid colors with sharp geometric edges. Pure vanilla HTML/CSS/JS.

## Design Philosophy

**What Makes This Different:**

- NO gradients - only solid cyberpunk colors
- Sharp geometric cuts via clip-path (no rounded corners)
- Futuristic fonts with sharp edges (Bruno Ace, Orbitron, Rajdhani)
- Interactive data overlays and stat cards
- Different layout pattern for each chapter (split, fullscreen, centered)
- Particle systems and animated SVG elements
- Icon-driven UI (Remix Icons throughout)

## Technical Stack

### Files

- `index.html` - 4 chapters with distinct layouts, Remix Icons integration
- `style.css` - Cyberpunk theme, geometric patterns, NO gradients
- `script.js` - Particles, cursor effects, data counters, scanlines, keyboard nav
- `text.txt` - Original Italian story source

### Color System (Solid Only)

```css
--cyber-black: #0a0e27    /* Main background */
--cyber-dark: #1a1f3a     /* Cards, overlays */
--cyber-blue: #00f2fe     /* Primary accent, glows */
--cyber-purple: #bd00ff   /* Emphasis text */
--cyber-red: #ff0055      /* Final warning */
--text-primary: #ffffff   /* Main text */
--text-secondary: #a0aec0 /* Descriptive text */
```

### Typography

- **Bruno Ace**: Main titles (futuristic, all-caps)
- **Orbitron**: UI elements, chapter numbers (tech/sci-fi)
- **Rajdhani**: Body text (clean, modern)
- All headings: `text-transform: uppercase; letter-spacing: 2-3px`

### Icon System

- Remix Icons CDN
- Icons inline with text: `<i class="ri-[name]-line icon-inline">`
- Common: plant, user, heart, map, lock, seedling, time, community

## Chapter Layouts

### Chapter 1 - Split Screen Left/Right

```
[IMAGE with data overlays] | [Content with header + text + nav]
```

- Data overlay cards (stats with icons)
- Vertical content layout

### Chapter 2 - Fullscreen with Overlay

```
[Full image + animated SVG] + [Centered overlay with info cards]
```

- Animated SVG dome circles
- 2-column info cards (Fuori/Dentro comparison)

### Chapter 3 - Reverse Split Screen

```
[Content with character cards] | [IMAGE with timeline overlay]
```

- Character cards (horizontal with icons)
- Timeline progression (vertical with markers)

### Chapter 4 - Centered Dramatic

```
[Full image + particles] + [Centered moment card + final statement]
```

- Particle system (30 floating cyan dots)
- Red-bordered final statement

## UI Components

### Card Patterns

**Stat Card** (data overlay):

```html
<div class="stat-card">
  <i class="ri-icon"></i>
  <div class="stat-info">
    <span class="stat-value">VALUE</span>
    <span class="stat-label">Label</span>
  </div>
</div>
```

**Info Card** (comparison):

```html
<div class="info-card">
  <i class="ri-icon"></i>
  <h3>Title</h3>
  <p>Description</p>
</div>
```

**Character Card**:

```html
<div class="character-card">
  <i class="ri-user-icon"></i>
  <div class="character-info">
    <h4>Name</h4>
    <span>Role</span>
  </div>
</div>
```

**Timeline Item**:

```html
<div class="timeline-item active">
  <i class="ri-icon"></i>
  <span>Location</span>
</div>
```

### Geometric Styling

**Clip-Path Pattern** (sharp corners):

```css
clip-path: polygon(
  10px 0,
  100% 0,
  100% calc(100% - 10px),
  calc(100% - 10px) 100%,
  0 100%,
  0 10px
);
```

**Glow Effects** (no soft shadows):

```css
border: 2px solid var(--cyber-blue);
box-shadow: 0 0 20px var(--accent-glow);
text-shadow: 0 0 10px var(--accent-glow);
```

## JavaScript Features

### Particle System

- 30 particles in Chapter 4 `.particle-system`
- Random size (2-6px), position, delays
- Float animation with CSS keyframes

### Data Counters

- Glitch effect on scroll-in
- Random character cycling for special values (∞, SOSPENSIONE)

### Cursor Effects

- Custom cursor ring (40px blue border)
- Cursor dot (6px with glow)
- Scales on hover over interactive elements

### Scanline Animation

- Vertical sweep on IntersectionObserver
- Triggered per chapter when scrolled into view

### Keyboard Navigation

- Arrow Up: Scroll up one viewport
- Arrow Down: Scroll down one viewport

## Animation Principles

**What NOT to Use:**

- ❌ Gradients
- ❌ Rounded corners (border-radius)
- ❌ Soft box-shadows
- ❌ Serif fonts

**What TO Use:**

- ✅ Solid colors with opacity
- ✅ Clip-path for geometry
- ✅ Sharp glows (0 0 Xpx)
- ✅ Transform animations
- ✅ Futuristic fonts

## Content Styling

### Text Emphasis

- **Character names**: `<strong>` (cyan color, glowing)
- **Concepts**: `<em>` (purple color, subtle glow)
- **Icons inline**: `<i class="ri-icon icon-inline">` (cyan, before text)

### Color Meanings

- Cyan: Technology, characters, data, navigation
- Purple: Abstract concepts, special terms
- Red: Danger, final statement, impossibility
- Green: (Reserved for success states, rarely used)

## Development Workflow

### Adding New Interactive Card

1. Choose card type (stat, info, character, timeline)
2. Add icon from Remix Icons
3. Apply clip-path for angular cuts
4. Add hover state (border-color + bg change)
5. Consider IntersectionObserver trigger

### Modifying Chapter Layout

1. Choose pattern: split, fullscreen, or centered
2. Add appropriate wrapper class
3. Position image vs content
4. Add overlay components (data, timeline, particles)

### Testing Checklist

- [ ] Icons load from CDN
- [ ] Cursor effects work
- [ ] Particles animate in Chapter 4
- [ ] Scanlines trigger on scroll
- [ ] Keyboard nav works (arrow keys)
- [ ] All cards have hover states
- [ ] No gradients anywhere
- [ ] Mobile responsive (stacks to 1 column)

## Performance

- IntersectionObserver for scroll triggers
- RequestAnimationFrame for parallax
- CSS transforms (GPU accelerated)
- Particle count limited to 30
- Icons via CDN (consider local for prod)

## Accessibility

- Alt text on all images
- Keyboard navigation support
- High contrast cyan on dark
- Icon + text labels (not icon-only)
- Semantic HTML structure

## Browser Support

- Modern browsers with clip-path support
- CSS animations and transforms
- IntersectionObserver API
- RequestAnimationFrame
