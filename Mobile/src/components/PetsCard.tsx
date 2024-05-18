import { HStack, VStack, Image, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { PetsDTO } from "../dtos/PetsDTO";

type props = TouchableOpacityProps & {
    data: PetsDTO;
}

import petPhotoDefault from '../assets/userPhotoDefault.png'

export function PetsCard({ data, ...rest }: props) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    // Função que leva o card do pet para o perfil do pet
    function petProfile(id: string){
        navigation.navigate("petDescription")
    }

    const petURI = data.fotos

    return (
        <TouchableOpacity
            onPress={() => petProfile(data.id)}
            id={data.id}
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10} alignItems="center">
                <Image 
                    borderLeftRadius={10} 
                    source={data.fotos ? {uri: petURI} : petPhotoDefault} 
                    alt={data.tipo} 
                    width={32} 
                    height={32}
                />
                
                <VStack ml={2} flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {data.name}</Text>
                    <Text fontSize="10px" mt={2}>Idade: {data.idade}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={3}>descrição: {data.descricao}</Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    );
}