import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text } from 'react-native';
import { useState } from 'react';

const CircleGraph = ({ total, done}) => {
  const progressValue = Math.round(done / total * 100)
  let barColor = 'red';

  if (progressValue >= 60) {
    barColor = 'green';
  } else if ((progressValue >= 30)) {
    barColor = 'orange';
  }

  return (
    <AnimatedCircularProgress
      size={160}
      width={15}
      fill={progressValue}
      tintColor={barColor}
      backgroundColor='grey'
      lineCap='round'
      duration={1000}
      style={{ transform: [{ rotate: '-90deg' }] }}
      >
      {(fil) => (
        <Text style={{color: 'white', 
          fontSize: 21, fontWeight: 600,
          transform: [{ rotate: '90deg' }]}}> { `${done} / ${total}` } </Text>
      )}
    </AnimatedCircularProgress>
  );
};



export default CircleGraph;