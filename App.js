import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(todayString);

  const [memos, setMemos] = useState([{"id": 1, "date": "2024-11-13", "memo": "앱 만들기", "status": false}, 
                                      {"id": 2, "date": "2024-11-13", "memo": "더 많은 앱 만들기", "status": false},
                                      {"id": 3, "date": "2024-11-12", "memo": "게임 하기", "status": false}]);

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const OnDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const textEdit = (content) => {
    setText(content);
  }

  const addMemo = (event) => {
    setModalVisible(true);
  };

  const ToggleMemo = (id) => {
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === id ? { ...memo, status: !memo.status } : memo
      )
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          onDayPress={OnDayPress}
          markedDates={{
            [selectedDay]: {selected : true, selectedColor: 'blue', selectedTextColor: 'white'}
          }}/>
      </View>

      <ScrollView style={styles.memosArea}>
        {memos.map((item, index) => (
          item.date === selectedDay ? 
          <TouchableOpacity  style={styles.memoBox} onPress={() => ToggleMemo(item.id)}>
            <Text style={item.status ? styles.eachMemoTrue : styles.eachMemoFalse} key={item.id}>
              {`${item.date}: ${item.memo}`}
            </Text>
          </TouchableOpacity > : null
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addMemoBtn} onPress={addMemo}>
        <AntDesign name="pluscircle" size={56} color="black" />
      </TouchableOpacity>

      <Modal
        // visible={modalVisible}
        transparent={true}
        >
        <View style={styles.modalCover}>
          <View style={styles.modalContainer}>
            <Text> {selectedDay} 할 일 </Text>
            <TextInput style={styles.textArea} value={text}/>
            <TouchableOpacity>
              <Text> 취소 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    width: '100%',
    justifyContent: 'center'
  },

  memosArea: {
    width: '100%',
    backgroundColor: 'green',
    paddingVertical: 10,
  },

  memoBox : {
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'grey',
    backgroundColor: 'grey',
  },

  eachMemoTrue: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },

  eachMemoFalse: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },

  addMemoBtn : {
    position: 'absolute',
    right: 30,
    bottom: 40,
    zIndex: 10,
  },

  modalCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    height: '20%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },

  textArea: {
    width: '100%',
    padding: 20,
    backgroundColor: 'black',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  }
});
