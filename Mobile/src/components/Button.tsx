import { Button as NativeBaseButton, IButtonProps, Text} from 'native-base'

/*
* Componente responsavel pelo botão
*/

type props = IButtonProps & {
    title: string
    variant: 'solid' | 'outline';
}

export function Button({ title, variant, ...rest }: props) {
    return (
        <NativeBaseButton
            color='#F6F6F6'
            w={80}
            h={12}
            marginBottom={8}
            background={variant === 'outline' ? "transparent" : 'blue.300'}
            borderWidth={variant === 'outline' ? 1 : 0}
            borderColor={'blue.300'}
            _pressed={{
                bg: variant === 'outline' ? 'gray.300' : 'blue.100'
            }}
            {...rest}
        >
            <Text 
                fontSize='lg' 
                color={variant === 'outline' ? 'blue.300' : 'white'}>
                {title}
            </Text>
        </NativeBaseButton>
    );
}