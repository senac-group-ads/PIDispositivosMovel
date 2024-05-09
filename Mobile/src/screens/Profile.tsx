import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, VStack, Image, Skeleton, Text, Center, Heading, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Button } from "../components/Button";
import { Input } from "../components/Input";

const PHOTO_SIZE = 32;
const userRole = 'ong'

export function Profile() {
    const [photoIsloading, setPhotoIsLoading] = useState(false)
    const [photoURI, setPhotoURI] = useState('https://github.com/MarcosMOliveiradev.png')

    const toast = useToast()
    
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
                            source={{ uri: photoURI}} 
                            alt="UserProfile"
                        />
                    }
                    {/* Define se caso a imagem esteja carregadno usar o skeleton e quando carregada usar a imagem */}

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text mt={2} mb={2} fontSize={16} fontWeight={"bold"} color={"blue.200"}>
                            Editar foto
                        </Text>
                    </TouchableOpacity>

                    <Input 
                        bg={"blue.100"}
                        placeholder="Nome"
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="E-mail"
                        isDisabled
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="Cep"
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="nº"
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="Telefone"
                    />
                    
                </Center>
                <VStack px={6} mt={12} mb={9}>
                    <Heading fontSize={16} mb={4}>
                        Alterar senha
                    </Heading>

                    <Input 
                        bg={"blue.100"}
                        placeholder="Senha antiga"
                        secureTextEntry
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="Nova senha"
                        secureTextEntry
                    />
                    <Input 
                        bg={"blue.100"}
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                    />


                    <Button title="Editar" variant={"solid"} mt={10}></Button>
                    {userRole === 'ong' ? <Button title="Cadastrar novo pet" variant={"outline"}></Button> : ''}
                </VStack>
            </VStack>
        </ScrollView>
    );
}