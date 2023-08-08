export function isMobileDevice() {
    let isMobile = (typeof window.orientation !== "undefined") ||
        (navigator.userAgent.indexOf('IEMobile') !== -1) ||
        (navigator.userAgent.indexOf('Android') !== -1) ||
        (navigator.userAgent.toLowerCase().match(/mobile/i));
    return isMobile !== null;
}

export function isTouchEnabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

// Reads /public/strings-<LANGUAGE>.json and extracts the language from file title
// Making an array of available languages
export function getAvailableLanguages() {
    let languageStringFiles = Object.keys(import.meta.glob('../../public/lang/*/strings-*.json'))

    let availableLanguages = []

    languageStringFiles.forEach(lang => {
        let language = lang.slice(lang.indexOf('-') + 1, lang.indexOf('.json'))
        availableLanguages.push(language)
    })

    let languageSet = new Set(availableLanguages);

    return languageSet;
}

let languageSet = getAvailableLanguages()

export function getLanguage() {
    let lang = window.navigator.language.split('-')[0];

    // If the language is not supported, default to English
    if (!languageSet.has(lang)) {
        lang = 'en';
    }

    return lang;
}

export function getMaxPoints(points, data) {
    let currentData = data;

    let maxPoints = Object.assign({}, points);
    for (let i = 0; i < currentData.length; i++) {
        let question = currentData[i];
        for (let j = 0; j < question.responses.length; j++) {
            let scores = question.responses[j].scores;
            for (let k = 0; k < scores.length; k++) {
                let score = scores[k];
                maxPoints[score.nature] += score.points;
            }

        }
    }

    return maxPoints;
}