/**
 * Manejo los mensajes que se muestran en pantalla.
 * @param {string} mensaje
 * @returns
 */
function log(mensaje) {
    console.log(mensaje);
}

/**
 * Manejo los mensajes de error internamente.
 * @param {Error} err
 */
function logError(err) {
    console.log(err);
}

module.exports = {
    log,
    logError
};