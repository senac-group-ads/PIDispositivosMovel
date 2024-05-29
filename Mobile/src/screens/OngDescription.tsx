import { VStack, Image, useToast, Center, ScrollView, FlatList, Heading } from "native-base";
import React, { useCallback, useState } from "react";

import ongImage from '../assets/userPhotoDefault.png';

import { useFocusEffect, useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { AppErrors } from "../utils/appErrors";
import { TextImputDetails } from "../components/TextInputDetails";
import { userDTO } from "../dtos/UserDTO";
import { PetsDTO } from "../dtos/PetsDTO";
import { MiniPetCars } from "../components/MiniPetCard";

type OngDescriptionHeaderProps = {
  listOngId: string
};

export function OngDescription() {
  const [isLoading, setIsLoading] = useState(true)
  const [pets, setPets] = useState<PetsDTO[]>([])

  const [ongDescription, setOngDescription] = useState<userDTO>({} as userDTO)

  const toast = useToast()
  const routes = useRoute()

  const { listOngId } = routes.params as OngDescriptionHeaderProps

  async function findOngDescription() {
    try {
      setIsLoading(true)

      const respose = await api.get(`/user/list/${listOngId}`)
      setOngDescription(respose.data)
    } catch (err) {
        const isAppError = err instanceof AppErrors;
        const title = isAppError ? err.message : 'Não foi possível carregar as informações';
    
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      findOngDescription()
    }, [listOngId])
)

async function petForUser() {
  try {
    const { data } = await api.get(`/pet/listbyuser/${ongDescription.id}`)
    console.log(data)

    setPets(data)

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
    petForUser()
  }, [listOngId])
)

  return (
    <ScrollView>
      <Center mt={80}>
            <Image 
              source={ongDescription.avata ? {uri: ongDescription.avata} : ongImage}
              alt="Foto da ONG"
              width="100%"
              height={100}
              resizeMode="contain"
              style={{ alignSelf: 'flex-start' }}
            />
              <VStack>
                  <TextImputDetails details={ongDescription.name} info={'Nome'}/>
                  <TextImputDetails details={ongDescription.email} info={'Email'}/>
                  <TextImputDetails details={ongDescription.cep} info={'Cep'}/>
                  <TextImputDetails details={ongDescription.numero} info={'Nº'}/>
                  <TextImputDetails details={ongDescription.contato} info={'Contato'}/>
              </VStack>

              <VStack mt={10}>
                <Heading color={"blue.500"}>Pets cadastrados por esta Ong</Heading>
                <Center>
                  <FlatList
                    numColumns={2}
                    data={pets}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => ( 
                      <MiniPetCars data={item} ></MiniPetCars>
                      )}
                  />
                </Center>
              </VStack>
          </Center>
        </ScrollView>
  );
}




