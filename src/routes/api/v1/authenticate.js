import express from "express";
import { validationResult } from "express-validator";

import { auth } from "../../../services/auth";
import { ValidationError } from '../../../services/errorHandler';
import authenticateValidation from "../../../validation/authenticate"

const router = express.Router();;

// @route   POST v1/authenticate
// @desc    Get token
// @access  Private
router.post("/", [authenticateValidation], async (req, res, next) => {
    try {
      // Get validation errors
      const errors = validationResult(req);

      // If validation error
      if (!errors.isEmpty()) {
        next(new ValidationError());
        return;
      }

      // Generate token with OAuth2 Framework
      const token = await auth.generateToken(req, res, next);

      res.json({
        authToken: token.accessToken,
        expiresIn: token.accessTokenExpiresAt
      });
    } catch(err) {
      next(err);
    }
});

module.exports = router;