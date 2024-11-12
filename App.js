import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(todayString);
  
  const onDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDay]: {selected : true, selectedColor: 'blue', selectedTextColor: 'white'}
          }}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar : {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  memoArea: {
    flex: 1
  }
});
