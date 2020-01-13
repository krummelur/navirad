import {AISHUB_CONFIG} from "../apiConfig";

export const fetchBoats = (latmin, latmax, lonmin, lonmax) => {
    return fetch("http://data.aishub.net/ws.php?username=" + AISHUB_CONFIG.apiKey + "&format=1&output=json&compress=0&latmin=" + latmin + "&latmax=" + latmax + "&lonmin=" + lonmin + "&lonmax=" + lonmax);
};