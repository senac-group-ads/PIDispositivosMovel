import { VStack, Box} from 'native-base'

import LogoSvg from '../assets/Logo.svg';

export function Sigin() {
    return (
        <VStack flex={1}>
            <Box
                width="100%"
                height="350px"
                bg='blue.100'
            />
               
            <LogoSvg />
        </VStack>
    );
}