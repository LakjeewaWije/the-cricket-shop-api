export default () => ({
  app: {
    env: process.env.ENV,
    port: process.env.APP_PORT,
    secret: process.env.SECRET,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});
