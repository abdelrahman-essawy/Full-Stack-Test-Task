export default () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
  DATABASE_MIGRATIONS_RUN: process.env.DATABASE_MIGRATIONS_RUN,
});
