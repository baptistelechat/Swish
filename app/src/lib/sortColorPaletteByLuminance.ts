import { RGBColor } from "colorthief";
import { ColorTranslator } from "colortranslator";

const sortColorPaletteByLuminance = (colorPalette: RGBColor[]) => {
  const sortedPalette = colorPalette.sort((color1, color2) => {
    const rgbColor1 = `rgb(${color1[0]},${color1[1]},${color1[2]})`;
    const rgbColor2 = `rgb(${color2[0]},${color2[1]},${color2[2]})`;

    const luminance1 = new ColorTranslator(rgbColor1).L;
    const luminance2 = new ColorTranslator(rgbColor2).L;
    
    return luminance1 - luminance2;
  });

  return sortedPalette;
};

export default sortColorPaletteByLuminance;
