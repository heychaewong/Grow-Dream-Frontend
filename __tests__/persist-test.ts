import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { storageKey, usePersistentState } from '@/store/persist';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('usePersistentState: 기기에 저장되는 state', () => {
  test('저장된 값이 없으면 기본값을 써요', async () => {
    const { result } = await renderHook(() => usePersistentState('coins', 5));
    expect(result.current[0]).toBe(5);
  });

  test('저장된 값이 있으면 불러와요 (앱을 다시 연 상황)', async () => {
    await AsyncStorage.setItem(storageKey('coins'), JSON.stringify(9));
    const { result } = await renderHook(() => usePersistentState('coins', 5));
    await waitFor(() => expect(result.current[0]).toBe(9));
  });

  test('값을 바꾸면 저장돼요', async () => {
    const { result } = await renderHook(() => usePersistentState('coins', 5));
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalled());
    await act(async () => result.current[1](12));
    await waitFor(async () => expect(await AsyncStorage.getItem(storageKey('coins'))).toBe('12'));
  });

  test('불러오기 전에는 기본값으로 저장된 값을 덮어쓰지 않아요', async () => {
    await AsyncStorage.setItem(storageKey('coins'), JSON.stringify(9));
    const { result } = await renderHook(() => usePersistentState('coins', 5));
    await waitFor(() => expect(result.current[0]).toBe(9));
    expect(await AsyncStorage.getItem(storageKey('coins'))).toBe('9');
  });

  test('저장된 값이 깨져 있으면 기본값으로 시작해요', async () => {
    await AsyncStorage.setItem(storageKey('coins'), '{망가진 JSON');
    const { result } = await renderHook(() => usePersistentState('coins', 5));
    await act(async () => {});
    expect(result.current[0]).toBe(5);
  });
});
