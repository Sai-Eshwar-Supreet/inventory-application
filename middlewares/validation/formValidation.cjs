const { body, param } = require("express-validator");

const nameValidator = [
    body('name').isString().trim().notEmpty().withMessage('Name is required and must be a non-empty string')
];

const idValidator = [
    param('id').isInt().withMessage('ID must be an integer')
]

module.exports.body = {nameValidator};
module.exports.params = {idValidator};