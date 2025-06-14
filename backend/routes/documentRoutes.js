const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  submitDocument,
  approveDocument,
  getStudentDocuments,
  getPendingDocumentsForApprover,
  getPanelMarksByStudent,
  deleteDocument,
  updateSubmittedDocument
} = require("../controllers/documentController");

// Student submits a document
router.post(
  "/submit",
  protect,
  authorizeRoles("Student"),
  submitDocument
);

// Approvers (Guide, Panel_Coordinator, Panel) update approval status
router.put(
  "/approve/:documentId",
  protect,
  authorizeRoles("Guide", "Panel Coordinator", "Panel"),
  approveDocument
);

// Student checks their submitted documents
router.get(
  "/my-documents",
  protect,
  authorizeRoles("Student"),
  getStudentDocuments
);

// For approvers to fetch pending documents for them
router.get(
  "/pending",
  protect,
  authorizeRoles("Guide", "Panel Coordinator", "Panel"),
  getPendingDocumentsForApprover
);

// to get documents marked by the panel
router.get(
  "/panel-marks/:studentId",
  protect,
  authorizeRoles("Guide", "Panel Coordinator", "Panel"), // adjust roles as needed
  getPanelMarksByStudent
);

// Student deletes their own document if not reviewed
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("Student"),
  deleteDocument
);

//students update their documents if not reviewed by guide
router.patch(
  "/update/:id", 
  protect, 
  updateSubmittedDocument);

module.exports = router;
