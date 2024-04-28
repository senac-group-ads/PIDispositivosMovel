import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Center, Heading, Link } from 'native-base'
import { Input } from '../components/Input';
import { Button } from '../components/Button';

/*
* Pagina de login
*/

import LogoSvg from '../assets/Logo.svg';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

export function Sigin() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
      navigation.navigate('signUp');
    }

    return (
        <VStack flex={1}>
            {/* Box da tela com logo e texto de login */}
            <Box width="100%" height={80} bg='blue.100'> 

                <Box my={16} mx={9}>
                    <LogoSvg/>
                </Box>

                <Center>

                    <Heading color='blue.300' fontSize='xl' fontFamily='heading'>
                        Faça seu login
                    </Heading>
                    
                </Center>
            </Box>

            {/* Parte dos inpunts para login e senha */}
            <Center my={20}>
                <Input 
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <Input 
                    placeholder='Senha'
                    secureTextEntry
                />

                <Button variant={"solid"} title='Entra'/>

                <Link onPress={handleNewAccount} my={4} >
                    Não possui cadastra
                </Link>
            </Center>
               
        </VStack>
    );
}