import { extendTheme, theme as base, withDefaultColorScheme, withDefaultVariant, defineStyle, defineStyleConfig, } from '@chakra-ui/react';

const inputSelectStyles = {
    variants: {
        filled: {
            field: {
                _focus: {
                    borderColor: 'brand.500',
                },
            },
        },
    },
    sizes: {
        md: {
            field: {
                borderRadius: 'none',
            },
        },
    },
};

const outline = defineStyle({
    border: 'solid',
    background: 'var(--chakra-colors-gray-200)',
    borderRadius: 0,
    _focus: {
        borderColor: 'brand.500',
    },


    _dark: {
        background: 'var(--chakra-colors-chakra-body-bg)',
        color: 'white',
    }
})

export const textareaTheme = defineStyleConfig({
    variants: { outline },
})


const theme = extendTheme({
    colors: {
        brand: {
            50: '#efe5fe',
            100: '#deb2fb',
            200: '#c481f7',
            300: '#9f56ee',
            400: '#5719c9',
            500: '#8819c9',
            600: '#5a09ab',
            700: '#32005e',
            800: '#24005e',
            900: '#110033',
        },
    },
    fonts: {
        heading: `Montserrat, ${base.fonts?.heading}`,
        body: `Nunito Sans, ${base.fonts?.body}`,
    },
    components: {
        Textarea: { ...textareaTheme },
        Input: { ...inputSelectStyles },
        Select: { ...inputSelectStyles },
        Checkbox: {
            baseStyle: {
                control: {
                    borderRadius: 'none',
                    _focus: {
                        ring: 2,
                        ringColor: 'brand.500',
                    },
                },
            },
        },
    },
},
    withDefaultColorScheme({
        colorScheme: 'brand',
        components: ['Checkbox'],
    }),
    withDefaultVariant({
        variant: 'filled',
        components: ['Input', 'Select'],
    })
);

export default theme;

