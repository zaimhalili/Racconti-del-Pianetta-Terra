# Adding Apocalyptic Background Music

## Current Setup
The audio system is configured to play background music when the audio toggle button (🔊) is clicked.

## How to Add Your Music

### Option 1: Use a Free Music File
1. Download free apocalyptic/dark ambient music from:
   - **YouTube Audio Library** (https://studio.youtube.com/channel/UC*/music)
   - **Free Music Archive** (https://freemusicarchive.org/)
   - **Incompetech** (https://incompetech.com/) - Search for "Dark" or "Ambient"
   - **Pixabay Music** (https://pixabay.com/music/)

2. Place the music file in the `Gli Immortali` folder (same folder as `Immortali.html`)

3. Update line 391 in `Immortali.js`:
   ```javascript
   const musicUrl = 'your-music-file.mp3'; // Replace with your filename
   ```

### Option 2: Use an Online Music URL
Replace line 391 in `Immortali.js` with a direct URL to an MP3 file:
```javascript
const musicUrl = 'https://example.com/apocalyptic-music.mp3';
```

## Recommended Music Search Terms
- "Dark ambient"
- "Apocalyptic soundtrack"
- "Post-apocalyptic atmosphere"
- "End times music"
- "Dystopian ambient"
- "Horror ambient"

## Volume Control
Current volume is set to 30% (line 400). Adjust if needed:
```javascript
audio.volume = 0.3; // 0.0 (silent) to 1.0 (full volume)
```

## Features
- ✅ Music loops automatically
- ✅ Play/pause with button toggle
- ✅ Volume set to 30% to not overpower the experience
- ✅ Button icon changes: 🔇 (off) ↔️ 🔊 (on)
