import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('start');

  const handleSendCode = async () => {
    try {
      await axios.post('https://b594-2405-201-e015-707b-3de8-5c98-1b57-5e68.ngrok-free.app/whatsapp/send-code', { phone });
      alert('OTP sent to WhatsApp!');
      setStep('code');
    } catch (err) {
      alert(err?.response?.data?.message || 'Error sending code: ' + err.message);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post('https://b594-2405-201-e015-707b-3de8-5c98-1b57-5e68.ngrok-free.app/whatsapp/verify-code', { phone, code });
      alert(res.data.message);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error verifying code: ' + err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {step === 'start' && (
        <TouchableOpacity style={styles.whatsappLoginButton} onPress={() => setStep('phone')}>
          <View style={styles.logoButtonContent}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' }}
              style={styles.logo}
            />
            <Text style={styles.whatsappLoginText}>Login with WhatsApp</Text>
          </View>
        </TouchableOpacity>
      )}

      {step === 'phone' && (
        <>
          <Text style={styles.label}>Enter Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. +91XXXXXXXXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'code' && (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#25D366',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  whatsappLoginButton: {
    backgroundColor: '#25D366',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#25D366',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  logoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  whatsappLoginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
