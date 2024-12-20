import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import dbManger from '../utils/DbManger';
import ProgressStatus from '../utils/ProgressStatus';
import CircleGraph from '../components/CircleGraph';
import WiseSaying from '../utils/WiseSaying';
import ChangeColor from '../utils/ChangeColor';

import AntDesign from '@expo/vector-icons/AntDesign';

const HomeSreen = () => {
  // TestdaysData
  const [daysData, setDaysData] = useState({});
  
  const maxHeight = Math.max(...Object.values(daysData), 1);
  const wiseSayingLength = WiseSaying.length;
  const randomNumber = Math.floor(Math.random() * wiseSayingLength);

  const [memoStatus, setMemoStatus] = useState(0);

  const [bucketDo, setBucketDo] = useState(0);
  const [bucketDoComplete, setBucketDoComplete] = useState(0);
  const [bucketBuy, setBucketBuy] = useState(0);
  const [bucketBuyComplete, setBucketBuyComplete] = useState(0);

  const getToday = new Date();
  const getMonth = getToday.getMonth() + 1;
  
  useFocusEffect(
    useCallback(() => {
      const initMemos = async() =>{
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;

        const allMemos = await dbManger.getItemByMonth('memos', 'targetDate', yearMonth) || [];
        let done = 0;
        let total = 0;
        
        const tempDaysData = {'일': 0 , '월': 0, '화': 0, '수': 0, '목': 0, '금': 0, '토': 0};
        const dayNameIndex = ['일', '월', '화', '수', '목', '금', '토'];

        allMemos.forEach((memo) => {
          total ++;

          if (memo.complete === 1){
            const day = new Date(memo.targetDate);
            const dayName = dayNameIndex[day.getDay()];
            tempDaysData[dayName]++;
            done ++;
          }
        });
        
        const memoPercent = Math.round((done / total) * 100);
        const memoProgress = Math.floor(memoPercent / 5 ) * 5 || 0;

        setMemoStatus(memoProgress);
        setDaysData(tempDaysData);
      }

      const initBuckets = async() => {
        const allBuckets = await dbManger.getAllItem('bucketList') || [];
  
        let tempBucketDo = 0;
        let tempBucketDoComplete = 0;
        let tempBucketBuy = 0;
        let tempBucketBuyComplete = 0;
  
        allBuckets.forEach((item) => {
          if (item.do === 1) {
            tempBucketDo++;
            if (item.status === 1) {
              tempBucketDoComplete++;
            }
          } else {
            tempBucketBuy++;
            if (item.status === 1) {
              tempBucketBuyComplete++;
            }
          }
        });
  
        setBucketDo(tempBucketDo);
        setBucketDoComplete(tempBucketDoComplete);
        setBucketBuy(tempBucketBuy);
        setBucketBuyComplete(tempBucketBuyComplete);
      };
  
      initBuckets();
      initMemos();

    }, [])
  );

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Text style={{...styles.text, fontSize: 16}}> 
                " {WiseSaying[randomNumber].description} "
              </Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="aliwangwang-o1" size={50} color="#9146FF" />
              <Text style={{...styles.text, marginLeft: 20, fontSize: 16}}> - {WiseSaying[randomNumber].author} - </Text>
            </View>
        </View>

        <View style={styles.progress}>
          <View style={styles.progress}>
            <Text style={{...styles.text, fontSize: 18}}> {getMonth}월 메모 실천 지수 </Text>
          </View>
          <View style={styles.progress}>
            <Text style={{...styles.text, fontSize: 48, fontWeight: 800, 
              color: ChangeColor(memoStatus)}}>
              {memoStatus}% 
            </Text>
          </View>
          <View style={styles.progress}>
            <Text style={{...styles.text, fontSize: 16}}> {ProgressStatus[memoStatus]} </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={styles.bucketList}>
            <View style={styles.bucket}>
              <CircleGraph total={bucketDo} done={bucketDoComplete} title={'Do'}/>
            </View>

            <View style={styles.bucket}>
              <CircleGraph total={bucketBuy} done={bucketBuyComplete} title={'Buy'}/>
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={{...styles.text, textAlign: 'left', marginLeft: 20}}> 
            요일 별 실행 횟수
          </Text>

          <View style={styles.dayAnalysis}>
            { Object.keys(daysData).map((item, index) => (
                <View key={index} style={styles.chartArea}>
                  <View style={{flex: 9}}>
                    <View style={{flex: (1- daysData[item] / maxHeight), backgroundColor: 'transparent'}}/>

                    <Text style={{...styles.text, marginBottom: 3}}> 
                      {daysData[item]} 
                    </Text>

                    <View style={{flex: (daysData[item] / maxHeight), 
                      backgroundColor: ChangeColor((daysData[item] / maxHeight) * 100), 
                      borderRadius:10}}/>
                  </View>
                  <Text style={{...styles.text, flex:1}}> {item} </Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  progress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bucketList: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
  },

  bucket: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayAnalysis: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
  },

  chartArea: {
    justifyContent: 'center',
  }
})

export default HomeSreen;