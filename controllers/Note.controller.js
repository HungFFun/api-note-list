const note = require("../models/Note.model");
const work = require("../models/Work.model");

const getListNote = async (req, res) => {
  try {
    const listNote = await note.find({}).populate("work");
    res.status(200).send(listNote);
  } catch (error) {
    res.status(400).send(error);
  }
};
const createNote = async (req, res) => {
  try {
    const { idUser, title, workList } = req.body;
    let listWork = [];
    workList.map((titleWork) => {
      const newWord = new work({
        titleWork: titleWork,
      });
      newWord.save();
      listWork.push(newWord._id);
    });
    const newNote = new note({
      user: idUser,
      work: listWork,
      title: title,
    });
    newNote
      .save()
      .then((value) => {
        res.status(200).send({ message: "Thêm thành công" });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getListNote,
  createNote,
};
