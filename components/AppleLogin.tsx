import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const handleAppleLogin = async () => {
    try {
      if (Platform.OS === 'ios') {
        const appleCredential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        const { identityToken, email, fullName } = appleCredential;

        if (identityToken) {
          const res = await axios.post('https://01d7-2405-201-e015-707b-2419-e8fc-7f83-9259.ngrok-free.app/auth/apple', {
            token: identityToken,
            email,
            name: fullName?.givenName + ' ' + fullName?.familyName,
          });

          Alert.alert('Login Successful', JSON.stringify(res.data));
        }
      } else {
        console.log("Simulated Apple Login");

        const appleCredential = {
          identityToken: 'mocked-jwt-token',
          email: 'mockedemail@example.com',
          fullName: { givenName: 'John', familyName: 'Doe' },
        };

        const res = await axios.post('https://b594-2405-201-e015-707b-3de8-5c98-1b57-5e68.ngrok-free.app/auth/apple', {
          token: appleCredential.identityToken,
          email: appleCredential.email,
          name: appleCredential.fullName.givenName + ' ' + appleCredential.fullName.familyName,
        });

        Alert.alert('Simulated Login Success', JSON.stringify(res.data));
      }
    } catch (err) {
      console.log('Apple Login Error:', err);
      Alert.alert('Login Error', err?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.platformText}>Platform: {Platform.OS}</Text>

      {Platform.OS === 'ios' ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={8}
          style={styles.appleButton}
          onPress={handleAppleLogin}
        />
      ) : (
        <TouchableOpacity style={styles.customAppleButton} onPress={handleAppleLogin}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png' }}
            style={styles.logo}
          />

          <Text style={styles.customButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  platformText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  appleButton: {
    width: 250,
    height: 44,
  },
  customAppleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logo: {
    width: 22,
    height: 22,
    tintColor: '#fff',
    marginRight: 10,
  },
  customButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
