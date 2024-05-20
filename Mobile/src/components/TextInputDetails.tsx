import { HStack, Text } from "native-base";

type descriptionProps = {
    info: string
    details: string
    numberOfLine?: number | null
}

export function TextImputDetails({ info, details, numberOfLine }: descriptionProps) {
    if(!numberOfLine) {
        numberOfLine = 1
    }
    return (
        <HStack mt={8} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize="md" mr={5}>{info}:</Text>
          <Text bg="blue.100" numberOfLines={numberOfLine} p={2} borderRadius={5} color="black" width={250}>{details}</Text>
        </HStack>
    );
}