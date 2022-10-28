import { writable } from 'svelte/store';
import natures from './natures.json';
import { getMaxPoints } from './utils.js';

const point = natures.reduce((acc, cur) => {
    acc[cur] = 0;
    return acc;
}, {});

export let store = writable({
    points: point,
    maxPoints: getMaxPoints(point),
});

export const radialChartConfig = {
    plugins: {
      title: {
        display: true,
        text: 'Naturalezas'
      },
      legend:
      {
          display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        grid: 
        {
            lineWidth: 1.2,
        },
        ticks:{
            display: false,
            maxTickLimit: 1,
        }
      },
    },
    elements:
    {
        line:{
            lineBorderWidth: 3,
        },
        point:{
            radius: 0,
            pointBackgroundColor: 'rgba(255, 0, 0, 1)',
            pointBorderWidth: 1,
            pointBorderColor: 'rgba(0, 0, 0, 0.1)',
            color: 'rgba(0, 0, 0, 0)',
        }
    }
  }

  