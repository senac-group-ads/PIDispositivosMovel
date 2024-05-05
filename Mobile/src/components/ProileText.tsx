import { Text, VStack, Box } from "native-base";

type props = {
    definição: string
    informação: string
}
export function ProfileText({ definição, informação}: props) {
    return (
        <VStack mt={10}>
            <Text fontSize={"lg"} fontWeight={"medium"} pl={2}>{definição}:</Text>
            <Box  backgroundColor={"blue.100"} w='85%' h='31px' mt={4} borderRadius={5}>
                <Text fontSize={"lg"} fontWeight={"medium"} pl={2}>{informação}</Text>
            </Box>
        </VStack>
    );
}