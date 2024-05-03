import { HStack, VStack, Text, ScrollView } from "native-base";

// Componentes
import { HomeHeader } from "../components/HomeHeader";
import { Card } from "../components/Card";
import { Filter } from "../components/Filter";

// imagens para o botao de filtro e para os cardes (para os cardes serão temporarios)
import GatoPNG from '../assets/gato.png'
import CachorroPNG from '../assets/cachorro.png'

export function Home() {
    return(
        <ScrollView _contentContainerStyle={{ pb: 4 }}>
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

                    <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada" ></Card>
                    <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
                    <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
                    <Card img={GatoPNG} descricao="Gato Gato Gato Gato Gato Gato Gato Gato Gato Gato Gato Gato Gato  Gato" idade="2 anos" name="Batada"></Card>
                    <Card img={GatoPNG} descricao="Gato" idade="2 anos" name="Batada"></Card>
                </VStack>
            </VStack>
        </ScrollView>
    );
}