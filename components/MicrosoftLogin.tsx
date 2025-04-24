import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const handleMicrosoftLogin = async () => {
    const tenant = 'd2408d49-35c3-4baf-a889-f417764eae80';
    const clientId = '96823082-e8b7-4c2a-84e3-c4fefab5090d';
    const redirectUri = 'https://b594-2405-201-e015-707b-3de8-5c98-1b57-5e68.ngrok-free.app/auth/microsoft/callback';

    const authUrl = `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=openid profile email offline_access User.Read`;

    const result = await WebBrowser.openBrowserAsync(authUrl);
    console.log('Microsoft login response:', result);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.msButton} onPress={handleMicrosoftLogin}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png',
            }}

            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Sign in with Microsoft</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  msButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0078D4',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
