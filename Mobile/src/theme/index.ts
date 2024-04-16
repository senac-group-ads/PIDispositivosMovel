import { extendTheme } from 'native-base'

export const THEME = extendTheme({
    colors: {
        blue: {
            50: '#DFEFFB',
            100: '#D7E8E9',
            200: '#5974B9',
            300: '#5974B9',
            400: '#6493B5',
            500: '#223D81'
        }
    },
    fonts: {
        heading: 'Nunito_700Bold',
        body: 'Nunito_400Regular',
    },
    fontSizes: {
        sm: '12',
        md: '15',
        lg: '20',
        xl: '24'
    }
})