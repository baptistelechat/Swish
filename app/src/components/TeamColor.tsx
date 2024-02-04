"use client";

import convertColorPaletteToHex from "@/lib/convertColorPaletteToHex";
import sortColorPaletteByLuminance from "@/lib/sortColorPaletteByLuminance";
import useAwayTeamPaletteColorStore from "@/lib/store/awayTeamPaletteColor.store";
import useHomeTeamPaletteColorStore from "@/lib/store/homeTeamPaletteColor.store";
import ColorThief from "colorthief";
import { useEffect } from "react";

const TeamColor = () => {
  // HomeTeamPaletteColor
  const homeTeamPaletteColor = useHomeTeamPaletteColorStore(
    (s) => s.homeTeamPaletteColor
  );
  const setHomeTeamPaletteColor = useHomeTeamPaletteColorStore(
    (s) => s.setHomeTeamPaletteColor
  );

  // AwayTeamPaletteColor
  const awayTeamPaletteColor = useAwayTeamPaletteColorStore(
    (s) => s.awayTeamPaletteColor
  );
  const setAwayTeamPaletteColor = useAwayTeamPaletteColorStore(
    (s) => s.setAwayTeamPaletteColor
  );

  useEffect(() => {
    const colorThief = new ColorThief();

    const homeTeamLogo = document.getElementById(
      "HomeTeamLogo"
    ) as HTMLImageElement;

    if (homeTeamLogo) {
      // Make sure image is finished loading
      if (homeTeamLogo.complete) {
        const homeTeamPaletteColor = colorThief.getPalette(homeTeamLogo, 2);
        const sortedHomeTeamPaletteColor =
          sortColorPaletteByLuminance(homeTeamPaletteColor);
        const convertSortedHomeTeamPaletteColorToHex = convertColorPaletteToHex(
          sortedHomeTeamPaletteColor
        );

        setHomeTeamPaletteColor(convertSortedHomeTeamPaletteColorToHex);
      } else {
        homeTeamLogo.addEventListener("load", function () {
          const homeTeamPaletteColor = colorThief.getPalette(homeTeamLogo, 2);
          const sortedHomeTeamPaletteColor =
            sortColorPaletteByLuminance(homeTeamPaletteColor);
          const convertSortedHomeTeamPaletteColorToHex =
            convertColorPaletteToHex(sortedHomeTeamPaletteColor);

          setHomeTeamPaletteColor(convertSortedHomeTeamPaletteColorToHex);
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
        const sortedAwayTeamPaletteColor =
          sortColorPaletteByLuminance(awayTeamPaletteColor);
        const convertSortedAwayTeamPaletteColorToHex = convertColorPaletteToHex(
          sortedAwayTeamPaletteColor
        );

        setAwayTeamPaletteColor(convertSortedAwayTeamPaletteColorToHex);
      } else {
        awayTeamLogo.addEventListener("load", function () {
          const awayTeamPaletteColor = colorThief.getPalette(awayTeamLogo, 2);
          const sortedAwayTeamPaletteColor =
            sortColorPaletteByLuminance(awayTeamPaletteColor);
          const convertSortedAwayTeamPaletteColorToHex =
            convertColorPaletteToHex(sortedAwayTeamPaletteColor);

          setAwayTeamPaletteColor(convertSortedAwayTeamPaletteColorToHex);
        });
      }
    }
  }, [setAwayTeamPaletteColor, setHomeTeamPaletteColor]);

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            {homeTeamPaletteColor.map((color) => (
              <div
                className="size-8 rounded"
                key={color}
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {awayTeamPaletteColor.map((color) => (
              <div
                className="size-8 rounded"
                key={color}
                style={{
                  backgroundColor: color,
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
