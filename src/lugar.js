const axios = require('axios');

/**
 * Obtengo las coordenadas de la ubicación que ingreso el usuario.
 * Mediante la API REST de Google Maps.
 * @param {string} direccion
 * @param {string} apiKey
 * @returns
 */
module.exports = async function obtenerLugar(direccion, apiKey) {
    const ret = {
        err: {
            error: null,
            mensaje: ''
        },
        direccion: '',
        lat: 0.0,
        lng: 0.0
    };
    try {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}+CA&key=${apiKey}`;
        const resp = await axios.get(url);
        const data = resp.data.results[0];
        const coord = data.geometry.location;

        ret.direccion = data.formatted_address;
        ret.lat = coord.lat;
        ret.lng = coord.lng;
        return ret;

    } catch (error) {

        ret.err.error = error;
        ret.err.mensaje = `Ocurrieron problemas al intentar obtener los datos de geolocalización de ${direccion}.`;
        return ret;
    }
}