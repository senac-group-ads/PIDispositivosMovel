import { useNavigation } from '@react-navigation/native';
import { VStack,  Center, Box, ScrollView, Text, useToast } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../services/api'

import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'

import LogoSvg from '../assets/Logo.svg';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';
import { Alert } from 'react-native';
import { AppErrors } from '../utils/appErrors';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type formDataProps = {
    name: string
    email: string
    password: string
    passwordConfirm: string
    numero: string
    cep: string
    contato: string
    roleBody: string
}

const sigUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mai').email('E-mail inválido.'),
    password:  yup.string().required('Informe a senha'),
    passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
    cep: yup.string().required('Informe o Cep'),
    numero: yup.string().required('Informe o numero ou complemento da casa'),
    contato: yup.string().required('Informe qual o seu numero de contato'),
    roleBody: yup.string().required('Selecione um tipo de usuario')
}) // tipagem dos dados do formulario


export function SigUp() {
    const [isLoading, setIsLoading] = useState(false)
    const { signIn } = useAuth()
    const toast = useToast()
    const { control, handleSubmit, formState: { errors } } = useForm<formDataProps>({
        resolver: yupResolver(sigUpSchema),
    }) // Controle do formulario

    async function handleSignUp({ name, email, password, passwordConfirm, cep, numero, contato, roleBody }: formDataProps) {
        if ( password !== passwordConfirm ) {
            Alert.alert('A confirmação da senha não confere')
            return;
        }
       try {
        // AVISO: No arquivo api.ts é preciso mudar o ip conforme ip da maquina utilizada!!!
        setIsLoading(true)
        const resposta = await api.post('/user/create', {
            name,
            email,
            password,
            cep,
            numero,
            contato,
            roleBody
        })
        console.log(resposta.status)

        if (resposta.status === 200) {
            await signIn(email, password)
        }

       } catch(err) {
        setIsLoading(false)
        
        const isAppError = err instanceof AppErrors;
        const title = isAppError ? err.message : 'Não foi possivel criar a conta.'
        toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
        })
       }
    } // função que pega o que esta no formulario para repassar para a api

    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    function handleGoBack() {
      navigation.navigate('signIn');
    } // função que retona para o login
    
    return (
        <ScrollView> 
            <VStack flex={1}>

                <Box mt={16} mx={9}>
                    <LogoSvg width={48} height={48}/>
                </Box>
                
                <Center mt={8}>
                    <Controller
                        control={control}
                        name='name'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                            placeholder='Nome'
                            autoCapitalize='none'
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.name?.message}
                        />
                        )}
                    />

                    <Controller
                        control={control}
                        name='email'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='password'
                        rules={{
                            pattern: {
                                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?!.*\s).{8,}$/,
                                message: 'A senha não corresponde aos requisitos do sistema'
                            }
                        }}
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='passwordConfirm'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='Confirme a senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.passwordConfirm?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='roleBody'
                        render={( {field: { onChange, value }}) => (
                            <Select 
                                onValueChange={intemValue => onChange(intemValue)}
                            />
                        )}
                    />

                    <Text color={'red.400'}>{errors.roleBody?.message}</Text>

                    <Controller
                        control={control}
                        name='cep'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                mt={4}
                                placeholder='Cep'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.cep?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='numero'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='Nº'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.numero?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='contato'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='contato'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                errorMessage={errors.contato?.message}
                                returnKeyType='send'
                            />
                        )}
                    />

                    <Button 
                        variant={'solid'} 
                        isLoading={isLoading}
                        title='Criar' 
                        onPress={handleSubmit(handleSignUp)}
                    />

                    <Button 
                        title='Retornar'
                        onPress={handleGoBack}
                        variant={'outline'}
                    />
                    
                </Center>
            </VStack>
        </ScrollView>
    );
}