import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView,
    Alert, TextInput, TouchableOpacity } from 'react-native';

import ListContainer from "../components/ListContainer";
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const BucketList = () => {
	const [testSet, setTestSet] = useState([
		{"id": 1, 'content': "칼바람 10판 하기", "do": true, 'status': false},
		{"id": 2, 'content': "버킷리스트 만들기", "do": true, 'status': false},
		{"id": 3, 'content': "바람의나라 하기", "do": true, 'status': false},
		{"id": 4, 'content': "트랙 패드 사기", "do": false, 'status': false},
		{"id": 5, 'content': "옷 구경하기", "do": false, 'status': false},
	]);

	const [selected, setSelected] = useState(true);
	const [bucketText, setBucketText] = useState("");

	const EidtBucket = (event) => {
		setBucketText(event);
	}

	const ToggleContent = (id) => {
    setTestSet(prevMemos => 
      prevMemos.map(memo => 
        memo.id === id ? { ...memo, status: !memo.status } : memo
      )
    );
  };

	const DeleteContent = (id, content) => {
    Alert.alert(
      `${content}`,
      '삭제하겠습니까?',
      [{text: '취소', style: 'cancel'},
        {text: '삭제', onPress: () => setTestSet(testSet.filter((memo) => memo.id !== id))}
      ],
      {cancelable: true}
    );
  };

	const AddContent = () => {
		const newContent = {"id": Date.now(), "content": bucketText, "do": selected, 'status': false}
		setTestSet([...testSet, newContent]);
		setBucketText('');
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleArea}>
				<Text style={styles.titleText}> Bucket List </Text>
			</View>

			<View style={styles.classify}>

				<TouchableOpacity onPress={() => setSelected(true)}>
					<View style={styles.classifyContainer}>
						<FontAwesome6 name="plane-departure" size={36} color={selected ? 'white': 'grey'}/>
						
						<Text style={selected ? styles.classifyText 
										: {...styles.classifyText, color: '#4F4F4F'}}> 
							Do
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setSelected(false)}>
					<View style={styles.classifyContainer}>
						<Fontisto name="shopping-bag-1" size={36} color={selected ? '#4F4F4F': 'white'}/>
						<Text style={selected ? {...styles.classifyText, color: '#4F4F4F'} 
										: styles.classifyText}> 
							Buy 
						</Text>
					</View>
				</TouchableOpacity>

			</View>
			<View>
				<TextInput style={styles.inputField} onSubmitEditing={AddContent}
					value={bucketText} onChangeText={EidtBucket}/>
			</View>

			<View style={styles.scrollContainer}>
				<ScrollView>
					{testSet.map((item) => (
						item.do === selected ? <ListContainer key={item.id}
							id={item.id} memo={item.content} status={item.status}
							onComplete={ToggleContent} onDelete={DeleteContent}/> : null
					))}
				</ScrollView>
			</View>
			
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    container: {
			flex: 1,
			backgroundColor: 'black',
    },
    titleArea : {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
    },

    titleText: {
			fontSize: 36,
			color: 'white',
			fontWeight: '800',
    },
    classify: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginHorizontal: 60,
			marginBottom: 20,
    },
    classifyContainer: {
			justifyContent: 'center',
			alignItems: 'center',
    },

    classifyText: {
			marginTop: 5,
			color: 'white',
			fontSize: 18,

    },
    inputField: {
			paddingHorizontal: 20,
			paddingVertical: 10,
			marginHorizontal: 40,
			backgroundColor: 'white',
			borderRadius: 20,
    },
    scrollContainer: {
      flex: 4,
			marginTop: 30,
			marginHorizontal: 10,
    }
})

export default BucketList