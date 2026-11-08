import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type DropdownChipProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

/** "대전 ∨", "분야 ∧" 같은 작은 선택 버튼. 첫 번째 옵션('전체')이면 label을 보여줘요. */
export function DropdownChip({ label, options, value, onChange }: DropdownChipProps) {
  const [open, setOpen] = useState(false);
  const active = value !== options[0];

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => setOpen((o) => !o)}
        style={[styles.chip, active && styles.chipActive]}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        accessibilityState={{ expanded: open }}>
        <AppText size="body" color={active ? Colors.primary : Colors.textMuted} numberOfLines={1}>
          {active ? value : label}
        </AppText>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color={active ? Colors.primary : Colors.textMuted} />
      </Pressable>
      {open && (
        <View style={styles.menu}>
          {options.map((o) => (
            <Pressable
              key={o}
              onPress={() => {
                onChange(o);
                setOpen(false);
              }}
              style={({ pressed }) => [styles.item, pressed && { backgroundColor: Colors.primaryTint }]}
              accessibilityRole="menuitem">
              <AppText size="small" weight={o === value ? 'bold' : 'regular'}>
                {o}
              </AppText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    zIndex: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    height: 44,
    paddingHorizontal: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: 4,
  },
  chipActive: {
    borderColor: Colors.primarySoft,
    backgroundColor: Colors.primaryTint,
  },
  menu: {
    position: 'absolute',
    top: 48,
    left: 0,
    minWidth: 110,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  item: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
});
