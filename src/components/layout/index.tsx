import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

type Props = {
  children: ReactNode;
  style?: object;
};

const Layout: React.FC<Props> = ({ children, style }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[styles.inner, style]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    flex: 1
  },
  inner: {
    flex: 1
  }
});
