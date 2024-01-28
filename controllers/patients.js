const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("patients").find();
    result.toArray().then((patients) => {
        res.setHeader("Content-type", "application/json");
        res.status(200).json(patients);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Users"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
    const patientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("patients").find({_id: patientId});
    result.toArray().then((patients) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(patients[0]);
    });
};

const createPatient = async (req, res) => {
    const { pacientInformation, clinicalInformation } = req.body;

    const patient = {
        firstName: pacientInformation.firstName,
        lastName: pacientInformation.lastName,
        age: pacientInformation.age,
        phone: pacientInformation.phone,
        rut: pacientInformation.rut,
        id: clinicalInformation.id,
        reason: clinicalInformation.reason,
        specification: clinicalInformation.specification
    };

    const response = await mongodb.getDatabase().db().collection("patients").insertOne(patient);
    if (response.acknowledged > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Sorry, the patient could not be created. Try again.");
    }
}


const updatePatient = async (req, res) => {
    //#swagger.tags=["Users"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
      }

    const patientId = new ObjectId(req.params.id);
    const patient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection("patients").replaceOne({_id: patientId}, patient);
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the patient.");
    }
}

const deletePatient = async (req, res) => {
    //#swagger.tags=["Users"]

    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid patient id to delete a patient.');
    }

    const patientId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("patients").deleteOne({_id: patientId}, true);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the patient.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createPatient,
    updatePatient,
    deletePatient
};