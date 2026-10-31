import { View, Text, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';


export default function BienvenidaScreen({ onComenzar }) {
    return (
        <ImageBackground
            source={require('../../assets/Fondo_libertad.jpg')}
            className="flex-1 w-full h-full"
            resizeMode="cover"
        >
            <StatusBar style="light" />

            <LinearGradient
                colors={['transparent', 'rgba(10, 15, 26, 0.65)', 'rgba(10, 15, 26, 0.95)']}
                locations={[0.4, 0.7, 1]}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '65%' }}
            />

            <SafeAreaView className="flex-1 justify-between px-7 pt-4 pb-8">

                <View className="flex-row items-center pt-2">
                    <Text className="text-lg font-bold tracking-tight text-black shadow-sm">
                        GastosApp
                    </Text>
                </View>

                <View className="w-full pb-2">
                    <Text className="text-[38px] font-black text-white tracking-tight leading-[46px] mb-3">
                        Tus Metas,{'\n'}
                        <Text className="text-amber-400">Tu Libertad.</Text>
                    </Text>

                    <Text className="text-base text-gray-200 font-normal leading-relaxed mb-8 max-w-[320px]">
                        Llevar el control de tus gastos diarios es el primer paso para cumplir tus vacaciones y proyectos soñados.
                    </Text>

                    <Pressable
                        className="w-full py-4 rounded-2xl items-center justify-center shadow-2xl bg-amber-500 active:bg-gray-100"
                        onPress={onComenzar}
                    >
                        <Text className="font-bold text-white tracking-wide">
                            Comenzar
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

