import { Center, Image, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from "react";

const PHOTO_SIZE = 32;
import avataUserDefault from '../assets/userPhotoDefault.png'
import { TouchableOpacity } from "react-native";
import { api } from "../services/api";

type formDataProps = {
    name: string,
    idade: string,
    peso: string,
    tipo: string,
    descricao: string,
    porte: string,
    requisitos: string,
    foto: string, 
}

export function CreatePet() {
    const [photoIsloading, setPhotoIsloading] = useState(true)
    const toast = useToast()

    async function handlePetPhotoSelect() {
        setPhotoIsloading(true)
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
                const fileExtension = photoSelected.assets[0].uri.split('.').pop()

                const photoFile = {
                name: `${photoSelected.assets[0].fileName}.${fileExtension}`.toLowerCase(),
                uri: photoSelected.assets[0].uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData()
                userPhotoUploadForm.append('file', photoFile);

                const response = await api.post('/pet/img', userPhotoUploadForm, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                const urlAvata = response.data
            }

        } catch(err) {
            console.log(err)
        } finally {
            setPhotoIsloading(false)
        }
    }

    async function createPet({ name, descricao, foto, idade, peso, porte, requisitos, tipo }: formDataProps) {
        
     }

    return(
        <ScrollView flex={1}>
            <VStack py={16} px={8}>
                <Center>
                    <TouchableOpacity onPress={handlePetPhotoSelect}>
                        <Center>
                            <Image
                                size={PHOTO_SIZE}
                                rounded={"full"}
                                source={avataUserDefault}
                                alt="UserProfile"
                            />
                            <Text mt={2} mb={2} fontSize={16} fontWeight={"bold"} color={"blue.200"}>
                                Editar foto
                            </Text>
                        </Center>
                    </TouchableOpacity>
                    
                </Center>
            </VStack>
        </ScrollView>
    );
}