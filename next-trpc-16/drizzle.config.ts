import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("URL not found");
}

export default defineConfig({
	out: "./drizzle",
	schema: "./db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: DATABASE_URL,
	},
	introspect: {
		casing: "camel",
	},

	breakpoints: true,
	strict: true,
	verbose: true,
});
