const note = require("../models/Note.model");
const work = require("../models/Work.model");

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
    const { idUser, title, colorNote, pin, workList } = req.body;
    const newNote = new note({
      user: idUser,
      title: title,
      color: colorNote,
      pin: pin,
    });
    workList.map((item) => {
      const newWork = new work({
        idNote: newNote._id,
        titleWork: item,
      });
      newWork.save().catch((err) => {
        console.log(err);
      });
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

const pinNotes = async (req, res) => {
  try {
    const { id } = req.params;
    await note
      .findOne({ _id: id })
      .then(async (value) => {
        await note.findByIdAndUpdate(
          { _id: value._id },
          { $set: { pin: !value.pin } }
        );
        res.status(200).send({ message: "update thành công" });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateColorBackgroundNote = async (req, res) => {
  try {
    const { color } = req.body;
    const { id } = req.params;

    await note.findById({ _id: id }).then(async (value) => {
      await note.findByIdAndUpdate({ _id: id }, { $set: { color: color } });
      res.status(200).send({ message: "update thành công" });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await work.deleteMany({ idNote: id }).then(async (value) => {
      await note.findByIdAndDelete({ _id: id });
      res.status(200).send({ message: "Xóa thành công" });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const getNoteByID = async (req, res) => {
  try {
    const { id } = req.body;
    note
      .findById({ _id: id })
      .then((value) => {
        res.status(200).send(value);
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
  pinNotes,
  updateColorBackgroundNote,
  deleteNote,
  getNoteByID,
};
