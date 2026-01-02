import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/Config';

export default function AuthScreen({ onLoginSuccess }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
      if (isLogin) onLoginSuccess(res.data.token);
      else Alert.alert("Başarılı", "Kayıt oldun, şimdi giriş yap.");
    } catch (e) {
      Alert.alert("Hata", "İşlem başarısız.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title={isLogin ? "Giriş" : "Kayıt Ol"} onPress={handleAuth} />
      <Text onPress={() => setIsLogin(!isLogin)} style={{marginTop: 20, color: 'blue'}}>
        {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten üye misin? Giriş Yap"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 }
});