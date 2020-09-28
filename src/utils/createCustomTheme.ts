import { HSLA, Theme } from "react-neu/dist/theme/types";

const createTheme = (): {
  dark: Theme;
  light: Theme;
} => {
  /* Light styles */
  const baseColor = { h: 338, s: 100, l: 41 };
  const baseGreyColor = { h: 338, s: 100, l: 41 };

  /* Dark Styles */
  const baseColorDark = { h: 248, s: 45, l: 10 };
  const baseGreyColorDark = { h: 248, s: 45, l: 10 };

  const borderRadius = 28;
  const siteWidth = 1200;

  const { h, s } = baseColor;
  const { h: hDark, s: sDark } = baseColorDark || baseColor;
  const { h: baseGreyH } = baseGreyColor || baseColor;
  const { h: baseGreyDarkH } =
    baseGreyColorDark || baseColorDark || baseGreyColor || baseColor;

  const blackHSLA: HSLA = { h: baseGreyH, s: 95, l: 4 };
  const whiteHSLA: HSLA = { h: baseGreyH, s: 100, l: 100 };
  const black = hslToCssString(blackHSLA);
  const white = hslToCssString(whiteHSLA);
  const grey = generateGreys(baseGreyH);

  const blackDarkHSLA: HSLA = { h: baseGreyDarkH, s: 95, l: 4 };
  const whiteDarkHSLA: HSLA = { h: baseGreyDarkH, s: 100, l: 100 };
  const blackDark = hslToCssString(blackDarkHSLA);
  const whiteDark = hslToCssString(whiteDarkHSLA);
  const greyDark = generateGreys(baseGreyDarkH);

  const buttonSizes = {
    lg: 72,
    md: 48,
    sm: 36,
  };

  const colors = {
    black,
    grey,
    primary: {
      dark: hslToCssString({ h, s, l: 15 }),
      light: hslToCssString({ h, s, l: 75 }),
      main: hslToCssString(baseColor),
    },
    white,
  };

  const colorsDark = {
    black: blackDark,
    grey: greyDark,
    primary: {
      dark: hslToCssString({ h: hDark, s: sDark, l: 15 }),
      light: hslToCssString({ h: hDark, s: sDark, l: 75 }),
      main: hslToCssString(baseColorDark || baseColor),
    },
    white: whiteDark,
  };

  const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 72,
    8: 96,
  };

  const lightTheme: Theme = {
    baseBg: `radial-gradient(circle at top, ${grey[100]}, ${grey[200]})`,
    baseColor: grey[200],
    borderRadius,
    buttonSizes,
    colors,
    highlightColor: grey[100],
    shadowColor: grey[300],
    siteWidth,
    spacing,
    surfaces: generateSurfaces(
      {
        dark: grey[300],
        light: grey[100],
        main: grey[200],
      },
      hslToCssString({ ...whiteHSLA, a: 100 }),
      hslToCssString({ ...blackHSLA, a: 15 })
    ),
    textColor: black,
  };

  const darkTheme: Theme = {
    ...lightTheme,
    baseBg: `radial-gradient(circle at top, ${greyDark[700]}, ${greyDark[800]})`,
    baseColor: greyDark[800],
    colors: colorsDark,
    highlightColor: greyDark[700],
    shadowColor: greyDark[900],
    surfaces: generateSurfaces(
      {
        dark: greyDark[900],
        light: greyDark[700],
        main: greyDark[800],
      },
      hslToCssString({ ...whiteDarkHSLA, a: 7.5 }),
      greyDark[900]
    ),
    textColor: whiteDark,
  };

  return {
    dark: darkTheme,
    light: lightTheme,
  };
};

const hslToCssString = (hsla: HSLA) => {
  const { h, s, l, a = 100 } = hsla;
  return `hsl(${h}deg ${s}% ${l}% / ${a}%)`;
};

const generateGreys = (h: number) => {
  return {
    100: hslToCssString({ h, s: 20, l: 96 }),
    200: hslToCssString({ h, s: 20, l: 94 }),
    300: hslToCssString({ h, s: 20, l: 90 }),
    400: hslToCssString({ h, s: 20, l: 70 }),
    500: hslToCssString({ h, s: 7, l: 52 }),
    600: hslToCssString({ h, s: 10, l: 37 }),
    700: hslToCssString({ h, s: 17, l: 15 }),
    800: hslToCssString({ h, s: 20, l: 10 }),
    900: hslToCssString({ h, s: 20, l: 5 }),
  };
};

const generateSurfaces = (
  base: {
    dark: string;
    light: string;
    main: string;
  },
  highlight: string,
  shadow: string
) => {
  const baseBg = `radial-gradient(circle at top, ${base.light}, ${base.main})`;
  return {
    N2: {
      background: `radial-gradient(circle at top, ${base.main}, ${base.dark})`,
      border: "0",
      highlight: `inset 4px -4px 8px -4px ${highlight}`,
      shadow: `inset -4px 4px 8px -4px ${shadow}`,
    },
    N1: {
      background: baseBg,
      border: "0",
      highlight: `inset 2px -2px 4px ${highlight}`,
      shadow: `inset -2px 2px 4px ${shadow}`,
    },
    0: {
      background: baseBg,
      border: `0`,
      highlight: `inset -1px 1px 0px ${highlight}`,
      shadow: `0px 0px 1px 1px ${shadow}`,
    },
    1: {
      background: baseBg,
      border: "0",
      highlight: `4px -4px 8px 0px ${highlight}`,
      shadow: `-4px 4px 8px 0 ${shadow}`,
    },
    2: {
      background: baseBg,
      border: "0",
      highlight: `8px -8px 16px 0px ${highlight}`,
      shadow: `-8px 8px 16px 0 ${shadow}`,
    },
  };
};

export default createTheme;
