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
        text: 'Naturalezas',
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
            color: 'rgba(245, 245, 245, 0.5)',
        },
        ticks:{
            display: false,
            maxTickLimit: 1,
        },
        pointLabels:
        {
            color: 'rgba(245, 245, 245, 0.9)',
            font:
            {
                size: 11,
            }
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
            pointBackgroundColor: 'rgba(255, 0, 0, 0)',
            pointBorderWidth: 0,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            color: 'rgba(0, 0, 0, 0)',
        }
    }
  }

  