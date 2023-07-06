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
import CompletedEvent from "./EventUpdate/CompletedEvent";
import AboutUs from "./aboutus/AboutUs";
import Facultyload from "./facultyload/Facultyload";
import Attendance from "./attendance/Attendance";
import DailyAttendance from "./attendance/DailyAttendance";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "../../store";
import Alumni from "./alumni/Alumni";
import Enquiry, { Feedback, Query } from "./EnquiryManagement";
import StationarySupply from "./stationarySupply/StationarySupply";
import Details from "./stationarySupply/Details";
import Cart from "./stationarySupply/Cart";
import Fees from "./fees/Fees";
import Splash from "./splash";

import HolidayCalendar from './holidayCalendar/HolidayCalendar';
import FAQ from "./FAQs/faqs";
import Profile from "./bottomTab/profile";
import Notifications from "./bottomTab/notifications";
import ContactUs from "./bottomTab/contactUs";
import FitnessAndHealth from "./fitnessandhealth/FitnessAndHealth";

const stack = createNativeStackNavigator();
const tab = createBottomTabNavigator();

const MyHome = () => {
    return (
        <tab.Navigator>
            <tab.Screen
                name='Home'
                component={Home}
                options={{ headerShown: false }}
            />
            <tab.Screen
                name='Notifications'
                component={Notifications}
                options={{ headerShown: true }}
            />
            <tab.Screen
                name='ContactUs'
                component={ContactUs}
                options={{ headerShown: false }}
            />
            <tab.Screen
                name='Profile'
                component={Profile}
                options={{ headerShown: true }}
            />
        </tab.Navigator>
    )
}
const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator>
                    <stack.Screen
                        name='splash'
                        component={Splash}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='HomeScreen'
                        component={MyHome}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='SignUp'
                        component={SignUp}
                        options={{ headerShown: false }}
                    />
                    <stack.Screen
                        name='Alumni'
                        component={Alumni}
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
                        name='EventUpdate'
                        component={EventUpdate}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='AddEvent'
                        component={AddEvent}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='Detail'
                        component={Detail}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='CompletedEvent'
                        component={CompletedEvent}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='Queries/Feedback'
                        component={Enquiry}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Query'
                        component={Query}
                        options={{ headerShown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Feedback'
                        component={Feedback}
                        options={{ headerShown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Facultyload'
                        component={Facultyload}
                        options={{ headerShown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Stationary'
                        component={StationarySupply}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Details'
                        component={Details}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Cart'
                        component={Cart}
                        options={{ headerShown: false }}>
                    </stack.Screen>
                    <stack.Screen
                        name='Fees'
                        component={Fees}
                        options={{ headershown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='HolidayCalendar'
                        component={HolidayCalendar}
                        options={{ headerShown: true }}
                    />
                    <stack.Screen
                        name='FAQ'
                        component={FAQ}
                        options={{ headershown: true }}>
                    </stack.Screen>
                    <stack.Screen
                        name='FitnessAndHealth'
                        component={FitnessAndHealth}
                        options={{ headerShown: true }}
                    />
                </stack.Navigator>
            </NavigationContainer>
        </Provider>

    )
}

export default App;
