"use strict"
const Model = require("../models/model")

class Controller {
  static listSongs(request, response){
    const search = request.query.search // p2r2: search song
    Model.listSongs(search, (err, result) => {
      if(err){
        response.send(err);
      } else {
        response.render('listSongs.ejs', {
          data: result
        });
      } 
    })
  }

  static detailSongs(request, response) {
    let id = +request.params.id;
    Model.detailSongs(id, (err, result) => {
      if (err) {
        response.send(err)
      } else {
        response.render('detailSongs.ejs', {
          data: result
        })
      }
    })
  }

  static getCreateSongs(request, response) {
    let errors = request.query.errors
    Model.listLabels((err, result) => {   // manggil model yang berfungsi u/ nampilin semua label
      if (err) {
        response.send(err)
      } else {
        response.render('addSongs.ejs', {
          result, errors
        })
      }
    })
  }

  static postCreateSongs(request, response) {
    let { title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate } = request.body
    // harus di desctructur dulu
    Model.postCreateSongs(title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate, (err, result) => {
      if (err) {
        console.log(err);
        response.redirect(`http://localhost:3000/songs/add?errors=${err}`)
      } else {
        response.redirect("http://localhost:3000/songs")
      }
    })
  }

  static getEditSongs(request, response) {
    let id = +request.params.id
    let errors = request.query.errors
    Model.detailSongs(id, (err, result) => {
      if (err) {
        response.send(err)
      } else {
        Model.listLabels((err, result2) => {
          if (err) {
            response.send(err)
          } else {
            let detail = result[0]
            let labels = result2
            response.render('./editSongsId.ejs', {
              detail, labels, errors
            })
          }
        })
      }
    })
  }

  static postEditSongs(request, response) {
    let { title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate} = request.body
    let id = +request.params.id
    Model.postEditSongs(title, bandName, duration, genre, lyric, imageUrl, labelId, createdDate, id, (err, result) => {
      if (err) {
        response.send(err)
      } else {
        response.redirect("/songs")
      }
    })
  }

  static delete(request, response) {
    // console.log(request.params);
    let id = +request.params.id
    Model.destroy(id, (err, data) => {
      if (err) {
        response.send(err)
      } else {
        response.redirect("/songs")
      }
    })
  }


  static vote(request, response) {
    let id = +request.params.id;
    Model.vote(id, (err, result) => {
      if (err) {
        response.send(err);
      } else {
        response.redirect(`/songs/${id}`);
      }
    });
  }

}
  
module.exports = Controller