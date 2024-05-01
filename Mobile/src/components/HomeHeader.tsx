import { HStack } from "native-base";

import LogoSvg from '../assets/Logo.svg';
import { SearchBar } from "./SearchBar";

export function HomeHeader() {
    return(
        <HStack mt={6} ml={6} alignItems={"center"}>
            <LogoSvg width={48} height={48}/>
            <SearchBar />
        </HStack>
    );
}