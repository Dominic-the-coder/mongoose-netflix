const express = require("express");
const mongoose = require("mongoose");
const TVShow = require("./models/TVShow");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/shows", async (req, res) => {
    const show = new TVShow(req.body);
    await show.save();
    console.log("POST Successful");
    res.json(show);
});

app.get("/shows", async (req, res) => {
    const filter = {};

    if (req.query.genre) {
        filter.genre = req.query.genre;
    }

    if (req.query.rating) {
        filter.rating = { $gt: Number(req.query.rating) };
    }

    if (req.query.premiere_year) {
        filter.premiere_year = { $gt: Number(req.query.premiere_year) };
    }

    const shows = await TVShow.find(filter);
    res.json(shows);
});


app.put("/shows/:id", async (req, res) => {
    const updatedShow = await TVShow.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedShow)
})

app.delete("/shows/:id", async (req, res) => {
    await TVShow.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
})