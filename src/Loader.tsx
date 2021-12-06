import React from 'react';
import { useMaps } from './common/hooks/use-maps';

export const Loader: React.FC<any> = ({ children }) => {
  const { isLoaded } = useMaps();

  return isLoaded ? children : <></>;
};
