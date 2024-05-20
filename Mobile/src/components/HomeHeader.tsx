import { HStack, Icon } from "native-base";

import teste from '../assets/logout.svg'

import LogoSvg from '../assets/Logo.svg';
import { SearchBar } from "./SearchBar";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/useAuth";

export function HomeHeader() {
    const { signOut } = useAuth();
    return(
        <HStack mt={6} alignItems={"center"} justifyContent={'space-around'} w={'full'}>
            <HStack alignItems={"center"}>
                <LogoSvg width={48} height={48}/>
                <SearchBar />
            </HStack>
            <TouchableOpacity onPress={ signOut }>
                <Icon
                width={48}
                height={48}
                as={teste}
                name="logout"
                color="black"
                size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}