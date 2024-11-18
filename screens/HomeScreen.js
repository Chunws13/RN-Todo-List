import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import CircleGraph from '../components/CircleGraph';
import WiseSaying from '../utils/WiseSaying';

const HomeSreen = () => {
  // TestData
  const data = {'일': 6 , '월': 10, '화': 13, '수': 8, '목': 19, '금': 22, '토': 7};
  const maxHeight = Math.max(...Object.values(data));
  
  const wiseSayingLength = WiseSaying.length;
  const randomNumber = Math.floor(Math.random() * wiseSayingLength);

  return (
      <SafeAreaView style={styles.container}>

        <View style={styles.monthly}>
          <View style={{flex: 2}}>
            <Image source={require('../assets/pengu.png')} 
             style={{height: '100%'}} resizeMode='contain'/>
          </View>
          <View style={{flex: 1}}> 
            <Text style={{...styles.text, fontSize: 16, marginBottom: 10}}> 
              " {WiseSaying[randomNumber].description} "
            </Text>

            <Text style={styles.text}> - {WiseSaying[randomNumber].author} - </Text>
          </View>
        </View>

        <View style={styles.monthly}>
          <Text style={styles.text}> 이번 달 한 일들 개수 표기</Text>
        </View>

        <View style={styles.bucketList}>
          <View style={styles.bucket}>
            <Text style={{...styles.text, marginBottom: 10}}> 버킷리스트 </Text>
            <CircleGraph total={25} done={17}/>
          </View>

          <View style={styles.bucket}>
            <Text style={{...styles.text, marginBottom: 10}}> 버킷리스트 - 살것 </Text>
            <CircleGraph total={10} done={4}/>
          </View>
        </View>

        <View style={styles.dayAnalysis}>
          { Object.keys(data).map((item) => (
              <View style={styles.chartArea}>
                <View style={{flex: 9}}>
                  <View style={{flex: (1- data[item] / maxHeight), backgroundColor: 'transparent'}}/>
                  <Text style={{...styles.text, textAlign: 'center', marginBottom: 3}}> {data[item]} </Text>
                  <View style={{flex: (data[item] / maxHeight), 
                    backgroundColor: 'grey', borderRadius:10}}/>
                </View>
                <Text style={{...styles.text, flex: 1, textAlign: 'center'}}> {item} </Text>
              </View>
            ))
          }
        </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: 'black',
  },

  text : {
    color: 'white',
    textAlign: 'center',
  },
  monthly : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },

  bucketList : {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
  },

  bucket : {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
  },

  dayAnalysis: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },

  chartArea: {
    justifyContent: 'center',
    
  }
})

export default HomeSreen;