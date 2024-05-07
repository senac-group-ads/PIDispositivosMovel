import { HStack, VStack, Text, ScrollView } from "native-base";

import { HomeHeader } from "../components/HomeHeader";
import { OngCard } from "../components/OngCard";

import OngPNG from '../assets/ong.png' // Suponha que você tenha um ícone para representar as ONGs

export function ListOng() {
    return(
        <ScrollView>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                
                {/* Card com informações das ONGs */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>ONGs</Text>

                    <OngCard img={OngPNG} descricao="Descrição da ONG 1" nome="ONG 1" ></OngCard>
                    <OngCard img={OngPNG} descricao="Descrição da ONG 2" nome="ONG 2"></OngCard>
                    <OngCard img={OngPNG} descricao="Descrição da ONG 3" nome="ONG 3"></OngCard>
                    {/* Adicione mais cartões conforme necessário para listar mais ONGs */}
                </VStack>
            </VStack>
        </ScrollView>
    );
}