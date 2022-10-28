import { store } from './store.js';
import dataEs from './dataEs.json';
import dataEn from './dataEn.json';
import naturesEs from './naturesEs.json';
import naturesEn from './naturesEn.json';

export function getQuestionData() {
    if (getLanguage() == 'es')
        return dataEs;
    else
        return dataEn;
}

export function getNatures() {
   if (getLanguage() == 'es')
        return naturesEs;
    else
        return naturesEn;
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