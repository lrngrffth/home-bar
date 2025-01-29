import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './pages/mainPageView';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { Theme } from './lowLevelComponents/Theme'
import { RootStoreProvider } from './providers/RootStoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RootStoreProvider>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </RootStoreProvider>
);

