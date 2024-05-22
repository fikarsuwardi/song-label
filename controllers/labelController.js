"use strict"
const Model = require("../models/model")

class Controller {
  static home(req, res) {
    res.render(`home.ejs`)
  }

  static listLabels(request, response){
    Model.listLabels((err, result) => {
      if(err){
        response.send(err);
      } else {
        response.render('listLabels.ejs', {
          data: result
        });
      }
    })
  }

  static listLabelsDetail(request, response){
    Model.listLabelsDetail((err, result) => {
      if(err){
        response.send(err);
      } else {
        response.render('listLabelsDetail.ejs', {
          data: result
        });
      }
    })
  }
}
  
module.exports = Controller