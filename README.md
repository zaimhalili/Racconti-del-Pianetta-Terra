<div align="center">

# 🌍 Racconti del Pianetta Terra

[![Website](https://img.shields.io/badge/🌐_Website-Live-00f2fe?style=for-the-badge)](https://your-vercel-url.vercel.app)
[![Team](https://img.shields.io/badge/Team-nonetropptardi-bd00ff?style=for-the-badge)](#)
[![Stories](https://img.shields.io/badge/Stories-4-d4af37?style=for-the-badge)](#-le-storie)

**Un'antologia cyberpunk di storie distopiche ambientate sulla Terra**  
*Una collezione interattiva di racconti che esplorano temi di immortalità, controllo, sopravvivenza e destino*

[🚀 Esplora le Storie](#-le-storie) • [✨ Caratteristiche](#-caratteristiche) • [🛠️ Tech Stack](#️-tech-stack) • [📖 Documentazione](#-documentazione)

</div>

---

## 📚 Le Storie

<table>
<tr>
<td width="50%">

### 🧪 Bambini Bonsai
> **"Un esperimento sociale su scala globale"**

Una distopia dove la società manipola la crescita umana per controllare la popolazione. Un mondo dove l'infanzia è programmata e l'umanità è ridotta a esperimento.

**Temi:** Controllo sociale, manipolazione genetica, resistenza  
**Stile:** Split-screen cinematico con data overlays  
**Tecnologie:** Particles, cursor effects, scanlines

</td>
<td width="50%">

### ♾️ Gli Immortali
> **"4.5 miliardi di anni... e non puoi morire"**

La storia di un immortale che ha vissuto ogni era della Terra, testimone silenzioso dell'ascesa e caduta delle civiltà. Dalla nascita del pianeta all'apocalisse nucleare.

**Temi:** Immortalità, solitudine, memoria infinita  
**Stile:** Card-based timeline interattiva  
**Tecnologie:** Typewriter effect, animated stats, Easter eggs

</td>
</tr>
<tr>
<td width="50%">

### 🔥 La Bocca Dell'Inferno
> **"Benvenuti nel quartiere dimenticato"**

Un racconto sulla sopravvivenza in un distretto urbano abbandonato, dove la violenza è norma e la speranza è un lusso. La storia di chi vive ai margini della società.

**Temi:** Violenza urbana, abbandono sociale, sopravvivenza  
**Stile:** Dark cyberpunk con effetti glitch  
**Tecnologie:** Interactive overlays, dynamic content

</td>
<td width="50%">

### 🚀 Il Sonno di Newton
> **"Il destino dell'umanità tra le stelle"**

Un viaggio nello spazio che diventa metafora del sonno eterno. Esplorando il confine tra vita, morte e ciò che significa essere umani nell'infinito cosmico.

**Temi:** Esplorazione spaziale, destino, esistenzialismo  
**Stile:** Space-themed con animazioni celesti  
**Tecnologie:** Parallax scrolling, cosmic effects

</td>
</tr>
</table>

---

## ✨ Caratteristiche

### 🎨 Design Unico per Ogni Storia
- **Layout Diversificati:** Ogni racconto ha un design unico che riflette il suo tema
- **Split-Screen Layouts:** Immagini cinematiche con overlay di contenuto
- **Card Systems:** Grids interattive con hover effects
- **Timeline Interattive:** Navigazione visuale attraverso le ere

### 🎭 Interattività Avanzata
- **🖱️ Custom Cursor Effects** - Anello e punto luminoso che seguono il mouse
- **⌨️ Typewriter Animation** - Testo che appare lettera per lettera
- **📊 Animated Counters** - Statistiche che si animano al scroll
- **✨ Particle Systems** - Particelle fluttuanti per effetti atmosferici
- **🎯 Scanline Effects** - Effetti cyberpunk scan line
- **🎁 Easter Eggs** - Sorprese nascoste da scoprire

### 🎨 Estetica Cyberpunk
```css
/* NO Gradients - Solo Solid Colors */
--cyber-black: #0a0e27    /* Background principale */
--cyber-dark: #1a1f3a     /* Cards e overlays */
--cyber-blue: #00f2fe     /* Accenti primari */
--cyber-purple: #bd00ff   /* Testo enfasi */
--cyber-red: #ff0055      /* Warning/Pericolo */
--accent-gold: #d4af37    /* Gli Immortali theme */
```

**Stile Distintivo:**
- ❌ **NO** gradients
- ❌ **NO** rounded corners
- ✅ **YES** sharp geometric clip-paths
- ✅ **YES** solid colors con glow effects
- ✅ **YES** futuristic fonts (Bruno Ace, Orbitron, Rajdhani)

### 📱 Responsive Design
- **Desktop First:** Layout ottimizzati per schermi grandi
- **Tablet:** Griglia adattiva e sizing flessibile
- **Mobile:** Stack layout con navigazione touch-friendly
- **Breakpoints:** 992px, 768px, 480px

---

## 🛠️ Tech Stack

### Frontend Puro
```
📦 Vanilla Stack (No Frameworks!)
├── HTML5         - Semantic markup
├── CSS3          - Custom properties, animations, clip-path
└── JavaScript    - ES6+, Intersection Observer, DOM manipulation
```

### Librerie & API
- **[Remix Icons](https://remixicon.com/)** - Icon system CDN
- **Google Fonts** - Bruno Ace, Orbitron, Rajdhani
- **IntersectionObserver API** - Scroll-triggered animations
- **RequestAnimationFrame** - Smooth parallax effects

### Design Patterns
```javascript
// Observer Pattern per scroll animations
const observer = new IntersectionObserver(callback, options);

// Typewriter Effect
const typewriterEffect = (element, text, speed) => { /* ... */ };

// Counter Animation
const animateCounter = (element) => { /* ... */ };

// Particle System
particles.forEach(p => createParticle(container, p));
```

---

## 📖 Documentazione

### 🗂️ Struttura del Progetto
```
bambiniBonsai/
├── 📁 assets/              # Immagini globali
│   ├── vuoto.jpg
│   ├── dinosauri.jpg
│   ├── umani.jpg
│   └── ...
├── 📁 Introduzione/        # Homepage
│   ├── index.html
│   ├── style.css
│   └── script.js
├── 📁 Bambini-Bonsai/      # Storia 1
│   ├── BambiniBonsai.html
│   ├── styleBambiniBonsai.css
│   ├── scriptBambiniBonsai.js
│   └── BambiniBonsai.txt
├── 📁 Gli-Immortali/       # Storia 2
│   ├── Immortali.html
│   ├── Immortali.css
│   ├── Immortali.js
│   └── Immortali.txt
├── 📁 bocca-dell-inferno/  # Storia 3
│   ├── BoccaInferno.html
│   ├── styleBoccaInferno.css
│   ├── scriptBoccaInferno.js
│   └── boccaInferno.txt
└── 📁 SonnoNewton/         # Storia 4
    ├── IlSonnoDiNewton.html
    ├── styleSonnoNewton.css
    ├── scriptSonnoNewton.js
    └── SonnoDiNewton.txt
```

### 🎯 Component Architecture

#### Card System
```html
<div class="chapter-card" data-chapter="1">
  <div class="card-border"></div>
  <div class="card-icon"><i class="ri-icon"></i></div>
  <div class="card-content">
    <span class="chapter-number">ERA 1</span>
    <h3 class="card-title">Titolo</h3>
    <p class="card-desc">Descrizione...</p>
    <span class="card-quote">Citazione</span>
  </div>
</div>
```

#### Timeline System
```html
<div class="timeline-container">
  <div class="timeline-line"></div>
  <div class="timeline-point" data-chapter="1">
    <div class="point-circle">1</div>
    <span>Etichetta</span>
  </div>
</div>
```

#### Stats/Data Overlay
```html
<div class="stat-card">
  <i class="ri-icon"></i>
  <div class="stat-info">
    <span class="stat-number" data-target="100">0</span>
    <span class="stat-label">Label</span>
  </div>
</div>
```

### 🎨 Styling Guide

#### Geometric Clip-Path (Sharp Corners)
```css
.card {
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}
```

#### Glow Effects (No Soft Shadows)
```css
.cyber-glow {
  border: 2px solid var(--cyber-blue);
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.5);
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.8);
}
```

#### Typography System
```css
.title {
  font-family: 'Bruno Ace', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.ui-element {
  font-family: 'Orbitron', monospace;
  letter-spacing: 2px;
}

.body-text {
  font-family: 'Rajdhani', sans-serif;
  line-height: 1.8;
}
```

---

## 🚀 Deployment

### Vercel Deployment
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Production
vercel --prod
```

### Configurazione (vercel.json - opzionale)
```json
{
  "routes": [
    { "src": "/", "dest": "/Introduzione/index.html" }
  ]
}
```

---

## 🎮 Easter Eggs & Interazioni

### 🎁 Easter Eggs Nascosti
- **Gli Immortali:** Clicca l'icona infinito 5 volte per un messaggio segreto
- **Bambini Bonsai:** Effetti glitch casuali sui numeri
- **Tutti i Racconti:** Custom cursor con effetti hover

### ⌨️ Keyboard Shortcuts
- **Arrow Up:** Scroll su di una viewport
- **Arrow Down:** Scroll giù di una viewport

### 🖱️ Interazioni Mouse
- **Timeline Click:** Scroll automatico al capitolo
- **Card Hover:** Sincronizzazione con timeline points
- **Quote Click:** Cicla tra diverse citazioni (Gli Immortali)

---

## 🎯 Filosofia del Design

### Cyberpunk Dystopian Storytelling
Ogni storia è un'esperienza immersiva che combina:
- **Visual Storytelling:** Layout che riflettono il tema narrativo
- **Interactive Elements:** L'utente è parte attiva della narrazione
- **Atmospheric Design:** Colori, fonts ed effetti creano mood distinti
- **Data-Driven Aesthetics:** Numeri, stats e overlay informativi

### Design Principles
1. **NO Gradients** - Solo colori solidi con sharp edges
2. **Geometric Purity** - Clip-path per forme angolari
3. **Futuristic Typography** - Fonts tecnologici e uppercase
4. **Glowing Accents** - Box-shadow e text-shadow per cyber glow
5. **Interactive Feedback** - Ogni azione ha una reazione visuale

---

## 👥 Team

**#nonetropptardi**

Un progetto di storytelling interattivo che esplora temi distopici attraverso il design cyberpunk e l'interattività web.

---

## 📄 License

Questo progetto è un'opera creativa. Tutti i diritti sui racconti e sul design sono riservati al team **#nonetropptardi**.

---

<div align="center">

### 🌟 Esplora i Racconti del Pianetta Terra

**[Visita il Sito](https://nonetroppotardi.vercel.app)**

*Made with 💜 by #nonetropptardi*

[![Star on GitHub](https://img.shields.io/github/stars/zaimhalili/Racconti-del-Pianetta-Terra?style=social)](https://github.com/zaimhalili/Racconti-del-Pianetta-Terra)

</div>