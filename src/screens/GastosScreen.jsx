import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


import HeaderUsuario from '../components/HeaderUsuario'

export default function GastosScreen({userName}) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className="flex-1 bg-[#F7E7CE]" edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: Math.max(insets.bottom + 90, 110),
            paddingTop: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <HeaderUsuario
            userName={userName}
            onAbrirAjustes={() => setProfileModalVisible(true)}
          />

        
        </ScrollView>    
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
