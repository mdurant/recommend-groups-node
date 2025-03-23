function validateUserId(userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        return 'El userId debe ser un número entero positivo';
    }
    return null;
}

module.exports = { validateUserId };