import React, { useState } from 'react'

// Simple Button with inline handler (reads props inside handler)
function AlertButton({ message }) {
  return <button className="btn" onClick={() => alert(message)}>Show: {message}</button>;
}

// Custom Button that accepts external onClick and stops propagation
function Button({ onClick, children }) {
  return (
    <button
      className="btn primary"
      onClick={(e) => {
        // Stop bubbling to demonstrate stopPropagation
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}

// Toolbar demonstrating passing handlers down as props + bubbling on parent
function Toolbar() {
  function handlePlayClick() {
    alert('🎵 Playing!');
  }

  function handleUploadClick() {
    alert('⬆️ Uploading!');
  }

  return (
    <div
      className="toolbar card"
      onClick={() => alert('Toolbar clicked! (bubbling example)')}
    >
      <h3>🎛 Toolbar</h3>
      <div className="row gap">
        <Button onClick={handlePlayClick}>Play</Button>
        <Button onClick={handleUploadClick}>Upload</Button>
      </div>
      <p className="muted">Tip: clicking the area outside the buttons will trigger the "Toolbar clicked" alert due to bubbling. The buttons themselves call stopPropagation.</p>
    </div>
  );
}

// Image Gallery cycling through images
const images = [
  'https://picsum.photos/id/237/600/375',
  'https://picsum.photos/id/238/600/375',
  'https://picsum.photos/id/239/600/375',
];

function ImageGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleNextClick() {
    setCurrentImageIndex((i) => (i + 1) % images.length);
  }

  function handlePrevClick() {
    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);
  }

  return (
    <div className="card">
      <h3>🖼 Image Gallery</h3>
      <img
        src={images[currentImageIndex]}
        alt="Gallery"
        className="image"
      />
      <div className="row gap center">
        <button className="btn" onClick={handlePrevClick}>◀️ Previous</button>
        <button className="btn" onClick={handleNextClick}>Next ▶️</button>
      </div>
    </div>
  );
}

// Counter with state update side effects
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button className="btn" onClick={() => setCount(count + 1)}>
      Clicked {count} {count === 1 ? 'time' : 'times'}
    </button>
  );
}

// Signup form (preventDefault example)
function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    alert('Form submitted! (preventDefault in action)');
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>📮 Signup</h3>
      <div className="row gap">
        <input className="input" placeholder="Enter your name" />
        <button className="btn primary" type="submit">Send</button>
      </div>
      <p className="muted">Submitting the form shows an alert instead of reloading the page.</p>
    </form>
  );
}

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>⚛️ React Lesson 10 — Responding to Events</h1>
        <p className="muted">Explore state, event handlers, bubbling, stopPropagation, preventDefault, and parent-to-child callbacks.</p>
      </header>

      <Toolbar />
      <ImageGallery />

      <section className="grid two">
        <div className="card">
          <h3>🔔 Alert Button (props in handlers)</h3>
          <AlertButton message="Custom message from props" />
        </div>
        <div className="card">
          <h3>🔢 Counter (state + side effects)</h3>
          <Counter />
        </div>
      </section>

      <Signup />

      <footer className="muted small">
        <p>
          Want to experiment? Open <code>src/App.jsx</code>, edit components or handlers,
          and save to see fast HMR from Vite.
        </p>
      </footer>
    </div>
  );
}
