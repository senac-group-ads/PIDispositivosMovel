import { HStack, VStack, Image, Text, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Entypo } from '@expo/vector-icons'

type props = TouchableOpacityProps & {
    img: undefined
    name: string
    descricao: string
}

export function OngCard({ img, descricao, nome, ...rest }: props) {
    return (
        <TouchableOpacity
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10} alignItems="center">
                <Image borderLeftRadius={10} source={img} alt="Gato" width={32} height={32}/>
                <VStack ml={2} flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {nome}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={3}>descrição: {descricao}</Text>
                </VStack>
                <Icon as={Entypo} name="chevron-thin-right" />
            </HStack>
        </TouchableOpacity>
    );
}