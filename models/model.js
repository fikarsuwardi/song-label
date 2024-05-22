"use strict"

const pool = require("../config/connection")
const {Label, LabelDetailDuration, Song, SongDetail} = require("./class")

class Model {
    static listLabels(cb) {
        const labelList = `SELECT * FROM "Labels" l ORDER BY "name" `
        // karena labelList masih string maka
        pool.query(labelList, (err, data) => {
            if (err) {
                cb (err, null);
            } else {
                const instanceLabelList = data.rows.map(i => {
                    const { id, name, since, city } = i
                    return new Label(id, name, since, city)
                })
                cb(null, instanceLabelList)
            }
        })
    }   

    static listLabelsDetail(cb) {
        const labelListDetail = ` SELECT l.id, l.name, l.since, l.city, CAST(AVG(duration) AS FLOAT) AS "AVG", CAST(MIN(duration)AS FLOAT) AS "MIN", 
        CAST(MAX(duration)AS FLOAT) AS "MAX" FROM "Labels" l LEFT JOIN "Songs" s ON l.id = s."LabelId" GROUP BY l.id`
        // karena labelListDetail masih string maka
        pool.query(labelListDetail, (err, data) => {
            if (err) {
                cb (err, null);
            } else {
                const instanceLabelListDetail = data.rows.map(i => {
                    if (i.AVG === 0) {
                        i.AVG = 0
                    }
                    if (i.MIN === 0) {
                        i.MIN = 0
                    }
                    if (i.MAX === 0) {
                        i.MAX = 0
                    }
                    return new LabelDetailDuration(i.id, i.name, i.since, i.city, +i.AVG, +i.MIN, +i.MAX)
                })
                cb(null, instanceLabelListDetail)
            }
        })
    }

    static listSongs(search, cb) {
        let listSongs = `SELECT id, title , "bandName" ,duration ,genre ,"totalVote"  FROM "Songs" ORDER BY "totalVote"`
        // karena listSongs masih string maka
        if(search) {
            listSongs = `SELECT * FROM "Songs" s WHERE title ILIKE '%${search}%';`
        }
        pool.query(listSongs, (err, data) => {
            if (err) {
                cb (err, null)
            } else {
                const instanceListSongs = data.rows.map(i => {
                    const { id, title, bandName, duration, genre, totalVote } = i
                    return new Song(id, title, bandName, duration, genre, totalVote)
                })
                cb(null, instanceListSongs)
            }
        })
    }

    static detailSongs(id, cb) {
        const detailSongs = `SELECT s.id, s.title, s."bandName" , s.duration , s.genre , s."totalVote" , s."createdDate" , s.lyric , s."imageUrl" , s."LabelId", l."name" AS "companyName", s."createdDate" FROM "Songs" s JOIN "Labels" l ON s."LabelId" = l.id WHERE s.id = ${id};`
        pool.query(detailSongs, (err, data) => {
            if (err) {
                cb (err, null)
            } else {
                const instanceDetailSongs = data.rows.map(i => {
                    const { id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, companyName } = i
                    return new SongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, companyName)
                })
                cb(null, instanceDetailSongs)
            }
        })
    }

    static postCreateSongs(title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate, cb) {
        let errors = []
        if (!title) {
            errors.push('Title is required')
        } else if (title.length > 100) {
            errors.push('Title maximal character is 100')
        }

        if (!bandName) {
            errors.push('Band Name harus diisi')
        }
        
        if (!duration) {
            errors.push('Duration harus diisi')
        } else if (duration < 60) {
            errors.push('Minimum duration is 60 second')
        }

        if (!genre) {
            errors.push('Pilih salah satu Genre')
        }

        if (!lyric) {
            errors.push('Lyric harus diisi')
        } else if (lyric.length < 10) {
            errors.push('Minimum word in lyric is 10')
        }

        if (!imageUrl) {
            errors.push('Image harus diisi')
        } else if (imageUrl.length > 50) {
            errors.push('Image URL name maximum chracter is 50')
        }

        if (!labelId) {
            errors.push('Pilih salah satu Label')
        }

        var today = new Date();
        if (!createdDate) {
            errors.push('Create Date harus diisi')
        } else if (createdDate == today) {
            errors.push('Maximum created date is today')
        }

        if (errors.length !== 0) {
            cb(errors)
        } else {
            let query = `INSERT INTO "Songs" (title, "bandName", duration, genre, lyric, "imageUrl", "LabelId", "createdDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
            let value = [title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate]
            pool.query(query, value, (err, data) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, data)
                }
            })
        }
    }

    static destroy(id, cb) {
        let query = `DELETE FROM "Songs" WHERE id = ${id}`
        pool.query(query, (err, data) => {
            if (err) {
                cb (err, null)
            } else {
                cb (null, data)
            }
        })
    }

    static postEditSongs(title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate, id, cb) {
        let errors = []
        if (!title) {
            errors.push('Title is required')
        } else if (title.length > 100) {
            errors.push('Title maximal character is 100')
        }

        if (!bandName) {
            errors.push('Band Name harus diisi')
        }
        
        if (!duration) {
            errors.push('Duration harus diisi')
        } else if (duration < 60) {
            errors.push('Minimum duration is 60 second')
        }

        if (!genre) {
            errors.push('Pilih salah satu Genre')
        }

        if (!lyric) {
            errors.push('Lyric harus diisi')
        } else if (lyric.length < 10) {
            errors.push('Minimum word in lyric is 10')
        }

        if (!imageUrl) {
            errors.push('Image harus diisi')
        } else if (imageUrl.length > 50) {
            errors.push('Image URL name maximum chracter is 50')
        }

        if (!labelId) {
            errors.push('Pilih salah satu Label')
        }

        var today = new Date();
        if (!createdDate) {
            errors.push('Create Date harus diisi')
        } else if (createdDate == today) {
            errors.push('Maximum created date is today')
        }

        if (errors.length !== 0) {
            cb(errors)
        } else {
            let query = `UPDATE "Songs" SET title = '${title}', "bandName" = '${bandName}', duration = ${duration},
            genre = '${genre}', lyric = '${lyric}', "imageUrl" = '${imageUrl}' , "LabelId" = ${labelId} , 
            "createdDate" = '${createdDate}' WHERE id = ${id}`
            pool.query(query, (err, data) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, data)
                }
            })
        }
    }

    static vote(id, cb) {
        let query = `UPDATE  "Songs" SET "totalVote" = "totalVote" + 1 WHERE id = ${id}`
        pool.query(query, (err, data) => {
            if(err) {
                cb(err, null)
            } else {
                cb(null, data)
            }
        })
    }
}

module.exports = Model