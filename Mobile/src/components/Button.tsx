import { Button as NativeBaseButton, IButtonProps, Text} from 'native-base'

/*
* Componente responsavel pelo botão
*/

type props = IButtonProps & {
    title: string
}

export function Button({ title, ...rest }: props) {
    return (
        <NativeBaseButton
            color='#F6F6F6'
            w={80}
            h={12}
            marginBottom={8}
            background='blue.300'
            _pressed={{
                bg: 'blue.100'
            }}
            {...rest}
        >
            <Text fontSize='lg' color='white'>
                {title}
            </Text>
        </NativeBaseButton>
    );
}