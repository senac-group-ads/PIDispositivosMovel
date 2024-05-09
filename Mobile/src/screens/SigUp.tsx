import { useNavigation } from '@react-navigation/native';
import { VStack,  Center, Box, ScrollView} from 'native-base'
import { useForm, Controller } from 'react-hook-form'

import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'

import LogoSvg from '../assets/Logo.svg';
import { AuthNavigatorRoutesProps } from '../routes/auth.routes';


export function SigUp() {
    const { control, handleSubmit } = useForm()
    function handleSignUp(data: any) {
       console.log(data)
    }

    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    function handleGoBack() {
      navigation.navigate('signIn');
    }
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
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='password'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                placeholder='Senha'
                                secureTextEntry
                                onChange={onChange}
                                value={value}
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
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='select'
                        render={( {field: { onChange, value }}) => (
                            <Select onValueChange={intemValue => onChange(intemValue)}/>
                        )}
                    />

                    <Controller
                        control={control}
                        name='cep'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                mt={4}
                                placeholder='Cep'
                                autoCapitalize='none'
                                onChange={onChange}
                                value={value}
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
                                onChange={onChange}
                                value={value}
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
                                onChange={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                            />
                        )}
                    />

                    <Button variant={'solid'} title='Criar' onPress={handleSubmit(handleSignUp)}/>

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