import { HStack, VStack, Image, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { PetsDTO } from "../dtos/PetsDTO";

type props = TouchableOpacityProps & {
    data: PetsDTO;
}

import petPhotoDefault from '../assets/userPhotoDefault.png'
import React from "react";

export function MiniPetCars({ data, ...rest }: props) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    // Função que leva o card do pet para o perfil do pet
    function petProfile(listPetId: string){
        navigation.navigate("petDescription", { listPetId })
    }

    const petURI = data.fotos

    return (
        <TouchableOpacity
            onPress={() => petProfile(data.id)}
            id={data.id}
            {...rest}
        >
            <VStack mt={5} borderRadius={5} borderColor={"blue.100"} h='32' w='32' alignItems="center">
                <Image 
                    borderLeftRadius={5} 
                    source={data.fotos ? {uri: petURI} : petPhotoDefault} 
                    alt={data.tipo} 
                    width={20} 
                    height={20}
                />
                
                <VStack flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {data.name}</Text>
                    <Text fontSize="10px" mt={2}>Idade: {data.idade}</Text>
                </VStack>
            </VStack>
        </TouchableOpacity>
    );
}