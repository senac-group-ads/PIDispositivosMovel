import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Sigin } from '../screens/Sigin'
import { SigUp } from '../screens/SigUp'

type AuthRoutes = {
    signIn: undefined;
    signUp: undefined;
  }
  
  export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;
  
  const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen 
                name="signIn"
                component={Sigin}
            />

            <Screen 
                name="signUp"
                component={SigUp}
            />
        </Navigator>
    )
}