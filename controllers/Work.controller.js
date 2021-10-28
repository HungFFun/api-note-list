const work = require("../models/Work.model");

const getWorkByIdNote = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    await work
      .find({ idNote: id })
      .then((value) => {
        res.status(200).send(value);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (err) {
    res.status(400).send(err);
  }
};

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

const addWork = async (req, res) => {
  try {
    const { idNote, titleWork } = req.body;
    const newWork = new work({
      idNote: idNote,
      titleWork: titleWork,
    });
    await newWork
      .save()
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
    const { id } = req.params;
    await work
      .findByIdAndDelete({ _id: id })
      .then(async (value) => {
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
  addWork,
  remoteWork,
  updateStatusWork,
  getWorkByIdNote,
};
