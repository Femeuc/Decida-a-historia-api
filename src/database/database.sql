CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "story_checkpoint" int
);

CREATE TABLE "page" (
  "id" SERIAL PRIMARY KEY,
  "story" text NOT NULL,
  "button1" int NOT NULL,
  "button2" int NOT NULL
);

CREATE TABLE "button" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "linked_page" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("story_checkpoint") REFERENCES "page" ("id");

ALTER TABLE "page" ADD FOREIGN KEY ("button1") REFERENCES "button" ("id");

ALTER TABLE "page" ADD FOREIGN KEY ("button2") REFERENCES "button" ("id");

ALTER TABLE "button" ADD FOREIGN KEY ("linked_page") REFERENCES "page" ("id");
