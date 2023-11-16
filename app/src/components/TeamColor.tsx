"use client";

import { IColorProps } from "@/interfaces/IColorProps";
import ColorThief, { RGBColor } from "colorthief";
import { useEffect } from "react";

const TeamColor = ({
  homeTeamPaletteColor,
  setHomeTeamPaletteColor,
  awayTeamPaletteColor,
  setAwayTeamPaletteColor
}: IColorProps) => {
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
            return luminance1 - luminance2;
          }
        );

        setAwayTeamPaletteColor(sortedAwayTeamPaletteColor);
      } else {
        awayTeamLogo.addEventListener("load", function () {
          const awayTeamPaletteColor = colorThief.getPalette(awayTeamLogo, 2);
          const sortedAwayTeamPaletteColor = awayTeamPaletteColor.sort(
            (color1, color2) => {
              const luminance1 = getLuminance(color1);
              const luminance2 = getLuminance(color2);
              return luminance1 - luminance2;
            }
          );

          setAwayTeamPaletteColor(sortedAwayTeamPaletteColor);
        });
      }
    }
  }, []);

  return (
    <>
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
      </div>
    </>
  );
};

export default TeamColor;
