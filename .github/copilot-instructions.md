# Copilot instructions for my-first-app

## Overview
This is a small vanilla JavaScript horizontal-scrolling action game. It has no build system, bundler, or tests. Primary files:
- index.html — game container and DOM structure
- style.css — all visual styles
- game.js — main Game class and game loop

## How to run (no build step)
- Open index.html in a browser (double-click or browser Open File).
- For a local HTTP server (recommended to avoid CORS/asset issues):
  - Python: `python3 -m http.server 8000`
  - Node: `npx http-server -p 8000` or `npx serve`

There are no build, test, or lint commands in this repo.

## High-level architecture
- Game class (game.js): encapsulates player state, enemies array, input handling, game loop, and DOM rendering.
- DOM-driven rendering: The game updates DOM elements directly instead of a canvas. Enemy elements are created under `#enemies` with IDs `enemy-{index}`.
- Coordinate system: `player` and `enemy` objects use numeric x/y and width/height. Rendering uses CSS `left` and `bottom` values derived from these numbers.
- Main loop: `requestAnimationFrame` calls `gameLoop()` which updates player and enemies each frame.

## Key conventions and patterns
- Important DOM IDs and containers:
  - `#gameContainer` — main area
  - `#player` — player element (styled in CSS)
  - `#enemies` — container for dynamically-created enemy elements
  - `#ui` — HUD area (text and gameover state)
- Enemy element IDs: `enemy-{index}` (index corresponds to array index when rendered).
- Input keys:
  - Move: ArrowLeft / ArrowRight or a / d
  - Jump: Space or ArrowUp
- Game over handling: `gameOver` flag set in Game.endGame(); UI text is updated and `gameover` class added to `#ui`.
- Keep logic edits in game.js; prefer adjustments to rendering and visuals in style.css. Avoid mixing large rendering changes into index.html unless adding new DOM hooks.

## When starting a Copilot session for this repo
- Inspect these files first: `game.js`, `index.html`, `style.css` (order matters: game.js, then HTML, then CSS).
- Search for DOM IDs listed above before introducing new ones.
- For behavior changes, update `Game` methods (updatePlayer, updateEnemies, spawnEnemy, checkCollision) and ensure DOM updates use existing element IDs.
- For performance-sensitive changes, consider moving to a single canvas-based renderer; document the migration plan in an issue/PR.

## Other assistant config files
- No CLAUDE.md, AGENTS.md, or other known assistant configs were detected in the repository root.

---

If helpful, add short GIFs/screenshots or a CONTRIBUTING.md with run instructions. Would you like me to configure any MCP servers relevant to this project (e.g., Playwright for web UI testing)?
