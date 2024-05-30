import { CheckIcon, Select as SelectNativeBase, ISelectProps, FormControl } from 'native-base'

type props = ISelectProps & {
    placeholder: string
    label1: string
    label2: string
    errorMessage?: string | null
}

export function Select( {label1, label2, placeholder, ...rest }:props) {
    return (
            <SelectNativeBase
                {...rest}
                width={80}
                accessibilityLabel={placeholder}
                placeholder={placeholder}
                borderColor='#D7D7D7'
                fontSize='md'
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }}
            >
                <SelectNativeBase.Item label={label1} value={label1}/>
                <SelectNativeBase.Item label={label2} value={label2}/>
            </SelectNativeBase>
    );
}