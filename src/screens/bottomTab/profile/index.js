import React, { useEffect } from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import styles from "./Profile.styles";
import { useAppSelector } from "../../../../store/hook";

const HorizontalLine = () => {
    return <View style={styles.line} />;
};

const Profile = () => {
    const user = useAppSelector(state => state.profile.data);

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.container}>
                    <Image
                        source={require('../../../assets/imgs/user.png')}
                        style={styles.icon}
                    />
                </View>
                <Text style={styles.title}>Hello {user.firstName}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.heading}>Name</Text>
                <Text style={styles.bottomText}>{user.firstName} {user.lastName}</Text>
            </View>
            <HorizontalLine />

            <View style={styles.card}>
                <Text style={styles.heading}>Email</Text>
                <Text style={styles.bottomText}>{user.email}</Text>
            </View>
            <HorizontalLine />

            <View style={styles.card}>
                <Text style={styles.heading}>Phone Number</Text>
                <Text style={styles.bottomText}>{user.phoneNo}</Text>
            </View>
            <HorizontalLine />

            <View style={styles.card}>
                <Text style={styles.heading}>Gender</Text>
                <Text style={styles.bottomText}>{user.gender}</Text>
            </View>
            <HorizontalLine />
            <View style={styles.card}>
                <Text style={styles.heading}>Logged in as</Text>
                <Text style={styles.bottomText}>{user.loginType}</Text>
            </View>

        </View>
    )
}

export default Profile;