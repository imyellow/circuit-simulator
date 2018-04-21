import { CircuitStorage } from './types';

const storage: CircuitStorage = {
    data: [
        {
            type: 'resistance',
            id: 'R_1',
            params: ['10k'],
            position: [460, 180],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'resistance',
            id: 'R_2',
            params: ['5k'],
            position: [460, 380],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'resistance',
            id: 'R_3',
            params: ['1k'],
            position: [560, 280],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'resistance',
            id: 'R_4',
            params: ['5k'],
            position: [660, 180],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'resistance',
            id: 'R_5',
            params: ['10k'],
            position: [660, 380],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'ac_voltage_source',
            id: 'V_1',
            params: ['50', '50', '0', '0'],
            position: [340, 280],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'voltage_meter',
            id: 'V_R4',
            position: [760, 180],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'current_meter',
            id: 'I_R4',
            position: [560, 100],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'reference_ground',
            id: 'GND_1',
            position: [340, 500],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'line',
            way: [[340, 240], [340, 100], [460, 100]],
        },
        {
            type: 'line',
            way: [[660, 140], [660, 100]],
        },
        {
            type: 'line',
            way: [[460, 100], [460, 140]],
        },
        {
            type: 'line',
            way: [[340, 320], [340, 460]],
        },
        {
            type: 'line',
            way: [[660, 420], [660, 460], [460, 460]],
        },
        {
            type: 'line',
            way: [[460, 460], [460, 420]],
        },
        {
            type: 'line',
            way: [[460, 220], [460, 280]],
        },
        {
            type: 'line',
            way: [[660, 220], [660, 280]],
        },
        {
            type: 'line',
            way: [[520, 280], [460, 280]],
        },
        {
            type: 'line',
            way: [[460, 280], [460, 340]],
        },
        {
            type: 'line',
            way: [[600, 280], [660, 280]],
        },
        {
            type: 'line',
            way: [[660, 280], [660, 340]],
        },
        {
            type: 'line',
            way: [[460, 100], [540, 100]],
        },
        {
            type: 'line',
            way: [[760, 220], [760, 280], [660, 280]],
        },
        {
            type: 'line',
            way: [[340, 480], [340, 460]],
        },
        {
            type: 'line',
            way: [[340, 460], [460, 460]],
        },
        {
            type: 'line',
            way: [[580, 100], [660, 100]],
        },
        {
            type: 'line',
            way: [[660, 100], [760, 100], [760, 140]],
        },
    ],
};

export default storage;
