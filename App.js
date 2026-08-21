import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const GRADIENTS = [
  '#0f172a', // Dark Navy
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#10b981', // Emerald Green
  '#f59e0b', // Amber/Gold
  '#ef4444', // Red
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('https://zonqrtools.kalvivaanam.in/qrcode.html');
  const [activeTab, setActiveTab] = useState('standard'); // 'standard' or 'premium'
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#0f172a');

  const handleGenerate = () => {
    if (!inputText.trim()) {
      Alert.alert('பிழை', 'தயவுசெய்து ஏதேனும் URL அல்லது டெக்ஸ்ட் உள்ளிடவும்!');
      return;
    }
    setQrValue(inputText.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Text style={styles.title}>QR Studio Pro</Text>
        <Text style={styles.subtitle}>Professional QR Code Generator</Text>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'standard' && styles.activeTab]}
            onPress={() => {
              setActiveTab('standard');
              setBgColor('#ffffff');
              setFgColor('#0f172a');
            }}>
            <Text style={[styles.tabText, activeTab === 'standard' && styles.activeTabText]}>
              Standard QR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'premium' && styles.activeTabGold]}
            onPress={() => {
              setActiveTab('premium');
              setBgColor('#0f172a');
              setFgColor('#fbbf24');
            }}>
            <Text style={[styles.tabText, activeTab === 'premium' && styles.activeTabTextGold]}>
              ✨ Premium Style
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Box */}
        <View style={styles.card}>
          <Text style={styles.label}>Enter URL or Text:</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com"
            placeholderTextColor="#94a3b8"
            value={inputText}
            onChangeText={setInputText}
          />

          {/* Premium Style Color Options */}
          {activeTab === 'premium' && (
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Background Style:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorRow}>
                {GRADIENTS.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color },
                      bgColor === color && styles.selectedSwatch,
                    ]}
                    onPress={() => setBgColor(color)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity
            style={activeTab === 'premium' ? styles.btnGold : styles.btnBlue}
            onPress={handleGenerate}>
            <Text style={activeTab === 'premium' ? styles.btnTextDark : styles.btnText}>
              {activeTab === 'premium' ? '✨ Generate Premium QR' : 'Generate QR Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* QR Output Preview Area */}
        <View style={styles.qrContainer}>
          <View style={[styles.qrBox, { backgroundColor: bgColor }]}>
            <QRCode
              value={qrValue}
              size={200}
              color={fgColor}
              backgroundColor={bgColor}
            />
            {/* Watermark Logic from your website */}
            <Text style={[styles.watermark, { color: activeTab === 'premium' ? '#94a3b8' : '#64748b' }]}>
              Created with QR Studio Pro
            </Text>
            <Text style={[styles.watermarkLink, { color: activeTab === 'premium' ? '#fbbf24' : '#2563eb' }]}>
              https://zonqrtools.kalvivaanam.in/qrcode.html
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  activeTabGold: {
    backgroundColor: '#fbbf24',
  },
  tabText: {
    color: '#94a3b8',
    fontWeight: '700',
    fontSize: 13,
  },
  activeTabText: {
    color: '#ffffff',
  },
  activeTabTextGold: {
    color: '#1a0000',
  },
  card: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  colorRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  colorSwatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSwatch: {
    borderColor: '#ffffff',
  },
  btnBlue: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnGold: {
    backgroundColor: '#fbbf24',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  btnTextDark: {
    color: '#1a0000',
    fontWeight: '700',
    fontSize: 15,
  },
  qrContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  qrBox: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  watermark: {
    fontSize: 10,
    marginTop: 15,
    fontWeight: '500',
  },
  watermarkLink: {
    fontSize: 10,
    fontWeight: '700',
  },
});
