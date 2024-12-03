import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen({ navigation }) {
    return (
        <LinearGradient colors={['#141E30', '#243B55']} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>About Me</Text>
                <Text style={styles.text}>Full Name: Jemish Kevadiya</Text>
                <Text style={styles.text}>Student ID: 101410211</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        height: '40%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 80,
    },
    text: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 50,
        textAlign: 'center',
    },
});
