import { HStack, VStack, Text, ScrollView, FlatList } from "native-base";
import { useState } from "react";

// Componentes
import { HomeHeader } from "../components/HomeHeader";
import { PetsCard } from "../components/PetsCard";
import { Filter } from "../components/Filter";

// imagens para o botao de filtro e para os cardes (para os cardes serão temporarios)
import GatoPNG from '../assets/gato.png'
import CachorroPNG from '../assets/cachorro.png'

export function Home() {
    const [pets, setPets] = useState(['gato', 'cachorro'])
    return(
        <ScrollView _contentContainerStyle={{ pb: 8 }}>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                {/* Bpotão de ffiltro */}
                <HStack justifyContent={"center"} m={5}>
                    <Filter img={GatoPNG} name="gato"/>
                    <Filter img={CachorroPNG} name="dog"/>
                </HStack>
                {/* Card com imagens e descrição de alguns pets */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>Destaque</Text>

                    <FlatList
                        data={pets}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <PetsCard id="12345" img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada" ></PetsCard>
                        )}
                     />
                </VStack>
            </VStack>
        </ScrollView>
    );
}