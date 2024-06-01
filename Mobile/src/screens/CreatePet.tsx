import { Center, Image, ScrollView, Text, VStack, useToast } from "native-base";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useCallback, useEffect, useState } from "react";
import * as yup from 'yup'
import { TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";

const PHOTO_SIZE = 32;
import avataUserDefault from '../assets/userPhotoDefault.png'

import { api } from "../services/api";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { AppErrors } from "../utils/appErrors";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type formDataProps = {
    name: string,
    idade: string,
    peso?: string,
    tipo: string,
    descricao?: string,
    porte?: string,
    requisitos?: string,
    foto?: string, 
}

const createPetSchema = yup.object({
    name: yup.string().required('Nome é obrigatório'),
    idade: yup.string().required('Nome é obrigatório'),
    peso:  yup.string().optional(),
    tipo:  yup.string().required('O tipo do animal deve ser informado'),
    descricao:  yup.string().optional(),
    porte:  yup.string().optional(),
    requisitos:  yup.string().optional(),
    foto:  yup.string().optional().url(),
})

export function CreatePet() {
    const [isLoading, setIsloading] = useState(false)
    const [photo, setPhoto] = useState()
    const toast = useToast()

    const { control, handleSubmit, formState: { errors }} = useForm<formDataProps>({
        resolver: yupResolver(createPetSchema)
    })

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    async function handlePetPhotoSelect() {
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

                if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 10) {
                    return toast.show({
                        title: 'A foto ultrapassa os limites de tamanho, escolha uma foto menor',
                        placement: "top",
                    })
                }
                const fileExtension = photoSelected.assets[0].uri.split('.').pop()

                const photoFile = {
                name: `${photoSelected.assets[0].fileName}`.toLowerCase(),
                uri: photoSelected.assets[0].uri,
                type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData()
                userPhotoUploadForm.append('file', photoFile);

                const { data } = await api.post('/pet/img', userPhotoUploadForm, {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                })
                const urlAvata = data
                setPhoto(urlAvata)
                return urlAvata;
            }

        } catch(err) {
            console.log(err)
        } 
    }

    async function createPet({ name, descricao, idade, peso, porte, requisitos, tipo }: formDataProps) {
       try {
        setIsloading(true)
        const fotos = photo
        const { data, status } = await api.post('/pet/create', {
            name,
            idade,
            descricao,
            peso,
            porte,
            requisitos,
            tipo,
            fotos
        })
        if (status === 200) {
            navigation.navigate("home")
        }
       } catch (err) {
            const isAppError = err instanceof AppErrors;
            const title = isAppError ? err.message : 'Não foi possível entrar. Tente novamente mais tarde'
            
            toast.show({
                title,
                placement: "top",
                bg: "red.500"
            })
        } finally {
            setIsloading(false)
        }
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
                                source={photo ? { uri: photo } : avataUserDefault }
                                alt="PetPhoto"
                            />
                            <Text mt={2} mb={2} fontSize={16} fontWeight={"bold"} color={"blue.200"}>
                                Selecione uma foto
                            </Text>
                        </Center>
                    </TouchableOpacity>
                    <VStack>
                        <Controller
                            control={control}
                            name="name"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='name'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            ) }
                        />
                        <Controller
                            control={control}
                            name="idade"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='idade'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.idade?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="descricao"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='descricao'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.descricao?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="peso"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='peso'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.peso?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="porte"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='porte'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.porte?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="requisitos"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='requisitos'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.requisitos?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="tipo"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder='tipo'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.tipo?.message}
                                />
                            ) }
                        />
                        
                        <Button variant={"solid"} title="Cadastrar" onPress={handleSubmit(createPet)} isLoading={isLoading}/>
                    </VStack>
                </Center>
            </VStack>
        </ScrollView>
    );
}