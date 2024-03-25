import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const item = SecureStore.getItem(key);

    if (!item) {
      SecureStore.setItem(key, JSON.stringify(defaultValue));
    }

    setValue(item ? JSON.parse(item) : defaultValue);
  }, [key, defaultValue]);

  const setValueWrap = (value: T) => {
    try {
      setValue(value);
      SecureStore.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  return [value, setValueWrap];
}
