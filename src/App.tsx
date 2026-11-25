import React from 'react';
import { AppProvider } from './AppContext';
import { HcmCulturalSpacePage } from './HcmCulturalSpacePage';

export function App() {
  return (
    <AppProvider>
      <HcmCulturalSpacePage />
    </AppProvider>
  );
}

export default App;
