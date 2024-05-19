import { HStack, VStack, Image, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { userDTO } from "../dtos/UserDTO";

type props = TouchableOpacityProps & {
    data: userDTO
}

import userPhotoDefault from '../assets/userPhotoDefault.png'

export function OngCard({ data, ...rest }: props) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    // Função que leva o card da ong para o perfil da ong
    function ongProfile(listOngId: string){
        navigation.navigate("ongDescription", {listOngId})
    }

    return (
        <TouchableOpacity
            onPress={() => ongProfile(data.id)}                                                                          
            id={data.id}
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10} alignItems="center">
                <Image borderLeftRadius={10} source={data.avata ? {uri: data.avata} : userPhotoDefault} alt="Gato" width={32} height={32}/>
                <VStack ml={2} flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {data.name}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={1}>Contato: {data.contato}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={1}>Endereço: {data.cep}</Text>
                </VStack>
                <Icon as={Entypo} name="chevron-thin-right" />
            </HStack>
        </TouchableOpacity>
    );
}