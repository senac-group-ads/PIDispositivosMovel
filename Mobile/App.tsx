import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Nunito_400Regular} from '@expo-google-fonts/nunito'
import { Loading } from './src/components/Loading';

import { THEME } from './src/theme/index'
import { Sigin } from './src/screens/Sigin';

export default function App() {
  const [fontsLoaded] = useFonts({Nunito_400Regular});

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="default"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Sigin /> : <Loading /> }
    </NativeBaseProvider>
  );
}
