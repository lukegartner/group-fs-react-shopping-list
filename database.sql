-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- Database name fs-react-shopping

CREATE TABLE "shoppinglist"(
    "id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
    "quantity" NUMERIC,
	"unit" VARCHAR(20),
    "purchased" BOOLEAN
);

INSERT INTO "shoppinglist" ("name", "quantity", "unit", "purchased")
VALUES ('bread', 2, 'loafs', false), 
('oatmilk', 1, 'half-gallon', true), 
('apples', 2.5, 'pounds', false);