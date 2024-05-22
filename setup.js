"use strict"

const pool = require("./config/connection")

let query = `
    CREATE TABLE IF NOT EXISTS "Labels" (
	id SERIAL primary key,
	name VARCHAR(120) not null,
    since DATE not null,
    city VARCHAR(20) not null
);`

let query2 = `
    CREATE TABLE IF NOT EXISTS "Songs" (
    id SERIAL primary key,
    title VARCHAR(100),
    "bandName" VARCHAR(100),
    duration INTEGER,
    genre VARCHAR(10),
    "createdDate" DATE,
    lyric TEXT,
    "imageUrl" VARCHAR(150),
    "totalVote" INTEGER,
    "LabelId" INTEGER,
    FOREIGN KEY("LabelId") 
   		REFERENCES "Labels"(id)
   		ON DELETE CASCADE
   		ON UPDATE CASCADE
);`

// Async
pool.query(query, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Success create Labels`);
        pool.query(query2, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Success create Songs`);
                //pool.end()
            }
        });
    }
});
