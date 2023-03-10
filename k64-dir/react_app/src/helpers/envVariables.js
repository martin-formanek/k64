export default function envVariables() {
    const env = window.location.host.indexOf('www.') && window.location.host || window.location.host.replace('www.', '');

    const path_DEV = `http://localhost/k64/k64-dir/web/`;
    const path_LIVE = `https://admin.${env}/`;
    const path_current = env === "localhost:3000" ? path_DEV : path_LIVE;

    const path_JSON_API = path_current;
    return path_JSON_API;
};