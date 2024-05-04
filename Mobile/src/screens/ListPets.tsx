import { HStack, VStack, Text, ScrollView, Card } from "native-base";

import { HomeHeader } from "../components/HomeHeader";
import { PetsCard } from "../components/PetsCard";

import GatoPNG from '../assets/gato.png'

export function ListPets() {
    return(
        <ScrollView _contentContainerStyle={{ pb: 4}}>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                
                {/* Card com imagens e descrição de alguns pets */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>Pets</Text>

                    <PetsCard img={GatoPNG} descricao="" idade="2 anos" name="Batada" ></PetsCard>
                    
                </VStack>
            </VStack>
        </ScrollView>
    );
}