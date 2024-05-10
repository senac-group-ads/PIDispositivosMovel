import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
    errorMessage?: string | null;
  }

export function Input({ errorMessage = null, isInvalid, ...rest}: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} alignItems={'center'} mb={4}>
            <NativeBaseInput 
                w={80}
                px={4}
                borderWidth={1.5}
                borderColor='#D7D7D7'
                fontSize='md'
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                fontFamily='body'
                {...rest}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}