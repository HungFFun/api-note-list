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

const addWordOnNote = async (req, res) => {
  try {
    const { idUser, idNote, titleWork } = req.body;

    const newWork = new work({
      titleWork: titleWork,
    });
    await newWork.save();
    await note
      .findOneAndUpdate(
        { _id: idNote, user: idUser },
        { $push: { work: newWork._id } }
      )
      .then((value) => {
        res.status(200).send({ message: "Thêm thành công " });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
const remoteWork = async (req, res) => {
  try {
    const { idUser, idNote, idWork } = req.body;
    await note
      .findOneAndUpdate(
        { _id: idNote, user: idUser },
        { $pull: { work: idWork } }
      )
      .then(async (value) => {
        await work.findByIdAndDelete({ _id: idWork });
        res.status(200).send({ message: "Xóa thành công " });
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
    const { idUser, idNote } = req.body;
    const noteFind = await note
      .findOne({ _id: idNote, user: idUser })
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
const updateStatusWork = async (req, res) => {
  try {
    const { idWork } = req.body;
    await work.findById({ _id: idWork }).then(async (value) => {
      await work.findByIdAndUpdate(
        { _id: idWork },
        { $set: { isCompleted: !value.isCompleted } }
      );
      res.status(200).send({ message: "update thanh cong" });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateColorBackgroundNote = async (req, res) => {
  try {
    const { idNote, color } = req.body;
    await note.findById({ _id: idNote }).then(async (value) => {
      await note.findByIdAndUpdate({ _id: idNote }, { $set: { color: color } });
      res.status(200).send({ message: "update thanh cong" });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getListNote,
  createNote,
  addWordOnNote,
  remoteWork,
  pinNotes,
  updateStatusWork,
  updateColorBackgroundNote,
};
