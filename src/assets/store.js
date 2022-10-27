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