"use client";

import ColorThief, { RGBColor } from "colorthief";
import { useEffect, useState } from "react";

const TeamColor = () => {
  const [homeTeamPaletteColor, setHomeTeamPaletteColor] = useState<RGBColor[]>(
    []
  );
  const [awayTeamPaletteColor, setAwayTeamPaletteColor] = useState<RGBColor[]>(
    []
  );
  const [homeGradient, setHomeGradient] = useState("");
  const [awayGradient, setAwayGradient] = useState("");

  const getLuminance = (color: RGBColor) => {
    const [r, g, b] = color;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  useEffect(() => {
    const colorThief = new ColorThief();

    const homeTeamLogo = document.getElementById(
      "HomeTeamLogo"
    ) as HTMLImageElement;

    if (homeTeamLogo) {
      // Make sure image is finished loading
      if (homeTeamLogo.complete) {
        const homeTeamPaletteColor = colorThief.getPalette(homeTeamLogo, 2);
        const sortedHomeTeamPaletteColor = homeTeamPaletteColor.sort(
          (color1, color2) => {
            const luminance1 = getLuminance(color1);
            const luminance2 = getLuminance(color2);
            return luminance1 - luminance2;
          }
        );

        setHomeTeamPaletteColor(sortedHomeTeamPaletteColor);
        setHomeGradient(
          `rgb(${sortedHomeTeamPaletteColor[0][0]},${sortedHomeTeamPaletteColor[0][1]},${sortedHomeTeamPaletteColor[0][2]}) 0%, rgb(${sortedHomeTeamPaletteColor[1][0]},${sortedHomeTeamPaletteColor[1][1]},${sortedHomeTeamPaletteColor[1][2]}) 33%`
        );
      } else {
        homeTeamLogo.addEventListener("load", function () {
          const homeTeamPaletteColor = colorThief.getPalette(homeTeamLogo, 2);
          const sortedHomeTeamPaletteColor = homeTeamPaletteColor.sort(
            (color1, color2) => {
              const luminance1 = getLuminance(color1);
              const luminance2 = getLuminance(color2);
              return luminance1 - luminance2;
            }
          );

          setHomeTeamPaletteColor(sortedHomeTeamPaletteColor);
          setHomeGradient(
            `rgb(${sortedHomeTeamPaletteColor[0][0]},${sortedHomeTeamPaletteColor[0][1]},${sortedHomeTeamPaletteColor[0][2]}) 0%, rgb(${sortedHomeTeamPaletteColor[1][0]},${sortedHomeTeamPaletteColor[1][1]},${sortedHomeTeamPaletteColor[1][2]}) 33%`
          );
        });
      }
    }

    const awayTeamLogo = document.getElementById(
      "AwayTeamLogo"
    ) as HTMLImageElement;

    if (awayTeamLogo) {
      // Make sure image is finished loading
      if (awayTeamLogo.complete) {
        const awayTeamPaletteColor = colorThief.getPalette(awayTeamLogo, 2);
        const sortedAwayTeamPaletteColor = awayTeamPaletteColor.sort(
          (color1, color2) => {
            const luminance1 = getLuminance(color1);
            const luminance2 = getLuminance(color2);
            return luminance2 - luminance1;
          }
        );

        setAwayTeamPaletteColor(sortedAwayTeamPaletteColor);
        setAwayGradient(
          `rgb(${sortedAwayTeamPaletteColor[0][1]},${sortedAwayTeamPaletteColor[0][2]},${sortedAwayTeamPaletteColor[0][2]}) 66%, rgb(${sortedAwayTeamPaletteColor[1][1]},${sortedAwayTeamPaletteColor[1][2]},${sortedAwayTeamPaletteColor[1][2]}) 100%`
        );
      } else {
        awayTeamLogo.addEventListener("load", function () {
          const awayTeamPaletteColor = colorThief.getPalette(awayTeamLogo, 2);
          const sortedAwayTeamPaletteColor = awayTeamPaletteColor.sort(
            (color1, color2) => {
              const luminance1 = getLuminance(color1);
              const luminance2 = getLuminance(color2);
              return luminance2 - luminance1;
            }
          );

          setAwayTeamPaletteColor(sortedAwayTeamPaletteColor);
          setAwayGradient(
            `rgb(${sortedAwayTeamPaletteColor[0][1]},${sortedAwayTeamPaletteColor[0][2]},${sortedAwayTeamPaletteColor[0][2]}) 66%, rgb(${sortedAwayTeamPaletteColor[1][1]},${sortedAwayTeamPaletteColor[1][2]},${sortedAwayTeamPaletteColor[1][2]}) 100%`
          );
        });
      }
    }
  }, []);

  console.log(`linear-gradient(45deg, ${homeGradient},${awayGradient})`);

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-1">
        <div className="flex flex-col gap-1">
          {homeTeamPaletteColor.map((color) => (
            <div
              className="w-8 h-8 rounded"
              style={{
                backgroundColor: `rgb(${color[0]} ${color[1]} ${color[2]})`,
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {awayTeamPaletteColor.map((color) => (
            <div
              className="w-8 h-8 rounded"
              style={{
                backgroundColor: `rgb(${color[0]} ${color[1]} ${color[2]})`,
              }}
            />
          ))}
        </div>
      </div>
      <div
        className="w-full h-32 rounded"
        style={{
          background: `linear-gradient(45deg, ${homeGradient},${awayGradient})`,
        }}
      />
    </div>
  );
};

export default TeamColor;
