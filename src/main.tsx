/**
 * Development entry point for previewing the RAI Dashboard
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RAIDashboard from './RAIDashboard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RAIDashboard />
  </StrictMode>
);
