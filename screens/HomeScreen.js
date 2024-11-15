import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const HomeSreen = () => {
  // TestData
  const data = { '일': 6 , '월': 10, '화': 13, '수': 8, '목': 19, '금': 22, '토': 7};
  const maxHeight = Math.max(...Object.values(data));

  const TestLogic = (event) => {
      setTt(event);
  };

  return (
      <SafeAreaView style={styles.container}>

        <View style={styles.monthly}> 
          <Text style={styles.text}> 미정 </Text>
        </View>

        <View style={styles.monthly}>
          <Text style={styles.text}> 이번 달 한 일들 개수 표기</Text>
        </View>

        <View style={styles.bucketList}>
          <View style={styles.bucket}>
            <Text style={styles.text}> 버킷 리스트 - 할일 </Text>
          </View>

          <View style={styles.bucket}>
            <Text style={styles.text}> 버킷리스트 - 살것 </Text>
          </View>
        </View>

        <View style={styles.dayAnalysis}>
          { Object.keys(data).map((item) => (
              <View style={styles.chartArea}>
                <Text style={{...styles.text, flex: 1}}> {data[item]} </Text>
                <View style={{flex: 5 , backgroundColor: 'red', height: "10%"}}/>
                <Text style={{...styles.text, flex: 1}}> {item} </Text>
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
    color: 'white'
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
    justifyContent: 'flex-end'
  }
})

export default HomeSreen;