export default {
  BOOKS: getFromEnv("booksTableName", "books"),
};

function getFromEnv(envKey: string, fallback: string): string {
  const envValue = process.env[envKey];
  if (typeof envValue === "string" && envValue !== "[object Object]") {
    return envValue;
  }
  return fallback;
}
