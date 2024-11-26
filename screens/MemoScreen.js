import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView,
  Alert, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dbManger from '../utils/DbManger';

import ModalView from '../components/Modal';
import ListContainer from '../components/ListContainer';
import AntDesign from '@expo/vector-icons/AntDesign';

const MemoScreen = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(todayString);
  
  const [memos, setMemos] = useState([]);
    
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const tableName = 'memos';

  const columns = [
    {name: 'targetDate', type: 'TEXT'}, 
    {name: 'memo', type: 'TEXT'}, 
    {name: 'complete', type: 'INTEGER'}
  ]
  
  useEffect(() => {
    const createDB = async(tableName, columns) => {
      await dbManger.createTable(tableName, columns);
    }

    createDB(tableName, columns);
  }, [])

  useEffect(()=> {
    const getAllDB = async() => {
      const items = await dbManger.getAllItem(tableName);
      setMemos(items || []);
    }

    const DropDB = async(tableName) => {
      await dbManger.dropTable(tableName);
    }

    getAllDB();

    return () => {
      // DropDB(tableName);
    }

  }, []);

  const OnDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const TextEdit = (content) => {
    setText(content);
  };

  const CreateMemo = async() => {
    if (text.replaceAll(' ', '').length > 0){
      const newMemo = {targetDate: selectedDay, memo: text, complete: 0}
      const result = await dbManger.insertItem(tableName, newMemo);
      const newResult = await dbManger.getItem(tableName, 'id', result);
      
      setMemos(prevmemos => [...prevmemos, ...newResult]);
      
      setText('');
      setModalVisible(false);

    } else {
      Alert.alert(
        '1자 이상 입력하세요',
        '공백 제외',
        [{text: '확인'}]
      );
    }
  };

  const EditMemo = async(tableName, column, newValue, id) => {
    try {
      const result = await dbManger.updateItem(tableName, column, newValue, id);
      const editResult = await dbManger.getItem(tableName, "id", result);
      
      setMemos(prevmemos => {
        return prevmemos.map(memo => (memo.id === result ? editResult[0] : memo));
      })
  
    } catch(error) {
      console.log(error);
    }
  };

  const CancelMemoEdit = () => {
    setText('');
    setModalVisible(false);
  }

  const DeleteMemo = (id, memo) => {
    Alert.alert(
      `${memo}`,
      '삭제하겠습니까?',
      [{text: '취소', style: 'cancel'},
        {text: '삭제', onPress: async() => {
          const result = await dbManger.deleteItem(tableName, id);
          setMemos(memos.filter((memo) => memo.id !== result));
        }
      }],
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
          {memos.map((item, index) => {
            return item.targetDate === selectedDay ? 
              <ListContainer 
                key={index} memoid={item.id} memo={item.memo} 
                status={item.complete} tableName={tableName} column={'memo'}
                onEdit={EditMemo} onDelete={DeleteMemo}/>
             : null
            })}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.addMemoBtn} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={56} color="white" />
      </TouchableOpacity>
      
      <ModalView visible={modalVisible} selectedDay={selectedDay}
        text={text} textChange={TextEdit}
        onCancel={CancelMemoEdit} onCreate={CreateMemo}/>
      

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

  
});

export default MemoScreen;