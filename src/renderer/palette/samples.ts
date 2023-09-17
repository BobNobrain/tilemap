import { Palette } from './types';

// 48 elements
// 0D171F,2E4659,435D73,5E788C,7A95A7,99B0BF,B4C5D1,D0DDE4,F1F4F7 - grays
// 0D2829,154237,235C44,317545,428F42,6EA84A,A3C255,CFDB72 - greens
// 750D10,94241A,B34428,D16630,E68D3E,EDAC4A,F5CB53,FFEA63 - oranges
// 5C1E1C,78362A,915237,AD7044,C78C58,E0AB72,EBC48A,F5D9A6 - browns
// 3F1A4D,6D2975,943989,B3508D,CC6B8A,E6948F,F5BAA9 - purples
// 1D1652,212870,2C488F,3973AD,53ACCC,74CEDA,A5E2E6,CDF1F4 - aquas

export const TRANSPARENT = 'transparent';
export const BLACK = '#0D171F';
export const WHITE = '#F1F4F7';

export const ORANGE: Palette = {
    color: '#E68D3E',
    light: '#EDAC4A',
    lighter: '#F5CB53',
    lightest: '#FFEA63',
    dark: '#D16630',
    darker: '#B34428',
    darkest: '#94241A',
};
export const PURPLE: Palette = {
    color: '#B3508D',
    light: '#CC6B8A',
    lighter: '#E6948F',
    lightest: '#F5BAA9',
    dark: '#943989',
    darker: '#6D2975',
    darkest: '#3F1A4D',
};

export const GREEN: Palette = {
    color: '#428F42',
    light: '#6EA84A',
    lighter: '#A3C255',
    lightest: '#CFDB72',
    dark: '#317545',
    darker: '#235C44',
    darkest: '#154237',
};

export const BROWN: Palette = {
    color: '#AD7044',
    light: '#C78C58',
    lighter: '#E0AB72',
    lightest: '#EBC48A',
    dark: '#915237',
    darker: '#78362A',
    darkest: '#5C1E1C',
};

export const GRAY: Palette = {
    color: '#7A95A7',
    light: '#99B0BF',
    lighter: '#B4C5D1',
    lightest: '#D0DDE4',
    dark: '#5E788C',
    darker: '#435D73',
    darkest: '#2E4659',
};

export const BLUE: Palette = {
    color: '#53ACCC',
    light: '#74CEDA',
    lighter: '#A5E2E6',
    lightest: '#CDF1F4',
    dark: '#3973AD',
    darker: '#2C488F',
    darkest: '#212870',
};
