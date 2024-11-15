import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView,
  Alert, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import ListContainer from '../components/ListContainer';
import AntDesign from '@expo/vector-icons/AntDesign';


const MemoScreen = () => {
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

  const TextEdit = (content) => {
    setText(content);
  };

  const CreateMemo = () => {
    const newMemo = {'id' : Date.now(), 'date' : selectedDay, 'memo': text, 'status': false};
    setMemos([...memos, newMemo]);
    setText('');
    setModalVisible(false);
  };

  const ToggleMemo = (id) => {
    setMemos(prevMemos => 
      prevMemos.map(memo => 
        memo.id === id ? { ...memo, status: !memo.status } : memo
      )
    );
  };

  const DeleteMemo = (id, memo) => {
    Alert.alert(
      `${memo}`,
      '삭제하겠습니까?',
      [{text: '취소', style: 'cancel'},
        {text: '삭제', onPress: () => setMemos(memos.filter((memo) => memo.id !== id))}
      ],
      {cancelable: true}
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.calendar}>
        <Calendar
          locale='ko'
          onDayPress={OnDayPress}
          markedDates={{
            [selectedDay]: {selected : true, selectedColor: 'red', selectedTextColor: 'white'}
          }}
          theme={{calendarBackground: 'black', dayTextColor: 'white', 
            monthTextColor: 'white', arrowColor: 'white'}}
        />
      </View>
      
      <View style={styles.memosArea}>
        <ScrollView>
          {memos.map((item) => (
            item.date === selectedDay ? 
              <ListContainer key={item.id}
                id={item.id} memo={item.memo} status={item.status}
                onComplete={ToggleMemo} onDelete={DeleteMemo}/>
             : null
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.addMemoBtn} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={56} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        >
        <View style={styles.modalCover}>
          <View style={styles.modalContainer}>
            <Text style={styles.textTitle}> {selectedDay} </Text>
            <TextInput style={styles.textArea} 
              editable={true} value={text} onChangeText={TextEdit}/>
            <View style={styles.btnArea}>
            
              <TouchableOpacity style={styles.btn} onPress={() => {setModalVisible(false)}}>
                <Text style={{color: 'red'}}> 취소 </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={CreateMemo}>
                <Text style={{color: 'green'}}> 등록 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calendar : {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    
  },

  memosArea: {
    flex: 3,
    width: '100%',
    paddingVertical: 10,
    marginTop: 20,
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
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
  },

  textTitle : {
    fontSize: 16,
    fontWeight: '600',
  },

  btnArea: {
    flexDirection: 'row',
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  }
});

export default MemoScreen;