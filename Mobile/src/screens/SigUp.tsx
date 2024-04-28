import { useNavigation } from '@react-navigation/native';
import { VStack,  Center, Box} from 'native-base'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'

import LogoSvg from '../assets/Logo.svg';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';

export function SigUp() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleGoBack() {
      navigation.navigate('signIn');
    }
    return (
        <VStack flex={1}>

            <Box mt={16} mx={9}>
                <LogoSvg/>
            </Box>

            <Center mt={8}>
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

                <Select />

                <Input
                    mt={4}
                    placeholder='Cep'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Nº'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Contato'
                    autoCapitalize='none'
                />

                <Button variant={'solid'} title='Criar'/>

                <Button 
                    title='Retornar'
                    onPress={handleGoBack}
                    variant={'outline'}
                />
                
            </Center>
        </VStack>
    );
}