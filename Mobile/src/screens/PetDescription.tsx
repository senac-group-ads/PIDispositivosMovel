import { VStack, Image, useToast, Center } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import petImage from '../assets/userPhotoDefault.png';

import { api } from "../services/api";
import { AppErrors } from "../utils/appErrors";
import { TextImputDetails } from "../components/TextInputDetails";
import { PetsDTO } from "../dtos/PetsDTO";
import { Button } from "../components/Button";
import { AppNavigatorRoutesProps } from "../routes/app.routes";

type PetDescriptionHeaderProps = {
  listPetId: string;
};

export function PetDescription() {
  const [isLoading, setIsLoading] = useState(true);
  const [petDescription, setPetDescription] = useState<PetsDTO>({} as PetsDTO);

  const toast = useToast();
  const route = useRoute();

  // Adicionar verificação para evitar erros
  const { listPetId } = route.params as PetDescriptionHeaderProps

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function findPetDescription() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pet/list/${listPetId}`);
      console.log(response.data.pet)
      setPetDescription(response.data.pet);
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
  function ongProfile(listOngId: string){
    console.log(listOngId)
    navigation.navigate("ongDescription", {listOngId})
}

  useEffect(
    useCallback(() => {
      findPetDescription()
    }, [listPetId])
)

  return (
    <Center mt={16} mb={16}>
      <Image 
        source={petDescription.fotos ? { uri: petDescription.fotos } : petImage}
        alt="Foto do PET"
        width="100%"
        height={100}
        resizeMode="contain"
        style={{ alignSelf: 'flex-start' }}
      />
      <VStack pb={8}>
        <TextImputDetails details={petDescription.name} info={'Nome'} />
        <TextImputDetails details={petDescription.idade} info={'Idade'} />
        <TextImputDetails details={petDescription.peso} info={'Peso'} />
        <TextImputDetails details={petDescription.porte} info={'Porte'} />
        <TextImputDetails numberOfLine={4} details={petDescription.descricao} info={'Descrição'} />
      </VStack>

      <Button 
        onPress={() => ongProfile(petDescription.costumerId)}
        w={96}
        title="Quero adotar"
        variant={"solid"}
      />
    </Center>
  );
}
