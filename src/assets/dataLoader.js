import { getLanguage } from "./utils.js";

function loadJSONSync(path) {
    let xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', path, false);
    xObj.send(null);
    return xObj.responseText;
}

let lang = getLanguage();
export let data = {
    "questions": JSON.parse(loadJSONSync(`/lang/${lang}/questions${lang}.json`)),
    "natures": JSON.parse(loadJSONSync(`/lang/${lang}/natures${lang.charAt(0).toUpperCase() + lang.slice(1)}.json`)),
    "natureToPokemon": JSON.parse(loadJSONSync(`/lang/${lang}/natureToPokemon${lang}.json`)),
}