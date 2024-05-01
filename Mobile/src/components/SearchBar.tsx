import { VStack, Input, Icon } from "native-base";

import SearchIcon from '../assets/searchIcon.svg';

export function SearchBar() {
    return (
        <VStack my={12} space={5} w="50%" maxW="50px">
            <Input placeholder="Search" variant="filled" width="100px" borderRadius="10" py="1" px="2" borderColor={"gray.300"}
            InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<SearchIcon width="15px"/>}/>}  />
        </VStack>
    );
}