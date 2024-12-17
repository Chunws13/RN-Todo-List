import { Modal, View, Text, StyleSheet,
  TextInput, TouchableOpacity } from "react-native";

const ModalView = ({
  visible, selectedDay, text, textChange,
  onCancel, onCreate }) => {
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      >
      <View style={styles.modalCover}>
        <View style={styles.modalContainer}>
          <Text style={styles.textTitle}> {selectedDay} </Text>
          <TextInput style={styles.textArea} 
            editable={true} value={text} onChangeText={textChange}/>
          <View style={styles.btnArea}>
          
            <TouchableOpacity style={styles.btn} onPress={onCancel}>
              <Text style={{color: 'red', fontWeight: 'bold'}}> 취소 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={onCreate}>
              <Text style={{color: 'green', fontWeight: 'bold'}}> 등록 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '20%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },

  textArea: {
    width: '100%',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 10,
  },

  textTitle : {
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnArea: {
    flexDirection: 'row',
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }
});

export default ModalView;