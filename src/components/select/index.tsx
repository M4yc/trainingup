import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ícone de setinha

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export const Select = ({ value, onChange, options, placeholder }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setOpen(true)}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {selectedLabel || placeholder || 'Selecione'}
        </Text>
        <AntDesign
          name={open ? 'up' : 'down'}
          size={16}
          color="#00ff88"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      isSelected && styles.optionSelected
                    ]}
                    onPress={() => {
                      onChange(item.value);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    backgroundColor: '#222',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectText: {
    color: '#00ff88',
    fontSize: 16,
    flex: 1
  },
  placeholder: {
    color: '#666'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 24
  },
  modalContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    maxHeight: 300
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  optionText: {
    color: '#00ff88',
    fontSize: 16
  },
  optionSelected: {
    backgroundColor: '#444',
    borderLeftWidth: 4,
    borderLeftColor: '#00ff88'
  },
  optionTextSelected: {
    fontWeight: 'bold'
  }
});
