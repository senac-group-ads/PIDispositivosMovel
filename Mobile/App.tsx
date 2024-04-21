import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Nunito_400Regular, Nunito_700Bold} from '@expo-google-fonts/nunito'
import { Loading } from './src/components/Loading';

import { THEME } from './src/theme/index'
import { SigUp } from './src/screens/SigUp';

export default function App() {
  const [fontsLoaded] = useFonts({Nunito_400Regular, Nunito_700Bold});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="default"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <SigUp /> : <Loading /> }
    </NativeBaseProvider>
  );
}
