const projectDB = require("../data/helpers/projectModel")

function checkProjectID() {
  return (req, res, next) => {
    projectDB.getById(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(404).json({
          message: "Project not found",
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving the project",
      })
    })
  }
}

function checkProjectData() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "Missing project name",
      })
    }
    next()
  }
}

module.exports = {
  checkProjectID,
  checkProjectData,
}