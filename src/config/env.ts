import 'dotenv/config';

export const env = {
    POSTGRE_HOST: process.env.POSTGRE_HOST!,
    POSTGRE_PORT: Number(process.env.POSTGRE_PORT)!,
    POSTGRE_USER: process.env.POSTGRE_USER!,
    POSTGRE_PASSWORD: process.env.POSTGRE_PASSWORD!,
    POSTGRE_DB: process.env.POSTGRE_DB!,
}