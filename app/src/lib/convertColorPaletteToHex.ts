import { RGBColor } from "colorthief";
import { ColorTranslator } from "colortranslator";

const convertColorPaletteToHex = (colorPalette: RGBColor[]) => {
  const convertPalette = colorPalette.map((color) => {
    const rgbColor = `rgb(${color[0]},${color[1]},${color[2]})`;
    const hexColor = ColorTranslator.toHEX(rgbColor);

    return hexColor;
  });

  return convertPalette;
};

export default convertColorPaletteToHex;
