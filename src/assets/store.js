import { writable } from 'svelte/store';
import { getMaxPoints } from './utils.js';
import { getLanguage } from './utils.js';

let lang = getLanguage();

const [natures, questions, natureToPokemon, natureDescription, strings] = await Promise.all([
    fetch(`https://github.com/Nrosa01/pmd-quiz-online/tree/main/public/lang/${lang}/natures-${lang}.json`).then(res => res.json()),
    fetch(`https://github.com/Nrosa01/pmd-quiz-online/tree/main/public/lang/${lang}/questions-${lang}.json`).then(res => res.json()),
    fetch(`https://github.com/Nrosa01/pmd-quiz-online/tree/main/public/lang/${lang}/natureToPokemon-${lang}.json`).then(res => res.json()),
    fetch(`https://github.com/Nrosa01/pmd-quiz-online/tree/main/public/lang/${lang}/naturedescription-${lang}.json`).then(res => res.json()),
    fetch(`https://github.com/Nrosa01/pmd-quiz-online/tree/main/public/lang/${lang}/strings-${lang}.json`).then(res => res.json()),
]);

const point = natures.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
}, {});

export let store = writable({
    points: point,
    maxPoints: getMaxPoints(point, questions),
    questions: questions,
    natures: natures,
    natureToPokemon: natureToPokemon,
    natureDescription: natureDescription,
    strings: strings,
});

export const radialChartConfig = {
    plugins: {
      title: {
        display: true,
        text: getLanguage() === 'es' ? 'Naturalezas' : 'Natures',
        color: 'rgba(245, 245, 245, 1)',
        font: 
        {
            size: 20,
        },
        padding: {
            top: 0,
            bottom: 10,
        },
      },
      legend:
      {
          display: false,
      },
    },
    responsive: true,
    scale: {
        ticks: {
          display: false,
          beginAtZero: true,
          max: 90,
        },
        afterTickToLabelConversion: function(scaleInstance) {
          // overwrite the ticks and keep the first (never shown) and last
          var oldTicks = scaleInstance.ticks;
          scaleInstance.ticks = [oldTicks[0], oldTicks[oldTicks.length - 1]];
        }
      },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(245, 245, 245, 0.25)',
        },
        grid: 
        {
            lineWidth: 1.2,
            circular: true,
            color: 'rgba(245, 245, 245, 0.5)',
        },
        ticks:{
            display: false,
            maxTickLimit: 1,
        },
        pointLabels:
        {
            display: true,
            color: 'rgba(245, 245, 245, 0.9)',
            font:
            {
                size: 11,
            }
        },
        suggestedMin: 0,
      },
    },
    elements:
    {
        line:{
            lineBorderWidth: 3,
        },
        point:{
            radius: 0,
            pointBackgroundColor: 'rgba(255, 0, 0, 0)',
            pointBorderWidth: 0,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            color: 'rgba(0, 0, 0, 0)',
        }
    }
  }

  