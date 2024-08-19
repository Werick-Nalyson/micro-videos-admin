import { config as readEnv } from 'dotenv'
import { join } from 'path'

export class Config {
  static env: any = null;

  static db () {
    Config.readEnv()

    return {
      dialect: 'sqlite',
      host: Config.env.DB_HOST,
      logging: Config.env.DB_LOGGING === 'true'
    }
  }

  static readEnv () {
    if (Config.env) {
      return;
    }

    Config.env = readEnv({
      path: join(process.cwd(), `envs/.env.${process.env.NODE_ENV}`)
    }).parsed
  }
}
