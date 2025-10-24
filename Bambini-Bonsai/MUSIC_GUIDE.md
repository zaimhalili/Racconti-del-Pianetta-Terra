# 🎵 Cyberpunk Music Guide - Bambini Bonsai

## Current Setup
A floating audio toggle button appears in the bottom-right corner with a cyberpunk aesthetic:
- 🔇 Muted (default) with cyan glow
- 🔊 Playing with green glow and pulse animation

## How to Add Cyberpunk Music

### Option 1: Local Music File
1. Download cyberpunk/electronic music (see recommendations below)
2. Place the MP3 file in the `Bambini Bonsai` folder
3. Update line 368 in `scriptBambiniBonsai.js`:
   ```javascript
   const musicUrl = 'your-cyberpunk-track.mp3';
   ```

### Option 2: Online URL
Use a direct link to an MP3 file:
```javascript
const musicUrl = 'https://example.com/cyberpunk-music.mp3';
```

## 🎧 Recommended Free Music Sources

### Cyberpunk/Electronic Vibes:
1. **YouTube Audio Library**
   - Search: "Cyberpunk", "Synthwave", "Electronic Dark"
   - Free to download and use

2. **Free Music Archive** (freemusicarchive.org)
   - Genres: Electronic, Experimental, Ambient
   - Filter by: "Cyberpunk", "Dystopian"

3. **Incompetech** (incompetech.com)
   - Search terms: "Dark", "Electronic", "Tension"
   - Recommended: "Volatile Reaction", "Pippin the Hunchback"

4. **Pixabay Music** (pixabay.com/music/)
   - Search: "Cyberpunk", "Dark Electronic", "Synthwave"

5. **Chosic** (chosic.com/free-music/cyberpunk/)
   - Specifically curated cyberpunk tracks

### Specific Mood Suggestions:

**For Dystopian Atmosphere:**
- Dark ambient with slow synth pads
- Low bass rumbles
- Minimal beats
- Glitch effects

**For Cyberpunk Energy:**
- Synthwave with driving basslines
- Retro-futuristic synths
- Mid-tempo electronic beats
- Blade Runner-inspired sounds

**Keywords to Search:**
- "Cyberpunk ambient"
- "Dystopian soundtrack"
- "Dark synthwave"
- "Futuristic electronic"
- "Blade Runner style"
- "Neo-noir music"
- "Tech noir ambient"

## 🎛️ Audio Settings

### Volume Control
Adjust in `scriptBambiniBonsai.js` line 380:
```javascript
audio.volume = 0.25; // 0.0 (silent) to 1.0 (full)
```

**Recommended volumes by track type:**
- Ambient/atmospheric: 0.2-0.3
- Synthwave/energetic: 0.25-0.35
- Heavy beats: 0.15-0.25

### Loop Settings
Currently set to loop infinitely. To disable:
```javascript
audio.loop = false; // Will play once and stop
```

## 🎨 Button Features
- **Geometric clip-path** for cyberpunk aesthetic
- **Cyan glow** animation when inactive (pulsing)
- **Green glow** animation when active
- **Hover effect** - scales up and changes color
- **Smooth transitions** on all interactions
- **Responsive** - smaller on mobile devices

## 🎼 Perfect Tracks for Bambini Bonsai Story

Based on the story themes:
1. **Dystopian dome city** → Dark ambient with tension
2. **Children's adventure** → Light electronic with hope
3. **Rain scenes** → Glitchy, water-like sound design
4. **Candy Candy moment** → Emotional, bittersweet synth melody
5. **Final realization** → Heavy, melancholic outro

Consider tracks with:
- ✅ Emotional depth
- ✅ Futuristic sound design
- ✅ Balance between light and dark
- ✅ Not too aggressive (story is emotional)
- ✅ Loopable (no abrupt starts/ends)

## 💡 Pro Tips
1. **Test different volumes** - cyberpunk music can be overpowering
2. **Choose instrumental** - no vocals to distract from reading
3. **Match story pacing** - mid-tempo works best for scrolling
4. **Consider fade effects** - edit your track for smooth loops
5. **Mobile-friendly** - some phones auto-block audio, use button clearly

## 🚀 Quick Start
1. Go to YouTube Audio Library
2. Search "Cyberpunk" or "Dark Electronic"
3. Download an MP3
4. Rename it to `bambini-music.mp3`
5. Place in `Bambini Bonsai` folder
6. Update line 368 in script to: `const musicUrl = 'bambini-music.mp3';`
7. Refresh page and click the 🔇 button!

Enjoy the cyberpunk atmosphere! 🌆✨
