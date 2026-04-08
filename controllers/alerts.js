const mongoose = require("mongoose");
const Alert = require("../models/Alert");

const getAllAlerts = async (req, res) => {
  /* #swagger.tags = ['Alerts']
        #swagger.description = 'Retrieve all alerts with pagination, optionally filtered by parkId'
        #swagger.parameters['parkId'] = {
          in: 'query',
          description: 'Optional park ObjectId used to filter alerts',
          required: false,
          type: 'string'
       }
       #swagger.parameters['page'] = {
          in: 'query',
          description: 'Page number (default: 1)',
          required: false,
          type: 'integer'
       }
       #swagger.parameters['limit'] = {
          in: 'query',
          description: 'Number of results per page (default: 10)',
          required: false,
          type: 'integer'
       }
    */
  try {
    const filter = {};

    if (req.query.parkId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.parkId)) {
        return res.status(400).json({ error: "Invalid parkId." });
      }

      filter.parkId = req.query.parkId;
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [alerts, total] = await Promise.all([
      Alert.find(filter).skip(skip).limit(limit),
      Alert.countDocuments(filter)
    ]);

    return res.status(200).json({
      data: alerts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching alerts."
    });
  }
};

const getAlertById = async (req, res) => {
  /* #swagger.tags = ['Alerts']
       #swagger.description = 'Retrieve a single alert by its ID'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Alert ObjectId',
          required: true,
          type: 'string'
       }
    */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid alert id." });
    }

    const alert = await Alert.findById(id);

    if (!alert) {
      return res.status(404).json({ error: "Alert not found." });
    }

    return res.status(200).json(alert);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while fetching the alert."
    });
  }
};

const createAlert = async (req, res) => {
  /* #swagger.tags = ['Alerts']
       #swagger.description = 'Create a new alert. Authentication required.'
       #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Alert object',
          required: true,
          schema: {
             "parkId": "64f1234567890abcde654321",
             "title": "Trail Closure",
             "description": "The North Rim Trail is temporarily closed due to rockfall.",
             "category": "closure",
             "startDate": "2026-04-01",
             "endDate": "2026-04-15",
             "isActive": true
          }
       }
    */
  try {
    const alert = await Alert.create(req.body);
    return res.status(201).json(alert);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while creating the alert."
    });
  }
};

const updateAlert = async (req, res) => {
  /* #swagger.tags = ['Alerts']
       #swagger.description = 'Update an alert by its ID. Authentication required.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Alert ObjectId',
          required: true,
          type: 'string'
       }
       #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Alert fields to update',
          schema: {
             "title": "Trail Closure Update",
             "description": "Closure extended because of weather conditions.",
             "category": "warning",
             "isActive": true
          }
       }
    */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid alert id." });
    }

    const alert = await Alert.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true
    });

    if (!alert) {
      return res.status(404).json({ error: "Alert not found." });
    }

    return res.status(200).json(alert);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
        
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({
      error: error.message || "An error occurred while updating the alert."
    });
  }
};

const deleteAlert = async (req, res) => {
  /* #swagger.tags = ['Alerts']
       #swagger.description = 'Delete an alert by its ID. Authentication required.'
       #swagger.parameters['id'] = {
          in: 'path',
          description: 'Alert ObjectId',
          required: true,
          type: 'string'
       }
    */
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid alert id." });
    }

    const alert = await Alert.findByIdAndDelete(id);

    if (!alert) {
      return res.status(404).json({ error: "Alert not found." });
    }

    return res.status(200).json({ message: "Alert deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An error occurred while deleting the alert."
    });
  }
};

module.exports = {
  getAllAlerts,
  getAlertById,
  createAlert,
  updateAlert,
  deleteAlert
};