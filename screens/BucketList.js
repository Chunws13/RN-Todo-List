import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView,
    Alert, TextInput, TouchableOpacity } from 'react-native';

import dbManger from "../utils/DbManger";
import ListContainer from "../components/ListContainer";
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const BucketList = () => {
	const [buckets, setBuckets] = useState([
		{"id": 1, 'content': "칼바람 10판 하기", "do": 1, 'status': 0},
		{"id": 2, 'content': "버킷리스트 만들기", "do": 1, 'status': 0},
		{"id": 3, 'content': "바람의나라 하기", "do": 1, 'status': 0},
		{"id": 4, 'content': "트랙 패드 사기", "do": 0, 'status': 0},
		{"id": 5, 'content': "옷 구경하기", "do": 0, 'status': 0},
	]);

	const [selected, setSelected] = useState(1);
	const [bucketText, setBucketText] = useState("");

	const tableName = 'bucketList';
	const columns = [
		{name: 'content', type: 'TEXT'},
		{name: 'do', type: 'INTEGER'},
		{name: 'status', type: 'INTEGER'},
	]

	useEffect(() => {
		const createDB = async() => {
			await dbManger.createTable(tableName, columns);
		};

		const getAllBucekts = async() => {
			const allItem = await dbManger.getAllItem(tableName);
			console.log(allItem)
			setBuckets(allItem);
		}

		createDB();
		getAllBucekts();

	}, [])

	const AddContent = async() => {
		if (bucketText.replaceAll(' ', '').length > 0){
			const newContent = {"content": bucketText, "do": selected, 'status': 0}

      const result = await dbManger.insertItem(tableName, newContent);
      const newResult = await dbManger.getItem(tableName, 'id', result);
      // 메모 작성 시 UI 새로고침 확인
      setBuckets(prevBuckets => [...prevBuckets, ...newResult]);
      
      setBucketText('');

    } else {
      Alert.alert(
				'1자 이상 입력하세요',
				'공백 제외',
				[{text: '확인'}]
			);
		}
	};

	const EditContent = async(tableName, column, newValue, contentId) => {
    try {
      const result = await dbManger.updateItem(tableName, column, newValue, contentId);
      const editResult = await dbManger.getAllItem(tableName, 'id', result);

      setBuckets(prevBuckets => {
        return prevBuckets.map(bucket => (bucket.id === result ? editResult[0] : bucket));
      });


    } catch(error) {
      console.log(error);
    }
  };

	const DeleteContent = (id, content) => {
    Alert.alert(
      `${content}`,
      '삭제하겠습니까?',
      [{text: '취소', style: 'cancel'},
        {text: '삭제', onPress: async() => {
          const result = await dbManger.deleteItem(tableName, id);
          setBuckets(buckets.filter((memo) => memo.id !== result));
        }}
      ],
      {cancelable: true}
    );
  };

  const EidtBucket = (event) => {
		setBucketText(event);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.titleArea}>
				<Text style={styles.titleText}> Bucket List </Text>
			</View>

			<View style={styles.classify}>

				<TouchableOpacity onPress={() => setSelected(1)}>
					<View style={styles.classifyContainer}>
						<FontAwesome6 name="plane-departure" size={36} color={selected ? 'white': 'grey'}/>
						
						<Text style={selected ? styles.classifyText 
							: {...styles.classifyText, color: '#4F4F4F'}}> 
							Do
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setSelected(0)}>
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
					{buckets.map((item, index) => (
						item.do === selected ? 
							<ListContainer key={index}
							memoid={item.id} memo={item.content} status={item.status}
							tableName={tableName} column={'content'}
							onEdit={EditContent} onDelete={DeleteContent}/> : null
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