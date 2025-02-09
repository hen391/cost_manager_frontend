// src/index.js
/**
 * This is the entry point of the React application.
 * It renders the main App component into the DOM.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container);
// Rendering the App component as the root component of the React application
root.render(<App />);