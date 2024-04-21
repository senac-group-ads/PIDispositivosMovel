import { VStack,  Center, Radio} from 'native-base'
import { Input } from '../components/Input'
import { Select } from '../components/Select'

export function SigUp() {
    return (
        <VStack flex={1}>
            <Center mt={20}>
                <Input 
                    placeholder='Nome'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Senha'
                    secureTextEntry
                />
                <Input 
                    placeholder='Consfirmar senha'
                    secureTextEntry
                />
                <Input 
                    placeholder='Nome'
                    autoCapitalize='none'
                    
                />
                <Select />
                
            </Center>
        </VStack>
    );
}