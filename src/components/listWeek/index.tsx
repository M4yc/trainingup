import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../../constants/colors';
import styles from './style';

const getCurrentWeek = () => {
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

    week.push({
      num: date.getDate(),
      day: weekDays[date.getDay()],
      trained: false //Depois alterar para pegara do banco se treinou ou não
    });
  }

  return week;
};

const ListWeek: React.FC = () => {
  const days = getCurrentWeek();
  return (
    <View style={styles.container}>
      {days.map((item) => (
        <View
          key={item.num}
          style={[
            styles.continerDay,
            { backgroundColor: item.trained ? Colors.primary : 'transparent' }
          ]}
        >
          <Text style={{ color: '#fff' }}>{item.day}</Text>
          <Text style={{ color: '#fff' }}>
            {item.num.toString().padStart(2, '0')}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ListWeek;
