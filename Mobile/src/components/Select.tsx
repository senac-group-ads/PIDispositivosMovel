import { CheckIcon, Select as SelectNativeBase, ISelectProps, FormControl } from 'native-base'

type props = ISelectProps & {
    errorMessage?: string | null
}

export function Select( { ...rest }:props) {
    return (
            <SelectNativeBase
                {...rest}
                width={80}
                accessibilityLabel='Escolha seu tipo de usuario'
                placeholder='Escolha seu tipo de usuario'
                borderColor='#D7D7D7'
                fontSize='md'
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }}
            >
                <SelectNativeBase.Item label='Ong' value={'Ong'}/>
                <SelectNativeBase.Item label='Tutor' value={'Tutor'}/>
            </SelectNativeBase>
    );
}