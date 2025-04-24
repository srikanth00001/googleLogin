import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '285066937903-muhi613ti38s5v5g4gf5m9gs614iv2vi.apps.googleusercontent.com',
    androidClientId: '285066937903-ii7e3mqp7490fcfb5apb5cms6mjckiun.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const id_token = response.authentication?.idToken;
      
      axios.post('https://b594-2405-201-e015-707b-3de8-5c98-1b57-5e68.ngrok-free.app/auth/google', { id_token })
        .then(res => {
          console.log('Backend JWT:', res.data.token);
        })
        .catch(err => console.error('Error:', err));
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => promptAsync()}
    />
  );
}
