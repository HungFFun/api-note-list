const work = require("../models/Work.model");
const note = require("../models/Note.model");

const updateStatusWork = async (req, res) => {
  try {
    const { id } = req.params;
    await work.findById({ _id: id }).then(async (value) => {
      await work.findByIdAndUpdate(
        { _id: id },
        { $set: { isCompleted: !value.isCompleted } }
      );
      res.status(200).send({ message: "update thanh cong" });
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
module.exports = {
  addWordOnNote,
  remoteWork,
  updateStatusWork,
};
