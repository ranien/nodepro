const db = require("../models");
const Passengers = db.passenger;

exports.createRecord = (req, res) => {
  if (!req.body.passenger_name || !req.body.passenger_age) {
    res.send({
      message: "Mandatory fields are not provided...",
    });
  } else {
   Passengers.create({
      passenger_name: req.body.passenger_name,
      passenger_age: req.body.passenger_age,
    })
      .then((passenger_record) => {
        res.send({
          message: " created successfully",
          id: passenger_record.id,
        });
      })
      .catch((error) => {
        res.send({
          message: "Some error occured",
          error_details: error.message,
        });
      });
  }
};

exports.updateRecord = async (req, res) => {
  if (!req.body.id || !req.body.passenger_name || !req.body.passenger_age) {
    res.send({
      message: "Mandatory fields are not provided...",
    });
  } else {
    Passengers.findOne({
      where: { id: req.body.id },
    }).then(async (passenger_record) => {
      if (passenger_record) {
        passenger_record.passenger_name = req.body.passenger_name;
        passenger_record.passenger_age = req.body.passenger_age;
        await passenger_record
          .save()
          .then((result) => {
            res.send({
              message: "Record saved successfully",
            });
          })
          .catch((error) => {
            res.send({
              message: "Some error occured",
              error_details: error.message,
            });
            return;
          });
      } else {
        res.send({
          message: "Record not found...",
        });
      }
    });
  }
};

exports.getList = async (req, res) => {
  if (!req.body.user_id) {
    res.status(403).send({
      message: "Mandatory fields are not provided...",
    });
  } else {
    db.passenger.findAll({
      attributes: ["id", "passenger_name", "passenger_age"],
      order: [["id", "ASC"]],
    }).then((records) => {
      res.status(200).send({
        message: "Success",
        listData: records,
      });
    });
  }
};

exports.deleteRecord = async (req, res) => {
  if (!req.body.id) {
    res.send({
      message: "Mandatory fields are not provided...",
    });
  } else {
    Passengers.findOne({
      where: { id: req.body.id },
    }).then(async (passenger_record) => {
      if (passenger_record) {
        await passenger_record.destroy();
        res.send({
          message: "Record deleted successfully...",
        });
      } else {
        res.send({
          message: "Record not found...",
        });
      }
    });
  }
};