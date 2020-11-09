const express = require("express");

const Projects = require("./projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The data could not be retrieved." });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          errorMessage: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The data could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(404)
      .json({ errorMessage: "Please provide a name and description." });
  } else {
    Projects.insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The data could not be saved." });
      });
  }
});

router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(404)
      .json({ errorMessage: "Please provide a name and description." });
  } else {
    Projects.update(req.params.id, req.body)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(400).json({
            errorMessage: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The data could not be saved." });
      });
  }
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          errorMessage: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The data could not be removed." });
    });
});

module.exports = router;