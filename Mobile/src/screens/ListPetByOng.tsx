import { Center, FlatList, HStack, Heading, ScrollView, VStack, useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { useCallback, useEffect, useState } from "react";

import { HomeHeader } from "../components/HomeHeader";
import { Pet } from '../components/pet'
import { PetsDTO } from "../dtos/PetsDTO";
import { AppErrors } from "../utils/appErrors";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export function ListPetByOng() {
    const [pets, setPets] = useState<PetsDTO[]>([])
    const [refreshing, setRefreshing] = useState(false)

    const { user } = useAuth()

    const toast = useToast()

    async function listPet() {
        try {
            setRefreshing(true)
            const { data } = await api.get(`/pet/listbyuser/${user.id}`)
            setPets(data)

        } catch (err) {
            const isAppError = err instanceof AppErrors;
            const title = isAppError ? err.message : 'Não foi possível carregar as informações';
        
            toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
            })
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(
        useCallback(() => {
            listPet()
            setRefreshing(false)
        }, [])
      )

      const onRefresh = useCallback(() => {
        listPet()
      }, [])

    return (
        <ScrollView
        _contentContainerStyle={{ pb: 4}}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
        }
        >
            <VStack flex={1}>
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>

                <Heading textAlign={'center'} color={"blue.500"} mt={5} mb={5}>Meus pets para adoção</Heading>

                <VStack>
                    <FlatList
                        numColumns={2}
                        data={pets}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Pet data={item}/>
                        )}
                    />
                </VStack>
            </VStack>
        </ScrollView>
    );
}