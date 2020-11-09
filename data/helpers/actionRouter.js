const express = require("express");

const Actions = require("./actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "There was an error retrieving the data." });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "There was an error retrieving the data." });
    });
});

router.post("/", (req, res) => {
  if (!req.body.description || !req.body.project_id || !req.body.notes) {
    res
      .status(404)
      .json({ errorMessage: "Please provide a description, notes, and project id." });
  } else {
    Actions.insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The data could not be saved." });
      });
  }
});

router.put("/:id", (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          errorMessage: "The action with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The data could not be updated." });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          errorMessage: "The action with the specified id does not exist."
        });
      }
    })
    .catch();
});

module.exports = router;
