import { VStack, Image, useToast, Center } from "native-base";
import React, { useCallback, useEffect, useState } from "react";

import ongImage from '../assets/userPhotoDefault.png';
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { AppErrors } from "../utils/appErrors";
import { TextImputDetails } from "../components/TextInputDetails";
import { userDTO } from "../dtos/UserDTO";

type OngDescriptionHeaderProps = {
  listOngId: string
};

export function OngDescription() {
  const [isLoading, setIsLoading] = useState(true)

  const [ongDescription, setOngDescription] = useState<userDTO>({} as userDTO)

  const toast = useToast()
  const routes = useRoute()

  const {listOngId} = routes.params as OngDescriptionHeaderProps

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

  useEffect(
    useCallback(() => {
      findOngDescription()
    }, [listOngId])
)

  return (
    <Center mt={16} mb={16}>
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
        </Center>
  );
}




