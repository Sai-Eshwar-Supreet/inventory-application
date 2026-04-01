const { body, param } = require("express-validator");

const nameValidator = [
    body('name').isString().trim().notEmpty().withMessage('Name is required and must be a non-empty string')
];

const descriptionValidator = [
    body('description').isString().trim().notEmpty().withMessage('Description is required and must be a non-empty string')
];

const genreIdsValidator = [
    body('genres').isArray({ min: 1 }).withMessage('At least one genre must be selected'),
    body('genres.*').isInt().withMessage('Genre IDs must be integers')
];

const developersIdsValidator = [
    body('developers').isArray({ min: 1 }).withMessage('At least one developer must be selected'),
    body('developers.*').isInt().withMessage('Developer IDs must be integers')
];

const idValidator = [
    param('id').isInt().withMessage('ID must be an integer')
];

module.exports.body = {nameValidator, descriptionValidator, genreIdsValidator, developersIdsValidator};
module.exports.params = {idValidator};