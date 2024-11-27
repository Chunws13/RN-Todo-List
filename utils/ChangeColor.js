
export default ChangeColor = (number) => {
  if (number >= 60) {
    return '#32CD32';
  } else if (number >= 30) {
    return '#FFA500';
  } else {
    return '#FF4C4C';
  };
};