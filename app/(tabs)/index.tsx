import AppleLogin from '@/components/AppleLogin';
import GoogleLogin from '@/components/GoogleLogin';
import MicrosoftLogin from '@/components/MicrosoftLogin';
import WhatsappLogin from '@/components/WhatsappLogin';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Multi-Login Screen</Text>
        
        <View style={styles.loginBox}>
          <WhatsappLogin/>
        </View>

        <View style={styles.loginBox}>
          <AppleLogin />
        </View>

        <View style={styles.loginBox}>
          <MicrosoftLogin />
        </View>
        
        <View style={styles.loginBox}>
          <GoogleLogin />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  loginBox: {
    marginVertical: 20,
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
});
