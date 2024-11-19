import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View } from 'react-native';
import { useState } from 'react';

const CircleGraph = ({ total, done, title}) => {
  const progressValue = Math.round(done / total * 100)
  let barColor = '#FF4C4C';

  if (progressValue >= 60) {
    barColor = '#32CD32';
  } else if ((progressValue >= 30)) {
    barColor = '#FFA500';
  }

  return (
    <AnimatedCircularProgress
      size={160}
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