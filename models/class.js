class Label {
    constructor(id, name, since, city) {
        this.id = id
        this.name = name
        this.since = since
        this.city = city
    }

    get formatSince() {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        return this.since.toLocaleDateString('id-ID', options)
    }
}

class LabelDetailDuration extends Label {
    constructor(id, name, since, city, averageDuration, minDuration, maxDuration) {
        super(id, name, since, city)
        this.since = since
        this.averageDuration = averageDuration
        this.minDuration = minDuration
        this.maxDuration = maxDuration
    }
    get formatSince() {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        return this.since.toLocaleDateString('id-ID', options)
    }
}

class Song {
    constructor(id, title, bandName, duration, genre, totalVote) {
        this.id = id
        this.title = title
        this.bandName = bandName
        this.duration = duration
        this.genre = genre
        this.totalVote = totalVote
    }
}

class SongDetail extends Song {
    constructor(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, companyName, since) {
        super(id, title, bandName, duration, genre, totalVote)
        this.createdDate = createdDate
        this.lyric = lyric
        this.imageUrl = imageUrl
        this.LabelId = LabelId
        this.companyName = companyName   
    }
    get formatDate() {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        return this.createdDate.toLocaleDateString('id-ID', options)
    }

    get secondDate() {
        const options =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(this.createdDate).toLocaleDateString('id-ID',options );

    }
}

module.exports = {Label, LabelDetailDuration, Song, SongDetail}