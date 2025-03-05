import { CipherKey } from "crypto";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DATABASE_URL: string;
      secret: CipherKey;
    }
  }
}
