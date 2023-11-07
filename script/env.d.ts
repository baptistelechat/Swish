declare namespace NodeJS {
  interface ProcessEnv {
    HEADLESS: "0" | "1";
    NOTION_API_KEY: string;
    NOTION_GAME_DATABASE_ID: string;
    DAILY_CRON_JOB_HOUR: string;
    DAILY_CRON_JOB_MINUTE: string;
  }
}
