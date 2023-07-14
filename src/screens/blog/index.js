import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    ImageBackground
} from 'react-native';
import styles from './blog.styles';
import firestore from '@react-native-firebase/firestore';
import { useAppSelector } from '../../../store/hook';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as COLORS from '../../utils/color'

const Blog = ({ navigation }) => {
    const user = useAppSelector(state => state.profile.data)
    const [blogData, setBlogData] = useState([]);
    const [selectedPost, setSelectedPost] = useState([]);
    const [showFullContent, setShowFullContent] = useState(false);
    const [comments, setComments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const getData = async () => {
        try {
            const snapshot = await firestore().collection('Blog').get();

            const fetchedDocuments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const sortedDocuments = fetchedDocuments.sort((a, b) => b.postedOn.toDate() - a.postedOn.toDate());

            setBlogData(sortedDocuments);

        } catch (error) {
            console.log(error);
        }
    }

    const openModal = async (id) => {
        try {
            const snapshot = await firestore().collection('Blog').get();
            const postData = snapshot.data();

            setComments(postData);
            console.log(comments)
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const deleteItem = () => {
        try {
            const documentRef = firestore().collection('Blog').doc(selectedPost);
            documentRef.delete();
            Alert.alert("Success", "Post deleted :(");
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    const handleDelete = (postId) => {
        setSelectedPost(postId);
        Alert.alert(
            "Warning",
            "Are you sure you want to delete this AWESOME blog",
            [
                {
                    text: "Yes, I'm sure",
                    onPress: deleteItem,
                    style: 'destructive',
                },
                {
                    text: "No, Cancel",
                    style: 'cancel',
                }
            ],
            { cancelable: false }
        );
    }


    useEffect(() => {
        getData();
    }, []);

    const renderBlog = ({ item }) => {


        const toggleShowFullContent = () => {
            setShowFullContent(!showFullContent);
        };

        return (
            <View style={styles.outercard}>
                <View style={styles.card1}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        {
                            (user.email === item.author.email) ?
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Icon name={'delete'} size={26} color={'black'} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                    <Text style={styles.post}>
                        {showFullContent ? item.post : `${item.post.slice(0, 100)}...`}
                    </Text>
                    {item.post.length > 100 && (
                        <TouchableOpacity onPress={toggleShowFullContent}>
                            <Text style={styles.readMore}>
                                {showFullContent ? "Read Less" : "Read More"}
                            </Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.name}>@{item.author.name}</Text>
                    <Text style={styles.date}>{item.postedOn.toDate().toLocaleDateString()}</Text>
                    <TouchableOpacity onPress={() => openModal(item.id)}>
                        <Text style={styles.name}>View Comments</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/imgs/blog.png')}
                style={styles.image}
            />
            <Text style={styles.heading}>Our Blogs...</Text>
            <FlatList
                data={blogData}
                keyExtractor={(item) => item.id}
                renderItem={renderBlog}
            />
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Icon name="close" size={26} color="black" />
                    </TouchableOpacity>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <Text style={styles.commentText}>{item.text}</Text>
                                <Text style={styles.commentDate}>{item.createdAt.toDate().toLocaleString()}</Text>
                            </View>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Blog;