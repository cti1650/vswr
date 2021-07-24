//File that is used to save into localStorage
import { useState, useEffect } from 'react';

const PREFIX = 'vswr-';

export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(null);
  useEffect(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      setValue(JSON.parse(jsonValue));
    } else {
      if (typeof initialValue === 'function') {
        setValue(initialValue());
      } else {
        setValue(initialValue);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
  return [value, setValue];
};
