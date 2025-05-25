import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

interface WorkoutCardProps {
  title: string;
  exerciseCount: number;
  createDate: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  exerciseCount,
  createDate,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => setOpen(!open)}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="fitness-center" size={30} color="#44BF86" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{exerciseCount} exercícios</Text>
          <Text style={styles.date}>Data de criação: {createDate}</Text>
        </View>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={24} color="#44BF86" />
      </TouchableOpacity>
      {open &&(
        <View>
          <Text style={styles.subtitle}>{exerciseCount} exercícios</Text>
        </View>
      )}
    </View>
    
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
    padding: 10,
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
