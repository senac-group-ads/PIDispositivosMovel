import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Center, Image, Link, VStack, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

import { PetsDTO } from "../dtos/PetsDTO";
import { AppErrors } from "../utils/appErrors";
import { api } from "../services/api";

import petImage from '../assets/userPhotoDefault.png';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type PetDescriptionHeaderProps = {
    listPetId: string;
  };

type formDataProps = {
    name?: string,
    idade?: string,
    peso?: string,
    tipo?: string,
    descricao?: string,
    porte?: string,
    requisitos?: string,
    fotos?: string,
    adopdeted?: string
}

const updatePetSchema = yup.object({
    name: yup.string().optional(),
    idade: yup.string().optional(),
    peso:  yup.string().optional(),
    tipo:  yup.string().optional(),
    descricao:  yup.string().optional(),
    porte:  yup.string().optional(),
    requisitos:  yup.string().optional(),
    fotos:  yup.string().optional().url(),
    adopdeted: yup.string()
})
export function EditPet(){
    const [isLoading, setIsLoading] = useState(false)
    const [PetDescription, setPetDescription] = useState<PetsDTO>()
    const navigator = useNavigation<AppNavigatorRoutesProps>()


    const { control, handleSubmit, formState: { errors }} = useForm<formDataProps>({
        resolver: yupResolver(updatePetSchema)
    })

    const route = useRoute();
    const toast = useToast()

    const { listPetId } = route.params as PetDescriptionHeaderProps

    async function findPetDescription() {
        try {
          setIsLoading(true);
    
          const response = await api.get(`/pet/list/${listPetId}`);
          setPetDescription(response.data.pet);
        } catch (err) {
          const isAppError = err instanceof AppErrors;
          const title = isAppError ? err.message : 'Não foi possível carregar as informações';
        
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500',
          });
        } finally {
          setIsLoading(false);
        }
      }
      useFocusEffect(
        useCallback(() => {
            findPetDescription()
        }, [])
      )

      async function updatePet({ adopdeted, idade, name, tipo, descricao, fotos, peso, porte, requisitos }: formDataProps) {
        if(adopdeted === 'Adotado') {
            try {
                setIsLoading(true)
                if(!PetDescription) {
                    toast.show({
                        title: 'erro inesperado',
                        bgColor: 'red.500',
                        placement: 'top'
                    })
                }
                const { data } = await api.patch(`/pet/adopted/${PetDescription?.id}`, {adotado: true})
                if(data.message) {
                    toast.show({
                        title: data.message,
                        placement: 'top',
                        bgColor: 'green.500'
                    })
                    navigator.navigate('listPetByOng')
                }
            } catch (err) {
                const isAppError = err instanceof AppErrors;
                const title = isAppError ? err.message : 'Não foi possível carregar as informações';
                
                toast.show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500',
                });
            } finally {
                setIsLoading(false)
            }
        } // atualiza se o pet foi adotado

        // atualiza a descrição do pet
        try {
            setIsLoading(true)
            const { data } = await api.put(`/pet/update/${PetDescription?.id}`, {
                idade,
                name,
                tipo,
                descricao,
                fotos,
                peso,
                porte,
                requisitos
            }) // atualiza todas as informações
    
            if(data.message) {
                toast.show({
                    title: data.message,
                        placement: 'top',
                        bgColor: 'green.500'
                })
                navigator.navigate('listPetByOng')
            }
        } catch (err) {
            const isAppError = err instanceof AppErrors;
            const title = isAppError ? err.message : 'Não foi possível carregar as informações';
            
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });
        } finally {
            setIsLoading(false)
        }
 
      }

      function retornar() {
        navigator.navigate('listPetByOng')
      }

    return (
        <VStack>
            <Center mt={16} mb={16} >
                <Image
                    source={PetDescription?.fotos ? { uri: PetDescription.fotos } : petImage}
                    alt="Foto do PET"
                    width="100%"
                    mb={5}
                    height={100}
                    resizeMode="contain"
                    style={{ alignSelf: 'flex-start' }}
                />
                <VStack>
                    <Center>
                        <Controller
                            control={control}
                            name="name"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder={PetDescription?.name ? PetDescription.name : 'Nome'}
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
                                    placeholder={PetDescription?.idade ? PetDescription.idade : 'Idade'}
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
                                    placeholder={PetDescription?.descricao ? PetDescription.descricao : 'Descrição'}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.descricao?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="peso"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder={PetDescription?.peso ? PetDescription.peso : 'Peso'}
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
                                    placeholder={PetDescription?.porte ? PetDescription.porte : 'Porte'}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.porte?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="requisitos"
                            render={( {field: {onChange, value}}) => (
                                <Input 
                                    placeholder={PetDescription?.requisitos ? PetDescription.requisitos : 'Requisitos'}
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
                                    placeholder={PetDescription?.tipo ? PetDescription.tipo : 'Tipo'}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.tipo?.message}
                                />
                            ) }
                        />

                        <Controller
                            control={control}
                            name="adopdeted"
                            render={( {field: {onChange}}) => (
                                <Select
                                    placeholder="Defina se o pet foi adotado ou não"
                                    label1="Adotado"
                                    label2="não foi adotado"
                                    onValueChange={intemValue => onChange(intemValue)}
                                    mb={5}
                                />
                            ) }
                        />
                        <Button variant={"solid"} title="Atualizar" isLoading={isLoading} onPress={handleSubmit(updatePet)}/>
                        <Link onPress={retornar} alignContent={'center'}>Retornar</Link>
                    </Center>
                </VStack>
            </Center>
        </VStack>
    );
}