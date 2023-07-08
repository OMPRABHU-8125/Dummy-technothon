import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Alert, SafeAreaView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './enquiry.styles';
import { useAppDispatch } from '../../../store/hook';
import { setModules, setUserProfile } from '../../../store/slice/profileSlice';
import modules from '../Modules';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Enquiry = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Query");
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>Post a Query</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Feedback");
        }}
          style={styles.button}>
          <Text style={styles.buttonText}>Send FeedBack</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )

};

export default Enquiry;



export const Query = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [showQueryType, setShowQueryType] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryTypes = ['Fee related Query', 'Admission related Query', 'Syllabus Related Query', 'Another Query Type'];
  const dispatch = useAppDispatch();
  
  const toggleQueryType = () => {
    setShowQueryType(!showQueryType);
  };

  const handleQueryTypeSelection = (selectedType) => {
    setType(selectedType);
    setShowQueryType(false);
  };

  const submitData = async () => {
    if (!type || !description || !email|| !password) {
      Alert.alert("error","Please enter email and password, write your Query");
    } else {
      const users = firestore().collection('Users');

            const querySnanpshot = await users
                .where('email', '==', email)
                .where('password', '==', password)
                .get();
            if (querySnanpshot.size == 1) {
                console.log("Logged In")
                const user = querySnanpshot.docs[0].data();
                dispatch(setUserProfile(user));
                const filtered = modules.filter((module) =>
                    module.login.includes(user.loginType));

                dispatch(setModules(filtered));


                await AsyncStorage.setItem("userData", JSON.stringify(user))
                await firestore().collection('Query').add({
                  Email: email,
                  Password: password,
                  Type: type,
                  Description: description,
                });
                setEmail('');
                setPassword('');
                setType('');
                setDescription('');
                Alert.alert('Query submitted');
            }

            else {
                Alert.alert("Error", "User not found");
            }
    }
  };

  return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <TextInput
            name="Email"
            style={styles.content}
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            placeholderTextColor="black"
          />
          <TextInput
            name="Password"
            style={styles.content}
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            placeholderTextColor="black"
            secureTextEntry
          />
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <TouchableOpacity onPress={toggleQueryType}>
                <Text style={styles.heading}>
                  Query Type
                  {showQueryType ? <Text style={styles.arrowIcon}>▲</Text> : <Text style={styles.arrowIcon}>▼</Text>}
                </Text>
              </TouchableOpacity>
            </View>
            {showQueryType && (
              <View style={styles.queryTypeContainer}>
                {queryTypes.map((queryType) => (
                  <TouchableOpacity
                    key={queryType}
                    onPress={() => handleQueryTypeSelection(queryType)}
                  >
                    <Text style={styles.queryType}>{queryType}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <TextInput
            name="Description"
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={value => setDescription(value)}
            placeholderTextColor="black"
            multiline
            numberOfLines={6}
          />

          <TouchableOpacity
            onPress={submitData}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    
  );
};

export const Feedback = () => {
  const [Description, setFeedbackDescription] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const submitData = async () => {
    if (!Description || !email|| !password) {
      Alert.alert("error","Please enter email and password, write your feedback");
    } else {
      const users = firestore().collection('Users');

            const querySnanpshot = await users
                .where('email', '==', email)
                .where('password', '==', password)
                .get();
            if (querySnanpshot.size == 1) {
                console.log("Logged In")
                const user = querySnanpshot.docs[0].data();
                dispatch(setUserProfile(user));
                const filtered = modules.filter((module) =>
                    module.login.includes(user.loginType));

                dispatch(setModules(filtered));


                await AsyncStorage.setItem("userData", JSON.stringify(user))
                const feedbackData = {
                  Email: email,
                  Password: password,
                  Description: Description
                };
                await firestore().collection("Feedback").add(feedbackData);
                setEmail('');
                setPassword('');
                setFeedbackDescription("");
                Alert.alert("Feedback submitted");
            }

            else {
                Alert.alert("Error", "User not found");
            }
    }
  }

  const handleFeedbackChange = (value) => {
    setFeedbackDescription(value);
  }

  return (
    
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            name="Email"
            style={styles.content}
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
            placeholderTextColor="black"
          />
          <TextInput
            name="Password"
            style={styles.content}
            placeholder="Password"
            value={password}
            onChangeText={value => setPassword(value)}
            placeholderTextColor="black"
            secureTextEntry
          />
          <TextInput
            name="Description"
            style={styles.input}
            placeholder="Description"
            value={Description}
            onChangeText={handleFeedbackChange}
            placeholderTextColor="black"
            multiline
            numberOfLines={6}
          />

          <TouchableOpacity
            onPress={submitData}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  );
}
