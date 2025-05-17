import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  LayoutChangeEvent
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import styles from './style';

type Props = {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  onPress?: () => void;
};

const Accordion: React.FC<Props> = ({
  title,
  children,
  isExpanded = false,
  style,
  headerStyle,
  onPress
}) => {
  const [innerExpanded, setInnerExpanded] = useState(isExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(isExpanded ? 1 : 0);
  const rotation = useSharedValue(isExpanded ? 1 : 0);

  const toggleAccordion = () => {
    if (onPress) {
      onPress();
      return;
    }

    const newValue = !innerExpanded;
    setInnerExpanded(newValue);

    animatedHeight.value = withTiming(newValue ? 1 : 0, { duration: 300 });
    rotation.value = withTiming(newValue ? 1 : 0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value * contentHeight,
    opacity: animatedHeight.value === 0 ? 0 : 1,
    overflow: 'hidden'
  }));

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }]
  }));

  const onContentLayout = (event: LayoutChangeEvent) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAccordion}
        style={[styles.header, headerStyle]}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={[styles.arrow, arrowStyle]}>
          <Text style={styles.arrowText}>▼</Text>
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[animatedStyle]}>
        <View onLayout={onContentLayout} style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
