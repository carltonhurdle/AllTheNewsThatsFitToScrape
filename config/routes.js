//scrape function from scripts
var scrape = require("../scripts/scrape");

//headlines & notes from controller
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

  //render the homepage
module.exports = function(router) {
  router.get("/", function(req, res) {
    res.render("home");
  });

  //render the handledbars page
  router.get("/saved", function(req, res) {
    res.render("saved");
  });

  //scrape more articles to add
  router.get("/api/fetch", function(req, res) {
    headlinesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back tomorrow!"
        });
      } else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  //get all headlines from db
  router.get("/api/headlines", function(req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query;
    }

    //run the headlinesController and res. article back in json
    headlinesController.get(query, function(data) {
      res.json(data);
    });
  });

  //delete a headline when specified
  router.delete("/api/headlines/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;

    //then delete
    headlinesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  //update a headline
  router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data) {
      res.json(data);
    });
  });

  //notes for a headline
  router.get("/api/notes/:headline_id?", function(req, res) {
    var query = {};
    if (req.params.headline_id) {
      query._id = req.params.headline_id;
    }

    //get method for all notes
    notesController.get(query, function(err, data) {
      res.json(data);
    });
  });

  //delete note with id
  router.delete("/api/notes/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  //save a new note
  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {
      res.json(data);
    });
  });
};
