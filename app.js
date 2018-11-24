const yargs = require('yargs');
const obtenerLugar = require('./src/lugar');
const obtenerClima = require('./src/clima');
const log = require('./src/log');

const argv = yargs
    .usage('Uso: $0 <comando> [opción]')
    .command('d', 'Nombre de la localidad y provicia')
    .example('node $0 -d "concordia entre rios"')
    .alias('d', 'direccion')
    .demandOption('d').argv;

const API_KEY_GOOGLE_MAP = 'AIzaSyAJ2aEs0UpGAW-G4mleFU6nasD6U1RkfT0';
const API_KEY_OPEN_WEATHERMAP = '1807420852ff52c5bd867004d74f398d';

/**
 * Envio las consultas a cada servicio, para obtener los datos del clima.
 * Para finalmente, mostrarlos de forma ordenada por pantalla.
 * @param {string} direccion
 * @param {string} apiKeyGoogle
 * @param {string} apiKeyOpenWeat
 * @returns
 */
async function comenzar(direccion, apiKeyGoogle, apiKeyOpenWeat) {

    const coordenadas = await obtenerLugar(direccion, apiKeyGoogle);
    const clima = await obtenerClima(direccion, apiKeyOpenWeat, coordenadas.lat, coordenadas.lng);

    if (coordenadas.err.error) {
        // log.logError(coordenadas.err.error);
        log.log(coordenadas.err.mensaje);
        return;
    }

    if (clima.err.error) {
        // log.logError(clima.err.error);
        log.log(clima.err.mensaje);
        return;
    }

    log.log(` \n El Clima en ${coordenadas.direccion}.\n Temperatura: ${clima.temperatura}°C\n Presion: ${clima.presion}\n Humedad: ${clima.humedad}`);
}

comenzar(argv.direccion, API_KEY_GOOGLE_MAP, API_KEY_OPEN_WEATHERMAP);