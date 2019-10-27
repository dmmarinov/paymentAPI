import uuid from 'uuidv4';

import { data as paymentData } from "../data/payments";

const validatePaymentId = async(paymentId) => {
    // Validate that payment id is UUID
    if(!uuid.is(paymentId)) {
        throw new Error(500, "Invalid payment id");
    }
};

const get = async(paymentId) => {
    try {
        await validatePaymentId(paymentId);

        const payments = paymentData.payments.filter(function (payment) {
            // (For demo) Usually, here we would check that payment belongs to this user
            const isOwner = payment.payerId;

            return isOwner && (payment.id === paymentId);
        });

        return payments[0] ? Promise.resolve(payments[0]) : Promise.reject(new Error(404, "Payment is not found"));
    } catch(err) {
        console.log(err);
    }
};

const updateStatus = async(payment, newStatus) => {
    try {
        let index = 0;

        // Simulate search in DB
        paymentData.payments.forEach((_payment, ind) => {
            if(_payment.id === payment.id) {
                index = ind;
            }
        });

        // Update status and updated date
        paymentData.payments[index].status = newStatus;
        paymentData.payments[index].updated = new Date();

        return paymentData.payments[index];
    } catch(err) {
        console.log(err);
    }
};

export const paymentsService = {
    get,
    updateStatus
};