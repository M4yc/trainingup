import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface WorkoutCardProps {
  title: string;
  exerciseCount: number;
  lastUpdated: string;
  onPress: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  exerciseCount,
  lastUpdated,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="fitness-center" size={32} color="#44BF86" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{exerciseCount} exercícios</Text>
        <Text style={styles.date}>Última atualização: {lastUpdated}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#44BF86" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211d28',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  iconContainer: {
    backgroundColor: 'rgba(68, 191, 134, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16
  },
  infoContainer: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#44BF86',
    marginBottom: 4
  },
  date: {
    fontSize: 12,
    color: '#666'
  }
});

export default WorkoutCard;
