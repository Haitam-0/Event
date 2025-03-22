const express = require("express");
const router = express.Router();
const {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
} = require("../controllers/servicesController");

// Définition correcte des routes
router.route("/").get(getServices).post(createService);
router.route("/:id").get(getService).put(updateService).delete(deleteService);

module.exports = router;
