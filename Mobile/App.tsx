import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito'
import { Loading } from './src/components/Loading';

import { THEME } from './src/theme/index'
import { Routes } from './src/routes/index';
import { AuthContext } from './src/contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({Nunito_400Regular, Nunito_700Bold, Nunito_500Medium});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="default"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider value={{
        user: {
          id: '1',
          name: 'Marcos',
          email: 'marcos@marcos.com',
          cep: '21040360',
          numero: '4365',
          contato: '219999999',
          role: 'Ong',
          avata: 'marcos.png'
        }
      }}>
        {fontsLoaded ? <Routes /> : <Loading /> }
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
