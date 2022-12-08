const { hashPassword, verifyPassword } = require("../helpers/bycript");
const { generateToken, verifyToken } = require("../helpers/jwt");
const {
  User,
  Doctor,
  Medicine,
  Prescription,
  MedicalRecord,
} = require("../models");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env["CLIENT_ID"];
const client = new OAuth2Client(CLIENT_ID);
const midtransClient = require("midtrans-client");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };
      const findUser = await User.findOne({ where: { email } });
      if (!findUser) throw { name: "Invalid email/password" };
      const checkPassword = verifyPassword(password, findUser.password);
      if (!checkPassword) throw { name: "Invalid email/password" };
      const payload = {
        id: findUser.id,
        email: findUser.email,
      };
      const access_token = generateToken(payload);
      res.status(200).json({ access_token, role: findUser.role });
    } catch (err) {
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await User.create({ username, email, password, role });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
  static async showDoctors(req, res, next) {
    try {
      const showDoctors = await Doctor.findAll();
      res.status(200).json(showDoctors);
    } catch (err) {
      next(err);
    }
  }
  static async createDoctor(req, res, next) {
    try {
      const { name, sip_number, gender, photoUrl, specialization, status } =
        req.body;
      const UserId = req.user.id;
      const newDoctor = await Doctor.create({
        name,
        sip_number,
        gender,
        photoUrl,
        specialization,
        status: "active",
        UserId,
      });
      res.status(201).json(newDoctor);
    } catch (err) {
      next(err);
    }
  }
  static async getDoctorById(req, res, next) {
    try {
      const { id } = req.params;
      const findDoctor = await Doctor.findByPk(id);
      if (!findDoctor) throw { name: "Doctor not found" };
      res.status(200).json(findDoctor);
    } catch (err) {
      next(err);
    }
  }
  static async changeDoctorStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Doctor.update({ status }, { where: { id } });
      res.status(200).json({ message: "Succes updated status" });
    } catch (err) {
      next(err);
    }
  }
  static async editDoctorProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { name, sip_number, gender, photoUrl, specialization, status } =
        req.body;
      await Doctor.update(
        { name, sip_number, gender, photoUrl, specialization, status },
        { where: { id } }
      );
      res.status(200).json({ message: "Succes updated doctor" });
    } catch (err) {
      next(err);
    }
  }
  static async addMedicine(req, res, next) {
    try {
      const { name, amount, dose, photoUrl } = req.body;
      const newMedicine = await Medicine.create({
        name,
        amount,
        dose,
        photoUrl,
      });
      res.status(201).json(newMedicine);
    } catch (err) {
      next(err);
    }
  }
  static async showAllMedicine(req, res, next) {
    try {
      const showMedicines = await Medicine.findAll();
      res.status(200).json(showMedicines);
    } catch (err) {
      next(err);
    }
  }
  static async showAllPrescription(req, res, next) {
    try {
      const showPrescription = await Prescription.findAll({
        include: [
          Medicine,
          {
            model: User,
            include: Doctor,
          },
        ],
      });
      res.status(200).json(showPrescription);
    } catch (err) {
      next(err);
    }
  }
  static async showPrescriptionById(req, res, next) {
    try {
      const { id } = req.params;
      const showPrescription = await Prescription.findByPk(id, {
        include: [
          Medicine,
          {
            model: User,
            include: Doctor,
          },
        ],
      });
      res.status(200).json(showPrescription);
    } catch (err) {
      next(err);
    }
  }
  static async showPrescriptionToDoctor(req, res, next) {
    try {
      const UserId = req.user.id;
      const showPrescription = await Prescription.findAll({
        where: { UserId },
        include: Medicine,
      });
      res.status(200).json(showPrescription);
    } catch (err) {
      next(err);
    }
  }
  static async addPrescription(req, res, next) {
    try {
      console.log({ masuk: "masuk" });
      const { medicineId } = req.params;
      const {
        patient_name,
        patient_age,
        patient_address,
        use_description,
        amount,
        dose,
      } = req.body;
      const UserId = req.user.id;
      const findMedicine = await Medicine.findOne({
        where: { id: medicineId, dose },
      });
      if (!findMedicine) throw { name: "Medicine not found" };
      if (findMedicine.amount - amount < 0) {
        throw { name: "Medicine is not enough" };
      }
      if (!amount) throw { name: "Amount is required" };
      await Medicine.decrement({ amount }, { where: { id: medicineId } });
      const newPrescription = await Prescription.create({
        patient_name,
        patient_age,
        patient_address,
        use_description,
        MedicineId: medicineId,
        UserId,
        status: "unclaimed",
      });
      res.status(201).json(newPrescription);
    } catch (err) {
      next(err);
    }
  }
  static async changePrescriptionStatus(req, res, next) {
    try {
      const { id } = req.params;
      await Prescription.update({ status: "claimed" }, { where: { id } });
      res.status(200).json({ message: "Succes updated prescription status" });
    } catch (err) {
      next(err);
    }
  }
  static async uploadFile(req, res, next) {
    const { patientName } = req.body;
    const image = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
    if (!image) throw { name: "Image is required" };
    const newMedicalRecord = await MedicalRecord.create({
      patient_name: patientName,
      image,
    });
    try {
      res.status(200).json({
        data: {
          file: newMedicalRecord,
          message: "Uploaded !",
        },
      });
    } catch (err) {
      next(err);
    }
  }
  static async showImageFile(req, res, next) {
    try {
      const showMedicalRecord = await MedicalRecord.findAll();
      res.status(200).json(showMedicalRecord);
    } catch (err) {
      next(err);
    }
  }
  static async handleGoogleSignIn(req, res, next) {
    try {
      console.log("masuk");
      const googleToken = req.headers.google_oauth_token;
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email, name } = payload;
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name.split(" ").join("_"),
          email,
          password: "google",
          role: "staff",
        },
        hooks: false,
      });
      console.log({
        message: `User ${email} found`,
        access_token: generateToken({ id: user.id }),
        user: { name },
      });
      res.status(200).json({
        message: `User ${email} found`,
        access_token: generateToken({ id: user.id }),
        user: { name },
      });
    } catch (error) {
      next();
    }
  }
  static async generateMidtrans(req, res, next) {
    try {
      const { prescriptionId } = req.params;
      const findPrescription = await Prescription.findByPk(prescriptionId);
      if (findPrescription.status === "claimed") {
        throw { name: "Prescription is claimed" };
      }
      const findUser = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION" + Math.floor(100000 + Math.random() * 9000000),
          gross_amount: 100000, //total pembayaran
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: findUser.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
