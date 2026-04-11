const Wildlife = require("../models/wildlife");

// GET all wildlife
const getAllWildlife = async (req, res) => {
  try {
    const wildlife = await Wildlife.find();
    res.status(200).json(wildlife);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single wildlife
const getSingleWildlife = async (req, res) => {
  try {
    const wildlife = await Wildlife.findById(req.params.id);

    if (!wildlife) {
      return res.status(404).json({ message: "Wildlife not found" });
    }

    res.status(200).json(wildlife);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE wildlife
const createWildlife = async (req, res) => {
  try {
    const {
      parkId,
      commonName,
      scientificName,
      category,
      description,
      habitat,
      conservationStatus
    } = req.body;

    // 🔥 FULL VALIDATION
    if (
      !parkId ||
      !commonName ||
      !scientificName ||
      !category ||
      !description ||
      !habitat ||
      !conservationStatus
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const newWildlife = new Wildlife(req.body);
    await newWildlife.save();

    res.status(201).json(newWildlife);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE wildlife
const updateWildlife = async (req, res) => {
  try {
    const updated = await Wildlife.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Wildlife not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE wildlife
const deleteWildlife = async (req, res) => {
  try {
    const deleted = await Wildlife.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Wildlife not found" });
    }

    res.status(200).json({ message: "Wildlife deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllWildlife,
  getSingleWildlife,
  createWildlife,
  updateWildlife,
  deleteWildlife
};