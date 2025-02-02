import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView,
  Alert, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import dbManger from '../utils/DbManger';

import ModalView from '../components/Modal';
import ListContainer from '../components/ListContainer';
import AntDesign from '@expo/vector-icons/AntDesign';
import LocaleKr from '../utils/LocaleKr';

LocaleConfig.locales['kr'] = LocaleKr;
LocaleConfig.defaultLocale = 'kr';

const MemoScreen = () => {
  
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const [getMonth, setGetMonth] = useState(`${year}-${month.toString().padStart(2, '0')}`)

  const [selectedDay, setSelectedDay] = useState(todayString);
  
  const [memos, setMemos] = useState([]);
  const [memoMark, setMemoMark] = useState({});

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const tableName = 'memos';
  
  useEffect(()=> {
    const getMonthDB = async() => {
      
      const items = await dbManger.getItemByMonth(tableName, 'targetDate', getMonth);
      setMemos(items || []);
    };

    getMonthDB();
  }, [getMonth]);

  useEffect(() => {
    const MakeMark = () => {
      const dateTotalMemos = {};
      const dateDoneMemos = {};

      memos.forEach((item) => {
        if (item.targetDate in dateTotalMemos) {
          dateTotalMemos[item.targetDate]++;
          
        } else {
          dateTotalMemos[item.targetDate] = 1;
          dateDoneMemos[item.targetDate] = 0;
        };

        if (item.complete === 1){
          dateDoneMemos[item.targetDate]++;
        };  
      });

      const markDatesInfo = {};

      Object.keys(dateTotalMemos).map((item, index) => {
        let dotColor = '#FFA500';

        if (dateTotalMemos[item] === dateDoneMemos[item]) {
          dotColor = '#32CD32';
        
        } else if (dateDoneMemos[item] === 0){
          dotColor = '#FF4C4C';
        };

        markDatesInfo[item] = {dots: [{key: index, color: dotColor}]};
      });

      setMemoMark(markDatesInfo);
    }
    MakeMark();

  }, [memos]);

  const OnDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const TextEdit = (content) => {
    setText(content);
  };

  const CreateMemo = async() => {
    if (text.replaceAll(' ', '').length > 0){
      try{
        const newMemo = {targetDate: selectedDay, memo: text, complete: 0}
        const result = await dbManger.insertItem(tableName, newMemo);
        const newResult = await dbManger.getItem(tableName, 'id', result);
        
        setMemos(prevmemos => [...prevmemos, ...newResult]);
        
        setText('');
        setModalVisible(false);
      } catch(error) {
        Alert.alert(
          '에러가 발생했습니다.',
          error,
          [{text: '확인'}]
        );
      }

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
      Alert.alert(
        '에러가 발생했습니다.',
        error,
        [{text: '확인'}]
      );
    }
  };

  const CancelMemoEdit = () => {
    setText('');
    setModalVisible(false);
  };

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

  const ChangeMonth = (month) => {
    setGetMonth(`${month.year}-${month.month}`);
    setSelectedDay(month.dateString);
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          locale='ko'
          onDayPress={OnDayPress}
          onMonthChange={ChangeMonth}
          markingType='multi-dot'
          markedDates={{
            ...memoMark, 
            [selectedDay]: {
              ...memoMark[selectedDay],
              selected: true,
              selectedColor: 'transparent',
              selectedTextColor: '#9146FF',
            } 
          }}
          theme={{calendarBackground: 'black', dayTextColor: 'white', 
            monthTextColor: 'white', arrowColor: 'white'}}
        />
      </View>
      
      <View style={styles.memosArea} accessible={true} accessibilityLabel='memoContainer'>
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

    </View>
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
    flex: 2,
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