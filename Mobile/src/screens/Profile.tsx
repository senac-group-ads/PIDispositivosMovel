import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, VStack, Image, Skeleton, Text, Center, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";

import avataUserDefault from '../assets/userPhotoDefault.png'

const PHOTO_SIZE = 32;
const userRole = 'ong'

type formDataProps = {
    name?: string
    email?: string
    password?: string
    newPassword?: string
    passwordConfirm?: string
    numero?: string
    cep?: string
    contato?: string
}

const updateSchema = yup.object({
    name: yup.string(),
    email: yup.string().email('E-mail inválido.'),
    password:  yup.string(),
    newPassword: yup.string(),
    passwordConfirm: yup.string().oneOf([yup.ref('newPassword')], 'A confirmação da senha não confere'),
    cep: yup.string(),
    numero: yup.string(),
    contato: yup.string()
})

export function Profile() {
    const { user } = useAuth()
    const { control, handleSubmit, formState: { errors } } = useForm<formDataProps>({
        resolver: yupResolver(updateSchema),
    })

    const [photoIsloading, setPhotoIsLoading] = useState(false)
    const [photoURI, setPhotoURI] = useState(avataUserDefault)

    const toast = useToast()

    const navigator = useNavigation<AppNavigatorRoutesProps>()
    function createAPet() {
        navigator.navigate("createPet")
    }

    function handleUpdate({ name, email, password, passwordConfirm, cep, numero, contato, newPassword }: formDataProps) {
        console.log(name, email, password, passwordConfirm, cep, numero, contato, newPassword)
     }
    
    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true)
        try{
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            })
            if(photoSelected.canceled) {
                return;
            }
            if (photoSelected.assets[0].uri){
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        title: 'A foto ultrapassa os limites de tamanho, escolha uma foto menor',
                        placement: "top",
                    })
                }
                setPhotoURI(photoSelected.assets[0].uri)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setPhotoIsLoading(false)
        }
    }
    
    return(
        <ScrollView flex={1}>
            <VStack py={16} px={8}>
                <Center>
                    {
                        photoIsloading ? 
                        <Skeleton
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                            rounded={"full"}
                        />
                    :
                        <Image
                            size={PHOTO_SIZE}
                            rounded={"full"}
                            source={user.avata ? {uri: user.avata} : photoURI}
                            alt="UserProfile"
                        />
                    }
                    {/* Define se caso a imagem esteja carregadno usar o skeleton e quando carregada usar a imagem */}

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text mt={2} mb={2} fontSize={16} fontWeight={"bold"} color={"blue.200"}>
                            Editar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name='name'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                bg={"blue.100"}
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='email'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                bg={"blue.100"}
                                placeholder="E-mail"
                                isDisabled
                                isReadOnly
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='cep'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                bg={"blue.100"}
                                placeholder="Cep"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='numero'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                bg={"blue.100"}
                                placeholder="nº"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='contato'
                        render={( {field: { onChange, value }}) => (
                            <Input 
                                bg={"blue.100"}
                                placeholder="Telefone"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />  
                </Center>

                <VStack px={6} mt={12} mb={9}>
                    <Heading fontSize={16} mb={4}>
                        Alterar senha
                    </Heading>

                    <Controller
                        control={control}
                        name='password'
                        render={( {field: { onChange, value }}) => (
                            <Input
                                bg={"blue.100"}
                                placeholder='Senha antiga'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='newPassword'
                        rules={{
                            pattern: {
                                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])(?!.*\s).{8,}$/,
                                message: 'A senha não corresponde aos requisitos do sistema'
                            }
                        }}
                        render={( {field: { onChange, value }}) => (
                            <Input
                                bg={"blue.100"}
                                placeholder='Nova senha'
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
                                bg={"blue.100"}
                                placeholder='Confirme a nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    
                    <Button title="Editar" variant={"solid"} mt={10} onPress={handleSubmit(handleUpdate)}></Button>
                    {userRole === 'ong' ? <Button title="Cadastrar novo pet" variant={"outline"} onPress={createAPet}></Button> : ''}
                </VStack>
            </VStack>
        </ScrollView>
    );
}