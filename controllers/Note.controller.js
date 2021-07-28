const note = require("../models/Note");
const word = require("../models/Word");

const getListNote = async (req, res) => {
  try {
    const listNote = await note.find({});
    res.status(200).send(listNote);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createNote = async (req, res) => {
  try {
    const { idUser, title } = res.body;

    const newWord = new word({
      title: title,
    });

    let listWord = [];
    listWord.push(newWord._id);

    const newNote = new note({
      user: idUser,
      listWord: listWord,
    });

    console.log(newNote);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getListNote,
  createNote,
};
