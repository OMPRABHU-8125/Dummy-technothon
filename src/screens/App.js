import React from "react";
import {
    View,
    Text
} from 'react-native';
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import EventUpdate from "./EventUpdate/EventUpdate";
import Detail from "./EventUpdate/Detail";
import AddEvent from "./EventUpdate/AddEvent";
import AboutUs from "./AboutUs";
import Attendance from "./attendance/Attendance";
import DailyAttendance from "./attendance/DailyAttendance";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "../../store";
import CompletedEvent from "./EventUpdate/CompletedEvent";

const stack = createNativeStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    
                    
                    <stack.Screen
                        name='Home'
                        component={Home}
                        options={{ headerShown: false }}
                    />
                     
                    
                    <stack.Screen
                        name='SignUp'
                        component={SignUp}
                        options={{ headerShown: false }}
                    />
                     <stack.Screen
                        name='EventUpdate'
                        component={EventUpdate}
                        options={{ headerShown: false }}
                        />
                    <stack.Screen
                        name='AboutUs'
                        component={AboutUs}
                        options={{ headerShown: true }}
                    />
                    
                       <stack.Screen
                        name='Attendance'
                        component={Attendance}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='DailyAttendance'
                        component={DailyAttendance}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Detail'
                        component={Detail}
                        options={{ headerShown: false }}
                    />
                     <stack.Screen
                        name='AddEvent'
                        component={AddEvent}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='CompletedEvent'
                        component={CompletedEvent}
                        options={{ headerShown: false }}
                    />

                </stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App;
