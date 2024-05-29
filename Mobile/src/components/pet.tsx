import { AlertDialog, Box, Image, Text, VStack, useToast, Button as nativeButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import petPhotoDefault from '../assets/userPhotoDefault.png'
import TRASH from '../assets/trash.svg'

import { PetsDTO } from "../dtos/PetsDTO";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { AppErrors } from "../utils/appErrors";
import { useRef, useState } from "react";
import { Button } from "./Button";
import { api } from "../services/api";

const color = '#C80909'

type props = TouchableOpacityProps & {
    data: PetsDTO;
}

export function Pet({ data, ...rest }: props) {
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [isOpen, setIsOpen] = useState(false)
    const cancelRef = useRef(null)

    const onClose = () => setIsOpen(false)

    const toast = useToast()

    function petInput(listPetId: string){
        navigation.navigate("petDescription", { listPetId })
    }

    async function delet(id: string) {
        try {
            await api.delete(`/pet/delete/${id}`)
            setIsOpen(false)
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

    return (
        <TouchableOpacity
            // onPress={() => petProfile(data.id)}
            // id={data.id}
            {...rest}
        >
            <VStack mt={5} borderRadius={5} borderColor={"blue.100"} h='64' w='48' alignItems="center">
                <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                >
                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Delete Customer</AlertDialog.Header>
                            <AlertDialog.Body>
                                Ao deletar esse pet, todas as informações sobre ele serão perdidas. Tem certeza de que deseja prosseguir?
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <nativeButton.Group space={2}>
                                    <Button w={32} variant={"outline"} title="CANCELAR" onPress={onClose}/>
                                    <Button width={32} variant={"solid"} bgColor={'red.600'} title="DELETAR" onPress={() => delet(data.id)}/>
                                </nativeButton.Group>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>

                    <Box ml={24}>
                        <TRASH fill={color}/>
                    </Box>
                </TouchableOpacity>
                <Image 
                    borderLeftRadius={5} 
                    source={data.fotos ? { uri: data.fotos } : petPhotoDefault} 
                    alt={''} 
                    width={40} 
                    height={40}
                />
                
                <VStack flex={1}>
                    <Text fontSize="20px" mt={2}>Nome: {data.name}</Text>
                </VStack>
            </VStack>
        </TouchableOpacity>
    );
}