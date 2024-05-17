import { VStack, Text, Image } from "native-base";
import React from "react";
import ongImage from '../assets/ong.png';

type OngDescriptionHeaderProps = {
  ongName: string;
  address: string;
  cep: string;
  number: string;
  phone: string;
};

export function OngDescription({ ongName, address, cep, number, phone }: OngDescriptionHeaderProps) {
  return (
    <VStack alignItems="center">
      <Image source={ongImage} alt="Foto da ONG" width="100%" height={100} resizeMode="contain" style={{ alignSelf: 'flex-start' }}/>
      <VStack mt={4} space={12} alignItems="flex-start" ml={-269}>
        <Text fontSize="lg">{ongName}</Text>
        <Text fontSize="md">Nome:</Text>
        <Text fontSize="md">Endereço:</Text>
        <Text fontSize="md">Cep:</Text>
        <Text fontSize="md">Número:</Text>
        <Text fontSize="md">Telefone:</Text>
      </VStack>
      <VStack mt={-320} ml={110} space={10} alignItems="flex-start">
        <Text bg="blue.100" p={2} borderRadius={5} color="black" width={250}>{address}</Text>
        <Text bg="blue.100" p={2} borderRadius={5} color="black" width={250}>{cep}</Text>
        <Text bg="blue.100" p={2} borderRadius={5} color="black" width={250}>{number}</Text>
        <Text bg="blue.100" p={2} borderRadius={5} color="black" width={250}>{phone}</Text>
        <Text bg="blue.100" p={2} borderRadius={5} color="black" width={250}>{phone}</Text>
      </VStack>
    </VStack>
  );
}




