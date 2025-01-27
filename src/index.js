import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
// Rendering the App component as the root component of the React application
root.render(<App />);