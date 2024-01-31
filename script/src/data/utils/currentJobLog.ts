import chalk from "chalk";
import dayjs from "dayjs";
import os from "os";

// OS
const systemOS = os.platform();

const currentJobLog = (currentJob: { cronString: string; date: string }) => {
  const date = dayjs(currentJob.date);

  const formatCronString = `${dayjs(date).get("D")}/${
    dayjs(date).month() + 1
  }/${dayjs(date).year()} - ${dayjs(date)
    .hour()
    .toString()
    .padStart(2, "0")}:${dayjs(date).minute().toString().padStart(2, "0")} (${
    currentJob.cronString
  })`;

  console.log(chalk.magenta(`✨ New Current job - ${formatCronString}`));
};

export default currentJobLog;
