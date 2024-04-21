import { CheckIcon, Select as SelectNativeBase } from 'native-base'

export function Select(titulo: string) {
    return (
        <SelectNativeBase
            width={80}
            accessibilityLabel='Escolha qual tito de usuario'
            placeholder='Escolha qual tipo de usuario'
            borderColor='#D7D7D7'
            fontSize='md'
            _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }}
         >
            <SelectNativeBase.Item label='Ong' value='Ong'/>
            <SelectNativeBase.Item label='Tutor' value='Tutor'/>
        </SelectNativeBase>

    );
}