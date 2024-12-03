import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
    Keyboard,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

export default function MainScreen() {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [destinationCurrency, setDestinationCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [error, setError] = useState('');

    const fetchExchangeRate = async () => {
        try {
            setError('');
            setConvertedAmount('');
            const base = baseCurrency.trim().toUpperCase();
            const destination = destinationCurrency.trim().toUpperCase();

            if (!base || !destination || !amount) {
                setError('All fields are required');
                return;
            }

            if (isNaN(amount) || parseFloat(amount) <= 0) {
                setError('Enter a valid amount greater than 0');
                return;
            }

            const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest`, {
                params: {
                    apikey: 'fca_live_aqrmbVOOC9SHsbYV1G4zX7IaZLl3KgGUCB76Xfb5',
                    base_currency: base,
                },
            });

            const rates = response.data.data;
            if (rates && rates[destination]) {
                const rate = rates[destination];
                setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
            } else {
                setError('Invalid destination currency code');
            }
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Unable to fetch exchange rates. Please try again later.');
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <LinearGradient colors={['#141E30', '#243B55']} style={styles.background}>
                    <View style={styles.innerContainer}>


                        <Text style={styles.label}>Base Currency Code:</Text>
                        <TextInput
                            style={styles.input}
                            value={baseCurrency}
                            onChangeText={(text) => setBaseCurrency(text.toUpperCase())}
                            placeholder="Enter base currency (e.g., USD)"
                            placeholderTextColor="#777"
                        />

                        <Text style={styles.label}>Destination Currency Code:</Text>
                        <TextInput
                            style={styles.input}
                            value={destinationCurrency}
                            onChangeText={(text) => setDestinationCurrency(text.toUpperCase())}
                            placeholder="Enter destination currency (e.g., EUR)"
                            placeholderTextColor="#777"
                        />

                        <Text style={styles.label}>Amount:</Text>
                        <TextInput
                            style={styles.input}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="Enter amount"
                            placeholderTextColor="#777"
                        />

                        <TouchableOpacity style={styles.button} onPress={fetchExchangeRate}>
                            <Text style={styles.buttonText}>Convert</Text>
                        </TouchableOpacity>

                        {convertedAmount ? (
                            <Text style={styles.result}>
                                {amount} {baseCurrency} = {convertedAmount} {destinationCurrency}
                            </Text>
                        ) : null}

                        {error ? <Text style={styles.error}>{error}</Text> : null}
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        padding: 10,
        marginBottom: 16,
        borderRadius: 8,
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    result: {
        fontSize: 18,
        marginTop: 20,
        color: '#00FF00',
        textAlign: 'center',
    },
    error: {
        fontSize: 16,
        marginTop: 10,
        color: '#FF4500',
        textAlign: 'center',
    },
});
