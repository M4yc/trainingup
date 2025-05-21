import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../../constants/colors';
import styles from './style';

interface TrainingDay {
  date: string; // formato 'YYYY-MM-DD'
  trained: boolean;
}

interface ListWeekProps {
  trainedDays?: TrainingDay[];
}

const getCurrentWeek = (trainedDays: TrainingDay[] = []) => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 (Dom) até 6 (Sáb)
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const week = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const isToday = date.toDateString() === now.toDateString();
    const isPast = date < new Date(now.setHours(0, 0, 0, 0));

    // Formata a data para comparar com os dias treinados
    const dateString = date.toISOString().split('T')[0];
    const trainingDay = trainedDays.find((day) => day.date === dateString);

    week.push({
      num: date.getDate(),
      day: weekDays[date.getDay()],
      trained: isPast ? (trainingDay?.trained ?? false) : false,
      isToday
    });
  }

  return week;
};

const ListWeek: React.FC<ListWeekProps> = ({ trainedDays = [] }) => {
  const days = getCurrentWeek(trainedDays);

  return (
    <View style={styles.container}>
      {days.map((item) => {
        let dayStyle = {};

        if (item.isToday) {
          dayStyle = styles.currentDay;
        } else if (item.trained) {
          dayStyle = styles.trainedDay;
        }

        return (
          <View key={item.num} style={styles.containerDay}>
            <Text style={styles.dayText}>{item.day}</Text>
            <View style={[styles.dayCircle, dayStyle]}>
              <Text
                style={[
                  styles.dateText,
                  item.trained && { color: item.isToday ? '#fff' : '#000' }
                ]}
              >
                {item.num.toString().padStart(2, '0')}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ListWeek;
