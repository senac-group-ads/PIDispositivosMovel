import { HStack, VStack, Text, Icon } from "native-base";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

type OngDescriptionCardProps = TouchableOpacityProps & {
  ongName: string;
  address: string;
  cep: string;
  number: string;
  phone: string;
  description: string;
};

export function OngDescriptionCard({ ongName, address, cep, number, phone, description, ...rest }: OngDescriptionCardProps) {
  const navigation = useNavigation();

  // Função para navegar para a tela de detalhes da ONG
  return (
    <TouchableOpacity {...rest}>
      <HStack ml={10} mt={2} background={"green.50"} w='75%' borderRadius={10} alignItems="center">
        <VStack ml={2} flex={1}>
          <Text fontSize="lg" mt={2}>{ongName}</Text>
          <Text fontSize="md" mt={2}>Endereço:</Text>
          <Text fontSize="md" mt={2}>CEP:</Text>
          <Text fontSize="md" mt={2}>Número:</Text>
          <Text fontSize="md" mt={2}>Telefone:</Text>
          <Text fontSize="md" mt={2} numberOfLines={3}>Descrição: {description}</Text>
        </VStack>
        <VStack mt={-5} space={2} alignItems="flex-start">
          <Text bg="blue.400" p={2} borderRadius={5} color="black">{address}</Text>
          <Text bg="blue.400" p={2} borderRadius={5} color="black">{cep}</Text>
          <Text bg="blue.400" p={2} borderRadius={5} color="black">{number}</Text>
          <Text bg="blue.400" p={2} borderRadius={5} color="black">{phone}</Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" />
      </HStack>
    </TouchableOpacity>
  );
}
