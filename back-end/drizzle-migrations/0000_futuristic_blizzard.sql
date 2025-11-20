CREATE TABLE
	"qcms-table" (
		"id" serial PRIMARY KEY NOT NULL,
		"name" text NOT NULL,
		"title" text NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"users" (
		"name" text NOT NULL
		"email" text NOT NULL ,
		CONSTRAINT "users_email_unique" UNIQUE ("email")
	);