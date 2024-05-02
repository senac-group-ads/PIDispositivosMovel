import { HStack, VStack, Text, ScrollView } from "native-base";

import { HomeHeader } from "../components/HomeHeader";
import { Card } from "../components/Card";

import GatoPNG from '../assets/gato.png'

export function ListPets() {
    return(
        <ScrollView>
        <VStack flex={1} >
            <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                <HomeHeader />
            </HStack>
            
            {/* Card com imagens e descrição de alguns pets */}
            <VStack>
                <Text color={"blue.500"} fontSize={20} marginLeft={10}>Pets</Text>

                <Card img={GatoPNG} descricao="Gato Gato Gato Gato Gato Gato Gato Gato" idade="2 anos" name="Batada" ></Card>
                <Card img={GatoPNG} descricao="Gato Gato Gato Gato Gato Gato Gato Gato" idade="2 anos" name="Batada"></Card>
                <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
                <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
                <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
            </VStack>
        </VStack>
    </ScrollView>
    );
}