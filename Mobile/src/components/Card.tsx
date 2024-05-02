import { HStack, VStack, Image, Text, Pressable, IPressableProps } from "native-base";

type props = IPressableProps & {
    img: undefined
    name: string
    idade: string
    descricao: string
}

export function Card({ img, descricao, idade, name, ...rest }: props) {
    return (
        <Pressable
            {...rest}
        >
            <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                <Image borderLeftRadius={10} source={img} alt="Gato" width={32} height={32}/>
                    <VStack ml={5}>
                        <Text mt={2}>Nome: {name}</Text>
                        <Text mt={2}>Idade:  {idade}</Text>
                        <Text mt={2} w='50%'>descrição:  {descricao}</Text>
                    </VStack>
                </HStack>
        </Pressable>
    );
}