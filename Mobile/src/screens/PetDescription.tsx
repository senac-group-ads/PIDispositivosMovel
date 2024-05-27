import { VStack, Image, useToast, Center } from "native-base";
import React, { useCallback, useEffect, useState } from "react";

import petImage from '../assets/cachorro.png';
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { AppErrors } from "../utils/appErrors";
import { TextImputDetails } from "../components/TextInputDetails";
import { userDTO } from "../dtos/UserDTO";

type PetDescriptionHeaderProps = {
  listPetId: string;
};

export function PetDescription() {
  const [isLoading, setIsLoading] = useState(true);
  const [petDescription, setPetDescription] = useState<userDTO>({} as userDTO);

  const toast = useToast();
  const route = useRoute();

  // Adicionar verificação para evitar erros
  const { listPetId } = route.params ? route.params as PetDescriptionHeaderProps : { listPetId: '' };

  async function findPetDescription() {
    try {
      setIsLoading(true);

      const response = await api.get(`/user/list/${listPetId}`);
      setPetDescription(response.data);
    } catch (err) {
      const isAppError = err instanceof AppErrors;
      const title = isAppError ? err.message : 'Não foi possível carregar as informações';
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (listPetId) {
      findPetDescription();
    }
  }, [listPetId]);

  return (
    <Center mt={16} mb={16}>
      <Image 
        source={petDescription.avata ? { uri: petDescription.avata } : petImage}
        alt="Foto do PET"
        width="100%"
        height={100}
        resizeMode="contain"
        style={{ alignSelf: 'flex-start' }}
      />
      <VStack>
        <TextImputDetails details={petDescription.name} info={'Nome'} />
        <TextImputDetails details={petDescription.age} info={'Idade'} />
        <TextImputDetails details={petDescription.peso} info={'Peso'} />
        <TextImputDetails details={petDescription.porte} info={'Porte'} />
        <TextImputDetails details={petDescription.descricao} info={'Descrição'} />
      </VStack>
    </Center>
  );
}
