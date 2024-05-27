import { Platform  } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import HomeSvg from '../assets/Home.svg'
import OngSvg from '../assets/Ong.svg'
import ProfileSvg from '../assets/Proffile.svg'
import PetSvg from '../assets/Pet.svg'

type AppRoutes = {
    home: undefined;
    listPets: {listPetType?: string | null};
    listOng:  {listOngType?: string | null};
    profile: undefined;
    createPet: undefined;
    petDescription: {listPetId: string};
    ongDescription: {listOngId: string};
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

import { Home } from "../screens/Home";
import { CreatePet } from "../screens/CreatePet";
import { ListPets } from "../screens/ListPets";
import { ListOng } from "../screens/ListOng";
import { OngDescription } from "../screens/OngDescription";
import { PetDescription } from "../screens/PetDescription";
import { Profile } from "../screens/Profile";

export function AppRoutes(){
    const { sizes, colors } = useTheme();

    const icoSize = sizes[6]
    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.blue[500],
            tabBarInactiveTintColor: colors.gray[400],
            tabBarStyle: {
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6],
            },
            tabBarShowLabel: false,
        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={icoSize} height={icoSize}/>
                    )
                }}
            />
            <Screen
                name="listPets"
                component={ListPets}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PetSvg fill={color} width={icoSize} height={icoSize}/>
                    )
                }}
            />
            <Screen
                name="listOng"
                component={ListOng}
                options={{
                    tabBarIcon: ({ color }) => (
                        <OngSvg fill={color} width={icoSize} height={icoSize}/>
                    )
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={icoSize} height={icoSize}/>
                    )
                }}
            />

            <Screen
                name="createPet"
                component={CreatePet}
                options={{ tabBarButton: () => null}}
            />

            <Screen
                name="petDescription"
                component={PetDescription}
                options={{ tabBarButton: () => null}}
            />
            <Screen
                name="ongDescription"
                component={OngDescription}
                options={{ tabBarButton: () => null}}
            />
        </Navigator>
    );
}