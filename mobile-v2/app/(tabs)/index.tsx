import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, StyleSheet, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../constants/Config';

export default function App() {
  // Hafızada token, userId ve görevleri tutuyoruz
  const [auth, setAuth] = useState<{token: string, userId: string, initialTasks: any[]} | null>(null);
  const isDark = useColorScheme() === 'dark';

  if (!auth) {
    return <AuthScreen onLoginSuccess={(token: string, userId: string, tasks: any[]) => {
      // KRİTİK DÜZELTME: Gelen görevleri auth state'ine ekliyoruz
      setAuth({ token, userId, initialTasks: tasks });
    }} isDark={isDark} />;
  }

  // HomeScreen'e yüklenen görevleri gönderiyoruz
  return <HomeScreen auth={auth} onLogout={() => setAuth(null)} isDark={isDark} />;
}

// --- GİRİŞ EKRANI ---
function AuthScreen({ onLoginSuccess, isDark }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      const path = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await axios.post(`${API_URL}${path}`, { email, password });
      
      if (isLogin) {
        // Backend'den gelen res.data.tasks'i onLoginSuccess ile yukarı gönderiyoruz
        onLoginSuccess(res.data.token, res.data.userId, res.data.tasks || []);
      } else {
        Alert.alert("Başarılı", "Kayıt oldunuz, şimdi giriş yapın.");
        setIsLogin(true);
      }
    } catch (e: any) {
      Alert.alert("Hata", e.response?.data?.error || "Bağlantı sorunu.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</Text>
      <TextInput 
        placeholder="E-posta" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        autoCorrect={false} 
        style={[styles.input, { color: isDark ? '#FFF' : '#000', borderBottomColor: isDark ? '#444' : '#ccc' }]} 
      />
      <TextInput 
        placeholder="Şifre" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={[styles.input, { color: isDark ? '#FFF' : '#000', borderBottomColor: isDark ? '#444' : '#ccc' }]} 
      />
      <Button title={isLogin ? "GİRİŞ" : "KAYIT OL"} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{marginTop: 20}}>
        <Text style={{color: '#007AFF', textAlign: 'center'}}>
          {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten üye misin? Giriş Yap"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// --- ANA EKRAN ---
function HomeScreen({ auth, onLogout, isDark }: any) {
  // KRİTİK DÜZELTME: State'i veritabanından gelen görevlerle başlatıyoruz
  const [tasks, setTasks] = useState<any[]>(auth.initialTasks || []);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
  const [aiRoadmap, setAiRoadmap] = useState<any>(null);

  // Veritabanı Senkronizasyonu
  const syncWithDB = async (updatedTasks: any[]) => {
    try {
      await axios.post(`${API_URL}/api/tasks/sync`, { userId: auth.userId, tasks: updatedTasks });
    } catch (e) {
      console.log("DB Senkronizasyon Hatası");
    }
  };

  const handleSave = () => {
    if (!text) return;
    let newTasks;
    if (editingId) {
      newTasks = tasks.map(t => t.id === editingId ? { ...t, title: text } : t);
      setEditingId(null);
    } else {
      newTasks = [...tasks, { id: Date.now().toString(), title: text, date: new Date().toLocaleDateString('tr-TR') }];
    }
    setTasks(newTasks);
    syncWithDB(newTasks); 
    setText('');
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    syncWithDB(newTasks);
  };

  const fetchRoadmap = async (id: string, title: string) => {
    setLoadingTaskId(id);
    try {
      const res = await axios.post(`${API_URL}/api/roadmap`, { title });
      setAiRoadmap({ title, steps: res.data.roadmap });
    } catch (e: any) {
      Alert.alert("AI Hatası", "Plan alınamadı.");
    } finally {
      setLoadingTaskId(null);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>Görevler</Text>
        <TouchableOpacity onPress={onLogout}><Text style={{color: 'red', fontWeight: 'bold'}}>Çıkış</Text></TouchableOpacity>
      </View>

      <View style={[styles.inputBox, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
        <TextInput 
          value={text} 
          onChangeText={setText} 
          placeholder="Görev yaz..." 
          autoCapitalize="none" 
          autoCorrect={false} 
          style={[styles.input, { color: isDark ? '#FFF' : '#000', borderBottomColor: isDark ? '#444' : '#ccc' }]} 
        />
        <Button title={editingId ? "GÜNCELLE" : "EKLE"} onPress={handleSave} color={editingId ? "orange" : "#007AFF"} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.taskCard, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
            <View style={{flex: 1}}>
              <Text style={{color: isDark ? '#FFF' : '#000', fontWeight: 'bold'}}>{item.title}</Text>
              <TouchableOpacity onPress={() => fetchRoadmap(item.id, item.title)} disabled={loadingTaskId !== null}>
                <Text style={{color: '#5856D6', marginTop: 10, fontWeight: 'bold'}}>
                  {loadingTaskId === item.id ? "⏳ Planlanıyor..." : "✨ AI Yol Haritası"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{gap: 12, marginLeft: 10}}>
              <TouchableOpacity onPress={() => { setEditingId(item.id); setText(item.title); }}>
                <Text style={{color: 'orange', fontWeight: 'bold'}}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={{color: 'red', fontWeight: 'bold'}}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* AI Modal */}
      <Modal visible={aiRoadmap !== null} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#FFF' : '#000' }]}>{aiRoadmap?.title}</Text>
            {aiRoadmap?.steps?.map((s: string, i: number) => (
              <Text key={i} style={{ color: isDark ? '#CCC' : '#333', marginVertical: 8, fontSize: 16 }}>{i+1}. {s}</Text>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setAiRoadmap(null)}>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  inputBox: { padding: 15, borderRadius: 15, marginBottom: 20, elevation: 4 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8, fontSize: 16 },
  taskCard: { padding: 20, borderRadius: 15, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { padding: 30, borderRadius: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  closeBtn: { marginTop: 25, backgroundColor: '#007AFF', padding: 12, borderRadius: 10, alignItems: 'center' }
});