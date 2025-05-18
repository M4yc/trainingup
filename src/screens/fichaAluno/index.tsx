// File: CreateTrainingPlan.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  weight: string;
};

type Group = {
  name: string;
  exercises: Exercise[];
};

export default function FichaTreinoAluno() {
  const [title, setTitle] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = () => {
    setGroups([...groups, { name: '', exercises: [] }]);
  };

  const addExercise = (groupIndex: number) => {
    const newGroups = [...groups];
    newGroups[groupIndex].exercises.push({
      name: '',
      sets: '',
      reps: '',
      weight: ''
    });
    setGroups(newGroups);
  };

  const handleGroupNameChange = (text: string, index: number) => {
    const newGroups = [...groups];
    newGroups[index].name = text;
    setGroups(newGroups);
  };

  const handleExerciseChange = (
    groupIndex: number,
    exerciseIndex: number,
    field: keyof Exercise,
    value: string
  ) => {
    const newGroups = [...groups];
    newGroups[groupIndex].exercises[exerciseIndex][field] = value;
    setGroups(newGroups);
  };

  const saveTrainingPlan = () => {
    const trainingPlan = { title, groups };
    console.log('Treino salvo:', trainingPlan);
    // Aqui você pode salvar no banco de dados ou enviar para API
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>Nome da Ficha:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ficha A - Segunda e Quinta"
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
      />

      <Button title="Adicionar Grupo Muscular" onPress={addGroup} />

      {groups.map((group, groupIndex) => (
        <View
          key={groupIndex}
          style={{ marginVertical: 16, padding: 8, borderWidth: 1 }}
        >
          <Text>Grupo Muscular:</Text>
          <TextInput
            value={group.name}
            onChangeText={(text) => handleGroupNameChange(text, groupIndex)}
            placeholder="Ex: Peito"
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />

          {group.exercises.map((exercise, exerciseIndex) => (
            <View key={exerciseIndex} style={{ marginBottom: 8 }}>
              <TextInput
                value={exercise.name}
                onChangeText={(text) =>
                  handleExerciseChange(groupIndex, exerciseIndex, 'name', text)
                }
                placeholder="Nome do exercício"
                style={{ borderWidth: 1, padding: 6, marginBottom: 4 }}
              />
              <TextInput
                value={exercise.sets}
                onChangeText={(text) =>
                  handleExerciseChange(groupIndex, exerciseIndex, 'sets', text)
                }
                placeholder="Séries"
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 6, marginBottom: 4 }}
              />
              <TextInput
                value={exercise.reps}
                onChangeText={(text) =>
                  handleExerciseChange(groupIndex, exerciseIndex, 'reps', text)
                }
                placeholder="Repetições"
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 6, marginBottom: 4 }}
              />
              <TextInput
                value={exercise.weight}
                onChangeText={(text) =>
                  handleExerciseChange(
                    groupIndex,
                    exerciseIndex,
                    'weight',
                    text
                  )
                }
                placeholder="Carga (kg)"
                keyboardType="numeric"
                style={{ borderWidth: 1, padding: 6 }}
              />
            </View>
          ))}

          <Button
            title="Adicionar Exercício"
            onPress={() => addExercise(groupIndex)}
          />
        </View>
      ))}

      <Button title="Salvar Ficha de Treino" onPress={saveTrainingPlan} />
    </ScrollView>
  );
}
