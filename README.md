# React 19.2 - Lesson 10 - Responding to Events

A small, ready-to-run app that demonstrates:
- `useState` for interactivity
- Event handlers (`onClick`, `onSubmit`)
- Passing handler props from parent to child
- Event bubbling and `stopPropagation`
- `preventDefault` with form submission
- Side effects within event handlers

## Features with Code Snippets

Alert button that reads props inside an inline handler:

```jsx
function AlertButton({ message }) {
  return <button onClick={() => alert(message)}>Show: {message}</button>;
}
```

Toolbar that shows parent bubbling and button `stopPropagation`:

```jsx
function Toolbar() {
  return (
    <div onClick={() => alert('Toolbar clicked!')}>
      <Button onClick={() => alert('Playing!')}>Play</Button>
      <Button onClick={() => alert('Uploading!')}>Upload</Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
```

Image gallery that cycles through an array with state updates:

```jsx
const images = ['https://picsum.photos/id/237/600/375', '...'];

function ImageGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const next = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prev = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  return (
    <>
      <img src={images[currentImageIndex]} alt="Gallery" />
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
}
```

Counter with state updates triggered by a click:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Clicked {count}</button>;
}
```

Form submit handler that prevents page reload:

```jsx
function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    alert('Form submitted!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Enter your name" />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Quick Start

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build & Preview

```bash
npm run build
npm run preview
```

## File Guide (What Each File Does)

- `index.html` - HTML entry point with the `#root` element and script tag for `src/main.jsx`.
- `package.json` - Project metadata, dependencies, and npm scripts for Vite.
- `vite.config.js` - Vite configuration enabling the React plugin.
- `src/main.jsx` - Client entry that creates the React root and renders `App`.
- `src/App.jsx` - Main UI demonstrating event handling examples and state.
- `src/index.css` - Global styles and component classes used by the demo.

## Explore

- Edit `src/App.jsx` to play with handlers and state.
- Replace the image URLs in `images` for your own gallery.
