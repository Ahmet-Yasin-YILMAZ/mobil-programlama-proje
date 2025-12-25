import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar } from 'react-native';

/**
 * Presentation Layer: React Native UI Implementation 
 * Öğrenci: Ahmet Yasin YILMAZ 
 */
export default function App() {
  const todos = [
    { id: '1', title: 'React Native UI Tamamlandı', status: 'DONE' },
    { id: '2', title: 'API Entegrasyonu Kontrol Edildi', status: 'OPEN' },
    { id: '3', title: 'Zod ile Form Validasyonu Hazır', status: 'OPEN' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Todo App</Text>
        <Text style={styles.headerSubtitle}>Ahmet Yasin YILMAZ - Presentation Layer</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.todoCard}>
            <View style={[styles.statusIndicator, { backgroundColor: item.status === 'DONE' ? '#4CAF50' : '#FFC107' }]} />
            <Text style={[styles.todoText, item.status === 'DONE' && styles.todoDone]}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 30, backgroundColor: '#6200EE', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, elevation: 5 },
  headerTitle: { fontSize: 26, color: '#FFFFFF', fontWeight: 'bold' },
  headerSubtitle: { fontSize: 13, color: '#E1E1E1', marginTop: 5 },
  listContent: { padding: 20 },
  todoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  statusIndicator: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  todoText: { fontSize: 16, color: '#333' },
  todoDone: { textDecorationLine: 'line-through', color: '#888' }
});