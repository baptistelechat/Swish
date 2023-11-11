import chalk from "chalk";
import dayjs from "dayjs";
import dotenv from "dotenv";
import cron from "node-cron";
import os from "os";
import currentJobLog from "./data/utils/currentJobLog";
import launchScraping from "./data/utils/launchScraping";
import getNotFinishedPages from "./data/utils/notion/getNotFinishedPages";
import getPagesAfterNow from "./data/utils/notion/getPagesAfterNow";

// OS
const systemOS = os.platform();

console.log(`💻 ${systemOS}`);

// Load environment variables from .env file
dotenv.config();

// Schedule the script to run periodically
(async () => {
  console.log(chalk.cyan(`🚀 Lancement ...`));

  const dailyCronJobHour =
    systemOS === "linux"
      ? Number(process.env.DAILY_CRON_JOB_HOUR) - 1
      : String(process.env.DAILY_CRON_JOB_HOUR);
  const dailyCronJobMinute = process.env.DAILY_CRON_JOB_MINUTE;

  cron.schedule(
    `${dailyCronJobMinute} ${dailyCronJobHour} * * * `,
    async () => {
      console.log(
        chalk.yellow(
          `⌛ Lancement quotidien - ${String(
            process.env.DAILY_CRON_JOB_HOUR
          )}h${String(dailyCronJobMinute)?.padStart(2, "0")}`
        )
      );
      await launchScraping();

      setTimeout(async () => {
        const scheduledGames = (await getPagesAfterNow()) as any[];

        const dates = scheduledGames.map((game) => {
          return game.properties.Date.date.start;
        });

        const datesUniques = [...new Set(dates)].filter((date) =>
          dayjs(date).isSame(dayjs(), "day")
        );

        datesUniques.sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        console.log(chalk.bgCyan("📅 Prochaine tâches :"));
        console.log(datesUniques);
        console.log("");

        const defaultCurrentJob = {
          cronString: "",
          date: "",
        };

        let currentJob = defaultCurrentJob;

        datesUniques.map(async (date, index) => {
          const convertedDate = dayjs(date);
          const cronString = `${convertedDate.minute()} ${
            systemOS === "linux"
              ? convertedDate.hour() - 1
              : convertedDate.hour()
          } * * ${convertedDate.day()}`;

          const formatCronString = `${dayjs(date).get("D")}/${
            dayjs(date).month() + 1
          }/${dayjs(date).year()} - ${
            systemOS === "linux"
              ? (dayjs(date).hour() - 1).toString().padStart(2, "0")
              : dayjs(date).hour().toString().padStart(2, "0")
          }:${dayjs(date)
            .minute()
            .toString()
            .padStart(2, "0")} (${cronString})`;

          if (currentJob.cronString === "") {
            currentJob = {
              cronString,
              date,
            };

            currentJobLog(currentJob);
          }

          cron.schedule(cronString, async () => {
            console.log(
              chalk.yellow(
                `⏰ Tâche principale - ${formatCronString}`
              )
            );

            if (currentJob.cronString === cronString) {
              await launchScraping();
            }

            const task = cron.schedule(`*/3 * * * *`, async () => {
              console.log(chalk.yellow(`⏰ Boucle 3min - ${formatCronString}`));

              if (currentJob.cronString === cronString) {
                await launchScraping();
                setTimeout(async () => {
                  const notFinishedPages = await getNotFinishedPages(date);

                  if (notFinishedPages.length === 0) {
                    if (datesUniques[index + 1]) {
                      const newConvertedDate = dayjs(datesUniques[index + 1]);
                      const newCronString = `${newConvertedDate.minute()} ${
                        systemOS === "linux"
                          ? newConvertedDate.hour() - 1
                          : newConvertedDate.hour()
                      } * * ${newConvertedDate.day()}`;

                      task.stop();

                      currentJob = {
                        cronString: newCronString,
                        date: datesUniques[index + 1],
                      };

                      console.log(
                        chalk.magenta(`❌ Stop - ${formatCronString}`)
                      );
                      currentJobLog(currentJob);
                    } else {
                      task.stop();
                      console.log(
                        chalk.magenta(`❌ Stop - ${formatCronString}`)
                      );
                      console.log(chalk.magenta("✅ Fin de journée"));

                      currentJob = defaultCurrentJob;
                    }
                  }
                }, 30 * 1000);
              }
            });
          });
        });
      }, 30 * 1000);
    }
  );
})();
