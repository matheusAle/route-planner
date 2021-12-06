import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Maps } from './common/components/maps';
import { Search } from './common/components/search';
import { VirtualList } from './common/components/virtual-list';
import { Places } from './store';
import { Place } from './store/types';

function App() {
  const places = useSelector(Places.selectPlaces);
  const [selectedPlace, setSelectedPlace] = useState<Place>();

  return (
    <div className="grid grid-cols-shell h-screen">
      <div>
        <Search />
        <VirtualList
          data={places}
          itemRender={({ item }) => {
            return (
              <div
                onClick={() => setSelectedPlace(item)}
                className="border border-solid  border-gray-200 rounded-md p-4 bg-white w-full h-full"
              >
                <p className="font-medium text-sm">{item.name}</p>
                <p className="font-normal text-sm text-gray-500">
                  {item.address}
                </p>
              </div>
            );
          }}
        />
      </div>
      <Maps centerplace={selectedPlace} />
    </div>
  );
}

export default App;
