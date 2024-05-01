import { HStack, VStack, Link, Image, Text, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { HomeHeader } from "../components/HomeHeader";
import { AppNavigatorRoutesProps } from "../routes/app.routes"

import GatoPNG from '../assets/gato.png'
import CachorroPNG from '../assets/cachorro.png'

export function Home() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function ListPet() {
        navigation.navigate('listPets')
    }

    return(
        <ScrollView>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>

                <HStack justifyContent={"center"} m={5}>

                    <Link onPress={ListPet}>
                        <Image source={GatoPNG} marginRight={2}  alt="Gato" width={16} height={16}/>
                    </Link>

                    <Link onPress={ListPet} key="dog">
                        <Image source={CachorroPNG} marginLeft={2} alt="Gato" width={16} height={16}/>
                    </Link>
                </HStack>

                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>Destaque</Text>

                    <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                        <Image borderLeftRadius={10} source={GatoPNG} alt="Gato" width={32} height={32}/>
                        <VStack ml={5}>
                            <Text mt={2}>Nome: </Text>
                            <Text mt={2}>Idade: </Text>
                            <Text mt={2}>descrição: </Text>
                        </VStack>
                    </HStack>

                    <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                        <Image borderLeftRadius={10} source={CachorroPNG} alt="Gato" width={32} height={32}/>
                        <VStack ml={5}>
                            <Text mt={2}>Nome: </Text>
                            <Text mt={2}>Idade: </Text>
                            <Text mt={2}>descrição: </Text>
                        </VStack>
                    </HStack>

                    <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                        <Image borderLeftRadius={10} source={CachorroPNG} alt="Gato" width={32} height={32}/>
                        <VStack ml={5}>
                            <Text mt={2}>Nome: </Text>
                            <Text mt={2}>Idade: </Text>
                            <Text mt={2}>descrição: </Text>
                        </VStack>
                    </HStack>

                    <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                        <Image borderLeftRadius={10} source={CachorroPNG} alt="Gato" width={32} height={32}/>
                        <VStack ml={5}>
                            <Text mt={2}>Nome: </Text>
                            <Text mt={2}>Idade: </Text>
                            <Text mt={2}>descrição: </Text>
                        </VStack>
                    </HStack>

                    <HStack ml={10} mt={2} background={"blue.50"} w='75%' borderRadius={10}>
                        <Image borderLeftRadius={10} source={GatoPNG} alt="Gato" width={32} height={32}/>
                        <VStack ml={5}>
                            <Text mt={2}>Nome: </Text>
                            <Text mt={2}>Idade: </Text>
                            <Text mt={2}>descrição: </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </ScrollView>
    );
}