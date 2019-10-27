import express from "express";
import uuid from 'uuidv4';

import { data as paymentData } from "../../../data/payments";
import { paymentsService } from "../../../services/payments";
import { auth } from "../../../services/auth";
import { ApproveError, ValidationError, CancelError } from '../../../services/errorHandler';

const router = express.Router();

// @route   GET v1/payments
// @desc    List of all payments
// @access  Private
router.get("/payments", auth.authenticateToken, async(req, res, next) => {
    try {
        const payments = paymentData.payments.filter(function (payment) {
            // Usually we would check to get a data for particular user (return payment.userId === userId)
            // But this is a test project :)
            return payment;
        });

        res.status(200).send(payments);
    } catch(err) {
        next(err);
    }
});

// @route   POST v1/payments
// @desc    Create payment
// @access  Private
router.post("/payments", auth.authenticateToken, async(req, res, next) => {
    try {
        const body = req.body;

        if(typeof body.amount !== "number") {
            const details = {
                message: body.amount ? "amount field is invalid" : "'amount' field is required",
                "path": ["amount"],
                "value": body.amount
            };

            next(new ValidationError(null, details));
            return;
        }

        // Generate id with uuid()
        body.id = uuid();

        // If payment system is "ingenico" process through YandexMoney
        if(body.paymentSystem === "ingenico") {
            body.paymentSystem = "yandexMoney";
        }

        // If paid with Mastercard -> use "PMB" payment method
        if(body.paymentMethod === "mastercard") {
            body.paymentMethod = "PMB";
        }

        // Convert USD payments to Rub
        if(body.currency === "USD") {
            const currentExchangeRate = 64.22;

            body.currency = "RUB";
            body.amount = Math.ceil(body.amount * currentExchangeRate * 100) / 100;
        }

        body.status = "created";  // Mark payment status as created

        // Just placeholder when no comment
        if(!body.comment) {
            body.comment = null;
        }

        // Set created and updated time
        body.created = new Date();
        body.updated = new Date();

        // Push to payments list
        paymentData.payments.push(body);

        res.status(201).json(body);
    } catch(err) {
        next(err);
    }
});


// @route   GET v1/payment/:id
// @desc    Get payment by id
// @access  Private
router.get("/payment/:id", auth.authenticateToken, async(req, res, next) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentsService.get(paymentId);

        res.json(payment);
    } catch(err) {
        next(err);
    }
});

// @route   PUT v1/payments/:id/approve
// @desc    Approve payment
// @access  Private
router.put("/payments/:id/approve", auth.authenticateToken, async(req, res, next) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentsService.get(paymentId);

        if (payment.status === "cancelled") {
            throw new ApproveError();
        }

        await paymentsService.updateStatus(payment, "approved");

        res.status(200).send();
    } catch(err) {
        next(err);
    }
});

// @route   PUT v1/payments/:id/cancel
// @desc    Cancel payment
// @access  Private
router.put("/payments/:id/cancel", auth.authenticateToken, async(req, res, next) => {
    try {
        const paymentId = req.params.id;
        const payment = await paymentsService.get(paymentId);

        if (payment.status === "approved") {
            throw new CancelError();
        }

        await paymentsService.updateStatus(payment, "cancelled");

        res.status(200).send();
    } catch(err) {
        next(err);
    }
});


module.exports = router;