import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ChangeColor from '../utils/ChangeColor';

const CircleGraph = ({ total, done, title}) => {
  const [progressValue, setProgressValue] = useState(0);
  const [barColor, setBarColor] = useState('#FF4C4C');

  useFocusEffect(
    useCallback(() => {
      const updatedProgressValue = Math.round((done / total) * 100);
      setProgressValue(updatedProgressValue);

      // Update bar color based on progress
      setBarColor(ChangeColor(updatedProgressValue));
    }, [done, total]) // Dependencies: Re-run when `done` or `total` changes
  );

  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={progressValue}
      tintColor={barColor}
      backgroundColor='#4F4F4F'
      lineCap='round'
      duration={1000}
      style={{ transform: [{ rotate: '-90deg' }] }}
      >
      {(fil) => (
        <View style={{justifyContent: 'center', 
          alignItems: 'center', transform: [{ rotate: '90deg' }]}}>
            
          <Text style={{color:'white', fontSize: 16}}>
            {title}
          </Text>

          <Text style={{color: 'white', fontSize: 21, fontWeight: 600}}> 
            { `${done} / ${total}` } 
          </Text>

        </View>
      )}
    </AnimatedCircularProgress>
  );
};



export default CircleGraph;