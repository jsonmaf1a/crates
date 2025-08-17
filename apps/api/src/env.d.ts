declare module "bun" {
    interface Env {
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_NAME: string;
        DATABASE_USERNAME: string;
        DATABASE_PASSWORD: string;
        DATABASE_MAX: number;
        DISCOGS_API_KEY: string;
        PORT: number;
    }
}
