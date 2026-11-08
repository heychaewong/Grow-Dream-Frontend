import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

import { Colors, FontSize } from '@/constants/theme';

import { AppText } from './app-text';

type RadioProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  size?: keyof typeof FontSize;
};

export function Radio({ label, selected, onPress, size = 'body' }: RadioProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.row}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}>
      <Ionicons
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={selected ? Colors.primary : Colors.textSub}
      />
      <AppText size={size}>{label}</AppText>
    </Pressable>
  );
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

export function Checkbox({ label, checked, onPress }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.row}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}>
      <Ionicons
        name={checked ? 'checkbox' : 'square-outline'}
        size={20}
        color={checked ? Colors.primary : Colors.textSub}
      />
      <AppText size="small" color={Colors.textSub}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
