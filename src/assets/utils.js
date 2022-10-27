import { store } from './store.js';
import data from './dataEs.json';

export function getQuestionData()
{
    return data;
}

export function getMaxPoints(points, data = getQuestionData())
{
    let currentData = data;

    let maxPoints = Object.assign({}, points);
    for (let i = 0; i < currentData.length; i++)
    {
        let question = currentData[i];
        for (let j = 0; j < question.responses.length; j++)
        {
            let scores = question.responses[j].scores;
            for (let k = 0; k < scores.length; k++)
            {
                let score = scores[k];
                maxPoints[score.nature] += score.points;
            }
            
        }
    }

    return maxPoints;
}