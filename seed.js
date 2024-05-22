"use strict"

const pool = require("./config/connection")
const fs = require("fs")

const labels = JSON.parse(fs.readFileSync("./data/labels.json", "utf-8"))
const songs = JSON.parse(fs.readFileSync("./data/songs.json", "utf-8"))

let values = '';
labels.forEach((el, i) => {
    values += `('${el.name}', '${el.since}', '${el.city}')`;
    if (i !== labels.length - 1) {
        values += ',\n'
    }
});

let values2 = '';
songs.forEach((el, i) => {
    values2 += `('${el.title}', '${el.bandName}', '${el.duration}', '${el.genre}', '${el.createdDate}', '${el.lyric}', '${el.imageUrl}', '${el.totalVote}', '${el.LabelId}')`
    if (i !== songs.length - 1) {
        values2 += ",\n"
    }
});

// Jangan sampai diinsert manual
const query = `
    INSERT INTO "Labels" (name, since, city)
    VALUES
    ${values}
`
const query2 = `
    INSERT INTO "Songs" (title, "bandName", duration, genre, "createdDate", lyric, "imageUrl", "totalVote", "LabelId")
    VALUES
    ${values2}
`
pool.query(query, (err) => {
    if (err) {
        console.log("error 1");
        console.log(err, ">>>>>");
    } else {
        console.log("Seeding Labels Succes");
        pool.query(query2, (err) => {
            if(err) {
                console.log("error 2");
                console.log(err, "<<<<<<")
            } else {
                console.log("Seeding Songs Succes")
            }
        })
    }
});