# Yu-Gi-Oh! Card Collection Tracker

A personal Yu-Gi-Oh! card collection web app, built as a hands-on way to learn React and CSS from the ground up.

## Purpose

This project isn't just about tracking cards — it's a learning vehicle for frontend development. Every feature is a chance to practice a new React or CSS concept before applying it to more "serious" portfolio work.

## Tech Stack

- **Framework:** React (with Vite)
- **Styling:** Plain CSS (with an eye on Tailwind and CSS Modules as future alternatives)
- **Version Control:** GitHub (in progress)
- **Environment:** Windows, VS Code

## What is a React Component? (Notes)

A component is a small, self-contained, reusable piece of code — a JavaScript function that returns UI (usually written in JSX). Components nest inside each other to build a full app:

```
App
 ├── Header
 ├── Sidebar
 └── MainContent
      ├── Post
      ├── Post
      └── Post
```

**Why components:**
- Reusable — write once, use everywhere
- Modular — bugs are easier to isolate
- Readable — small files beat one giant HTML file
- Easier teamwork — different people can work on different components
- Encapsulated state and logic

**Trade-offs:**
- Learning curve (JSX, props, state)
- Overhead for very small projects
- "Prop drilling" through nested components (solved later with Context API)
- Possible performance pitfalls from unnecessary re-renders

**Minimal example:**

```jsx
// Greeting.jsx
function Greeting(props) {
  return (
    <div className="greeting-card">
      <h1>Hello, {props.name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

export default Greeting;
```

```jsx
// App.jsx
import Greeting from './Greeting';

function App() {
  return (
    <div>
      <Greeting name="PJ" />
      <Greeting name="Alex" />
    </div>
  );
}

export default App;
```

## Layout History

1. **First iteration:** `Header` / `Sidebar` / `MainContent` components, laid out with `grid-template-areas`.
2. **Second iteration:** `TopLeft` / `BottomLeft` / `CardDisplaySideBar` components, laid out with explicit `grid-column` / `grid-row` positioning.
3. **Current layout:** A named CSS grid system with areas including Bottom Left, Sidebar, Header, and MainContent/CardDisplaySideBar.

## Key CSS/React Lessons So Far

- **Grid vs. Flexbox:** CSS Grid handles macro layout (the overall page structure); Flexbox handles micro layout (positioning elements within a grid area).
- **Named grid areas** (`grid-template-areas`) are more readable; explicit `grid-column`/`grid-row` gives finer control.
- **Vite's default styles** get in the way of full-screen layouts — the `max-width`, `margin: 0 auto`, and `padding` in the default `index.css` need to be stripped out.
- **Full-screen sizing** needs `height: 100vh` plus `width: 100%`.
- **Buttons don't inherit font by default** — this needs an explicit CSS override.
- **Modals vs. sidebars:** `position: fixed` + z-index makes modals simpler to build than a grid-overlay sidebar, which needs `position: absolute` inside a `position: relative` container plus CSS transitions.
- **When to extract a component:** simple, single-use pieces (SearchBar, FilterBtn, AddButton) can live inline in a parent — extraction is worth it once complexity or reuse justifies it.

## Recurring Gotchas

- Missing `export default` statements
- Stale Vite dev server cache (fix: restart the server)
- Import path mismatches from file structure
- CSS files that silently fail to load — sometimes fixed by deleting and recreating the file (seen with `AddButton.css`)

## Current State

- Active layout uses the named grid system described above.
- A **Filter** feature is under consideration, with two design directions on the table:
  - A sliding sidebar that animates in from the left
  - A modal/pop-up
- Plan: build the modal first to nail down the filter logic, then migrate to a sidebar as a CSS/positioning enhancement later — keeping layout and logic concerns separate.

## On the Horizon

- [ ] Implement the Filter feature (modal first, sidebar later)
- [ ] Push the project to GitHub / set up version control
- [ ] Continue feature development on the collection tracker
- [ ] Connect a separate Python backend (PostgreSQL, existing schema) via Flask, to support an add-card feature using the YGOProdeck API
- [ ] Keep card storage simple for now; move to PostgreSQL after the VersaDesk application

---
*This README reflects a paused checkpoint in an ongoing learning project — pick up from "On the Horizon" when work resumes.*
