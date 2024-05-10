import { HStack, VStack, Image, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";


type props = TouchableOpacityProps & {
    img: undefined
    name: string
    descricao: string
}

export function OngCard({ img, descricao, name, ...rest }: props) {
    return (
        <TouchableOpacity
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10} alignItems="center">
                <Image borderLeftRadius={10} source={img} alt="Gato" width={32} height={32}/>
                <VStack ml={2} flex={1}>
                    <Text fontSize="10px" mt={2}>Nome: {name}</Text>
                    <Text fontSize="10px" mt={2} numberOfLines={3}>descrição: {descricao}</Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    );
}