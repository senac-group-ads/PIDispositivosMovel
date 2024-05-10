import { HStack, VStack, Image, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "../routes/app.routes";

type props = TouchableOpacityProps & {
    img: undefined
    name: string
    idade: string
    descricao: string
    id: string
}

export function PetsCard({ img, descricao, idade, name, id, ...rest }: props) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    // Função que leva o card do pet para o perfil do pet
    function petProfile(id: string){
        navigation.navigate("petDescription")
    }
    return (
        <TouchableOpacity
            onPress={() => petProfile(id)}
            id={id}
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10} alignItems="center">
                <Image borderLeftRadius={10} source={img} alt="Gato" width={32} height={32}/>
                <VStack ml={2} flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {name}</Text>
                    <Text fontSize="10px" mt={2}>Idade: {idade}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={3}>descrição: {descricao}</Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    );
}