import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

/**
 * 저장 키 앞에 붙는 이름. 저장하는 데이터 모양이 바뀌면 숫자를 올려서
 * 예전 모양으로 저장된 값을 읽지 않게 해요.
 */
const PREFIX = 'grow-dream:v1:';

export const storageKey = (key: string) => PREFIX + key;

/**
 * 기기에 저장되는 state. 앱을 다시 열거나 웹을 새로고침해도 값이 남아요.
 * (앱은 기기 저장소, 웹은 브라우저 localStorage에 저장돼요.)
 *
 * - 첫 화면은 항상 `initial`로 그려요. 웹은 미리 만든 HTML과 첫 화면이 같아야 해서,
 *   저장된 값은 화면이 뜬 다음에 불러와요.
 * - 저장된 값을 다 불러오기 전에는 저장하지 않아요. 그러지 않으면 기본값이 저장된 값을 덮어써요.
 */
export function usePersistentState<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(storageKey(key))
      .then((raw) => {
        if (cancelled || raw === null) return;
        setValue(JSON.parse(raw) as T);
      })
      // 저장된 값이 깨져 있으면 기본값으로 시작해요.
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(storageKey(key), JSON.stringify(value)).catch(() => {});
  }, [key, value, hydrated]);

  return [value, setValue];
}
