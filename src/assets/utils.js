import { store } from './store.js';
import { data } from './dataLoader.js';

export function getQuestionData() {
   return data.questions;
}

export function getNatures() {
    return data.natures;
 }
 
 export function getNatureToPokemon() {
    return data.natureToPokemon;
 }

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

export function getLanguage() {
    return window.navigator.language.split('-')[0];
}

export function getMaxPoints(points, data = getQuestionData()) {
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