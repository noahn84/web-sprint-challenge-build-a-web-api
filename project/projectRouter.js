const express = require("express")
const { checkProjectID, checkProjectData } = require("./project")
const projects = require("../data/helpers/projectModel")

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Congrats! You have made it to our API. Check /projects!",
  })
});

router.get("/projects", (req, res) => {
  projects.get()
    .then((projects) => {
      res.status(200).json(projects)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.get("/projects/:id", checkProjectID(), (req, res) => {
  res.status(200).json(req.project)
})

router.get("/projects/:id/actions", checkProjectID(), (req, res) => {
  projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post("/projects", checkProjectData(), (req, res) => {
  projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post("/projects/:id/actions", checkProjectID(), (res, req) => {
  if (!req.body.text) {
    res.status(400).json({
      message: "Need a value for text",
    })
  }

  projects.addProjectAction(req.params.id, req.body)
    .then((action) => {
      res.status(201).json(action)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router