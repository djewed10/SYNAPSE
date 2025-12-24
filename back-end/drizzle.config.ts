import { defineConfig } from "drizzle-kit"

console.log(`url in drizzle config: ${process.env.DATABASE_URL}`)
export default defineConfig({
	schema: "./src/**/schema.ts",
	out: "./database-migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
})
