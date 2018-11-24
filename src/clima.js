const axios = require('axios');

/**
 * Obtengo los datos del clima.
 * Mediante la API REST de Open Weathermap.
 * @param {string} direccion
 * @param {string} apiKey
 * @param {number} lat
 * @param {number} lng
 * @returns
 */
module.exports = async function obtenerClima(direccion, apiKey, lat, lng) {
    const ret = {
        err: {
            error: null,
            mensaje: ''
        },
        temperatura: 0.0,
        presion: 0.0,
        humedad: 0.0
    };
    try {

        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
        const resp = await axios.get(url);
        const data = resp.data.main;

        ret.temperatura = data.temp;
        ret.presion = data.pressure;
        ret.humedad = data.humidity;
        return ret;

    } catch (error) {

        ret.err.error = error;
        ret.err.mensaje = `Ocurrieron problemas al intentar obtener los datos del clima de ${direccion}.`;
        return ret;
    }
}