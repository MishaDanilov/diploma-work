module.exports = [
  {
    name: "to_postgre",
    type: "postgres",
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    logging: ["error"],
    logging1: ["query", "error"],
    synchronize: true,
    entities: ["dist/src/entity/*.js"],
    migrations: ["dist/src/migration/**/*.js"],
    subscribers: ["dist/src/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/src/entity",
      migrationsDir: "dist/src/migration",
      subscribersDir: "dist/src/subscriber",
    },
  },
];
