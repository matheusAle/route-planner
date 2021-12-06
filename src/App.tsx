import React from 'react';
import { Maps } from './common/components/maps';
import { Search } from './common/components/search';

function App() {
  return (
    <div className="grid grid-cols-shell h-screen">
      <div>
        <Search />
      </div>
      <Maps />
    </div>
  );
}

export default App;
