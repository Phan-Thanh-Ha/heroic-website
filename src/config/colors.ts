import {
    red,
    volcano,
    orange,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors';

/**
 * Ant Design palettes are arrays: [0] lightest → [9] darkest, plus `.primary`.
 * Quick picks: palette[5] ≈ default, palette.primary is the official primary.
 * Reference: https://ant.design/docs/spec/colors
 */
// Brand/semantic tokens derived from Ant Design palettes
export const colors = {
    brand: {
        primary: red.primary,
        primaryHover: red[3],
        primaryActive: red[6],
    },
    neutral: {
        text: grey[9],
        border: grey[3],
        background: grey[0],
    },
    polarGreen: {
        green0: green[0],
        primary: green.primary,
        dark: green[7],
    },
};

// Full Ant Design palettes for ad-hoc usage
export const palettes = {
    red,
    volcano,
    orange,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
};
