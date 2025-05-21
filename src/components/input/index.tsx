import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          props.multiline && styles.multilineInput
        ]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#ff4444'
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4
  }
});

export default Input;
