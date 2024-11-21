import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const ListContainer = ({ memoid, memo, status, tableName, column,
  onEdit, onDelete }) => {

  const newValue = (1 + status) % 2;
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(memo);

  const StartEditText = (event) => {
    setEditText(event);
  }

  const SubmitEdit = (tableName, column, newValue, memoid) => {
    onEdit(tableName, column, newValue, memoid);
    setEditing(false);
  }

  return (
      <TouchableOpacity style={styles.memoBox} 
        onPress={() => {
          console.log(`${tableName} ${newValue}, ${memoid}`)
          onEdit(tableName, 'complete', newValue, memoid)
          }}>
          { editing ?
            <View style={styles.memoContainer}>

              <TextInput style={styles.eachMemoFalse} onChangeText={StartEditText}>
                {editText}
              </TextInput>

              <TouchableOpacity style={{flex: 2}} 
                onPress={() => SubmitEdit(tableName, column, editText, memoid)}>
                <AntDesign name="checkcircle" size={24} color="#32CD32"/>
              </TouchableOpacity>
            </View>
            
            :
            <View style={styles.memoContainer}>
              <Text style={status ? styles.eachMemoTrue : styles.eachMemoFalse}>
                {memo}
              </Text> 
              <TouchableOpacity style={{flex: 1}} onPress={() => setEditing(true)}>
                <AntDesign name="edit" size={24} color="#32CD32"/>
              </TouchableOpacity>

              <TouchableOpacity style={{flex: 1}} onPress={() => onDelete(memoid, memo)}>
                <FontAwesome name="trash-o" size={24} color="red"/>
              </TouchableOpacity>

            </View>
          }
      </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  memoBox : {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#4F4F4F',
  },

  memoContainer: {
    flexDirection: 'row',
    width: '100%',
  },

  eachMemoFalse: {
    flex: 6,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },

  eachMemoTrue: {
    flex: 6,
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'line-through',
  },
});

export default ListContainer;