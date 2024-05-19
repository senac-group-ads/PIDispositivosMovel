import { HStack, VStack, Text, ScrollView, useToast, FlatList } from "native-base";
import { useCallback, useState } from "react";

import { HomeHeader } from "../components/HomeHeader";
import { OngCard } from "../components/OngCard";

import OngPNG from '../assets/ong.png' // Suponha que você tenha um ícone para representar as ONGs
import { userDTO } from "../dtos/UserDTO";
import { AppErrors } from "../utils/appErrors";
import { api } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";

export function ListOng() {
    const toast = useToast()

    const [user, setUser] = useState<userDTO[]>([])

    async function findOng() {
        try {
            const response = await api.get('/user/list/ong')
            setUser(response.data.user)
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
            findOng()
        }, [])
    )
    return(
        <ScrollView>
            <VStack flex={1} >
                <HStack width='100%' alignItems={"center"} height={32} background={"blue.100"}>
                    <HomeHeader />
                </HStack>
                
                {/* Card com informações das ONGs */}
                <VStack>
                    <Text color={"blue.500"} fontSize={20} marginLeft={10}>ONGs</Text>

                    <FlatList
                        data={user}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <OngCard data={item} ></OngCard>
                        )}
                    />
                    {/* Adicione mais cartões conforme necessário para listar mais ONGs */}
                </VStack>
            </VStack>
        </ScrollView>
    );
}