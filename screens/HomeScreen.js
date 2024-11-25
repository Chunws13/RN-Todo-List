import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import ProgressStatus from '../utils/ProgressStatus';
import CircleGraph from '../components/CircleGraph';
import WiseSaying from '../utils/WiseSaying';

const HomeSreen = () => {
  // TestData
  const data = {'일': 6 , '월': 10, '화': 13, '수': 8, '목': 19, '금': 22, '토': 7};
  const maxHeight = Math.max(...Object.values(data));
  
  const wiseSayingLength = WiseSaying.length;
  const randomNumber = Math.floor(Math.random() * wiseSayingLength);

  const testStatus = Math.round(Math.random() * 100);
  const adjustProgress = Math.floor(testStatus / 5) * 5;

  return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Image source={require('../assets/pengu.png')} 
             style={{width: '100%'}} resizeMode='contain'/>
          </View>
          <View style={{flex: 2}}> 
            <Text style={{...styles.text, fontSize: 16, marginBottom: 10}}> 
              " {WiseSaying[randomNumber].description} "
            </Text>

            <Text style={styles.text}> - {WiseSaying[randomNumber].author} - </Text>
          </View>
        </View>

        <View style={styles.progress}>
          <View style={styles.progress}>
            <Text style={{...styles.text, fontSize: 18}}> 이번 달 메모 실천률 </Text>
          </View>
          <View style={{...styles.progress, flex: 2}}>
            <Text style={{...styles.text, fontSize: 76, fontWeight: 800, color: '#32CD32'}}> 
              {testStatus}% 
            </Text>
          </View>
          <View style={styles.progress}>
            <Text style={{...styles.text, fontSize: 16}}> {ProgressStatus[adjustProgress]} </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={styles.bucketList}>
            <View style={styles.bucket}>
              <CircleGraph total={25} done={17} title={'Do'}/>
            </View>

            <View style={styles.bucket}>
              <CircleGraph total={10} done={4} title={'Buy'}/>
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={{...styles.text, textAlign: 'left', marginLeft: 30}}> 
            요일 별 실행 횟수
          </Text>

          <View style={styles.dayAnalysis}>
            { Object.keys(data).map((item, index) => (
                <View key={index} style={styles.chartArea}>
                  <View style={{flex: 9}}>
                    <View style={{flex: (1- data[item] / maxHeight), backgroundColor: 'transparent'}}/>

                    <Text style={{...styles.text, marginBottom: 3}}> 
                      {data[item]} 
                    </Text>

                    <View style={{flex: (data[item] / maxHeight), 
                      backgroundColor: '#4F4F4F', borderRadius:10}}/>
                  </View>
                  <Text style={{...styles.text, flex:1}}> {item} </Text>
                </View>
              ))
            }
          </View>
        </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#000000',
  },

  text : {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  header : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  progress : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bucketList : {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
  },

  bucket : {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayAnalysis: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
  },

  chartArea: {
    justifyContent: 'center',
    
  }
})

export default HomeSreen;