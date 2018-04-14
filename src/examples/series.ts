import { CircuitStorageData } from './types';

const data: CircuitStorageData = [
    {
        type: 'resistance',
        id: 'R_1',
        position: [700, 160],
        rotate: [[0, 1], [-1, 0]],
        text: 'right',
        params: ['1k'],
    },
    {
        type: 'resistance',
        id: 'R_2',
        position: [700, 320],
        rotate: [[0, 1], [-1, 0]],
        text: 'right',
        params: ['1k'],
    },
    {
        type: 'reference_ground',
        id: 'GND_1',
        position: [500, 420],
    },
    {
        type: 'voltage_meter',
        id: 'V_R1',
        position: [780, 160],
        text: 'right',
    },
    {
        type: 'dc_current_source',
        id: 'V_1',
        position: [500, 180],
        text: 'right',
        params: ['10m'],
    },
    {
        type: 'dc_voltage_source',
        id: 'V_2',
        position: [500, 300],
        text: 'right',
        params: ['12'],
    },
    {
        type: 'current_meter',
        id: 'I_in',
        position: [600, 100],
        text: 'top',
    },
    {
        type: 'line',
        way: [[700, 120], [700, 100]],
    },
    {
        type: 'line',
        way: [[780, 200], [780, 220], [700, 220]],
    },
    {
        type: 'line',
        way: [[700, 200], [700, 220]],
    },
    {
        type: 'line',
        way: [[700, 220], [700, 280]],
    },
    {
        type: 'line',
        way: [[500, 400], [500, 380]],
    },
    {
        type: 'line',
        way: [[500, 140], [500, 100], [580, 100]],
    },
    {
        type: 'line',
        way: [[620, 100], [700, 100]],
    },
    {
        type: 'line',
        way: [[700, 100], [780, 100], [780, 120]],
    },
    {
        type: 'line',
        way: [[500, 340], [500, 380]],
    },
    {
        type: 'line',
        way: [[500, 380], [700, 380], [700, 360]],
    },
    {
        type: 'line',
        way: [[500, 260], [500, 220]],
    },
];

export default data;
