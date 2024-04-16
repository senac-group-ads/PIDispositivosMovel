import { Input as NativeBaseInput, IInputProps} from 'native-base'

export function Input({ ...rest}: IInputProps) {
    return (
        <NativeBaseInput 
            w={80}
            px={4}
            borderWidth={1.5}
            borderColor='#D7D7D7'
            fontSize='md'
            fontFamily='body'
            mb={4}
            {...rest}
        />
    );
}