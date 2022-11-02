export function isMobileDevice() {
    let isMobile = (typeof window.orientation !== "undefined") || 
    (navigator.userAgent.indexOf('IEMobile') !== -1) || 
    (navigator.userAgent.indexOf('Android') !== -1) ||
    (navigator.userAgent.toLowerCase().match(/mobile/i));
    return isMobile !== null;
}


export function isTouchEnabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

// Currently we only support English and Spanish
export function getLanguage() {
    let lang = window.navigator.language.split('-')[0];

    return lang === 'es' ? 'es' : 'en';
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