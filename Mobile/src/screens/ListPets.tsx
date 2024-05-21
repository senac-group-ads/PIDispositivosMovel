import { HStack, VStack, Text, ScrollView, FlatList, useToast } from "native-base";

import { HomeHeader } from "../components/HomeHeader";
import { PetsCard } from "../components/PetsCard";

type petType = {
    listPetType?: string | null
}

import { useCallback, useState } from "react";
import { PetsDTO } from "../dtos/PetsDTO";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { AppErrors } from "../utils/appErrors";
import { api } from "../services/api";

export function ListPets() {
    const toast = useToast()
    const [pets, setPets] = useState<PetsDTO[]>([])

    async function findPets(){
        try {
            const response = await api.get('/pet/list', { params: {page: '1'}})
            setPets(response.data.pet)
        } catch (err) {
            const isAppError = err instanceof AppErrors;
            const title = isAppError ? err.message : 'Não foi possível carregar as informações';
    
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    useFocusEffect(
        useCallback(() => {
                findPets()
        }, [])
    )

    return(
        <ScrollView _contentContainerStyle={{ pb: 4}}>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                
                {/* Card com imagens e descrição de alguns pets */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>Pets</Text>

                    <FlatList
                        data={pets}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <PetsCard data={item} ></PetsCard>
                        )}
                     />
                    
                </VStack>
            </VStack>
        </ScrollView>
    );
}