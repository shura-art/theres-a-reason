import { useState, useEffect } from 'react';
import { load, save } from '../services/storage';

export function useLocalStorage<T>(key: string, initial: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => load(key, initial));

  useEffect(() => {
    save(key, state);
  }, [key, state]);

  return [state, setState];
}
