import { useNavigation } from "@react-navigation/native";
import { VStack, Box, Center, Heading, Link } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'


import { Input } from '../components/Input';
import { Button } from '../components/Button';

import LogoSvg from '../assets/Logo.svg';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes'

/*
* Pagina de login
*/

type formDataProps = {
    email: string
    password: string
}

const logInSchema = yup.object({
    email: yup.string().required('E-mail é obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha é obrigatória')
}) // tipagem dos dados do formulario

export function Sigin() {
    const { control, handleSubmit, formState: { errors }} = useForm<formDataProps>({
        resolver: yupResolver(logInSchema)
    }) // Controle do formulario

    function handleSigIn({ email, password }: formDataProps) {
        console.log(email, password)
    } // função que pega o que esta no formulario para repassar para a api

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
      navigation.navigate('signUp');
    }

    return (
        <VStack flex={1}>
            {/* Box da tela com logo e texto de login */}
            <Box width="100%" height={80} bg='blue.100'> 

                <Box my={16} mx={9}>
                    <LogoSvg width={48} height={48}/>
                </Box>

                <Center>

                    <Heading color='blue.300' fontSize='xl' fontFamily='heading'>
                        Faça seu login
                    </Heading>
                    
                </Center>
            </Box>

            {/* Parte dos inpunts para login e senha */}
            <Center my={20}>
                <Controller
                    control={control}
                    name="email"
                    render={( {field: {onChange, value}}) => (
                        <Input 
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.email?.message}
                        />
                    ) }
                />

                <Controller
                    control={control}
                    name="password"
                    render={( {field: {onChange, value}}) => (
                        <Input 
                            placeholder='Senha'
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.email?.message}
                        />
                    ) }
                />

                <Button variant={"solid"} title='Entra' onPress={handleSubmit(handleSigIn)}/>

                <Link onPress={handleNewAccount} my={4} >
                    Não possui cadastra
                </Link>
            </Center>
               
        </VStack>
    );
}