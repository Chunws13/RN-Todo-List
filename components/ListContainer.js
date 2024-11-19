import React from "react"
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const ListContainer = ({ id, memo, status, onComplete, onDelete }) => {

    return (
        <TouchableOpacity key={id} style={styles.memoBox} onPress={() => onComplete(id)}>
            <Text style={status ? styles.eachMemoTrue : styles.eachMemoFalse} 
                key={id}>
                {`${memo}`}
            </Text>

            <TouchableOpacity style={{flex: 1}} onPress={() => console.log('수정')}>
                <AntDesign name="edit" size={24} color="#32CD32"/>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1}} onPress={() => onDelete(id, memo)}>
                <FontAwesome name="trash-o" size={24} color="red"/>
            </TouchableOpacity>
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