import { CircuitStorage } from './types';

const storage: CircuitStorage = {
    config: {
        endTime: '20m',
        stepSize : '2u',
    },
    data: [
        {
            type: 'dc_voltage_source',
            id: 'V_1',
            position: [220, 100],
            rotate: [[0, 1], [-1, 0]],
            params: ['20'],
        },
        {
            type: 'reference_ground',
            id: 'GND_1',
            position: [140, 100],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'resistance',
            id: 'R_1',
            position: [300, 180],
            rotate: [[0, 1], [-1, 0]],
            params: ['10k'],
        },
        {
            type: 'resistance',
            id: 'R_2',
            position: [300, 380],
            rotate: [[0, 1], [-1, 0]],
            params: ['10k'],
        },
        {
            type: 'resistance',
            id: 'R_4',
            position: [400, 400],
            rotate: [[0, 1], [-1, 0]],
            params: ['680'],
        },
        {
            type: 'transistor_npn',
            id: 'Q_1',
            position: [380, 280],
            rotate: [[1, 0], [0, 1]],
            params: ['40', '26', '0.6', '1'],
        },
        {
            type: 'resistance',
            id: 'R_5',
            position: [600, 400],
            rotate: [[0, 1], [-1, 0]],
            params: ['100k'],
        },
        {
            type: 'capacitor',
            id: 'C_1',
            position: [500, 340],
            rotate: [[1, 0], [0, 1]],
            params: ['10n'],
        },
        {
            type: 'capacitor',
            id: 'C_2',
            position: [240, 280],
            rotate: [[1, 0], [0, 1]],
            params: ['10μ'],
        },
        {
            type: 'ac_voltage_source',
            id: 'V_2',
            position: [120, 360],
            rotate: [[1, 0], [0, 1]],
            params: ['3', '1k', '0', '0'],
        },
        {
            type: 'voltage_meter',
            id: 'V_in',
            position: [180, 360],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'voltage_meter',
            id: 'V_out',
            position: [660, 400],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'reference_ground',
            id: 'GND_2',
            position: [120, 500],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'line',
            way: [[160, 100], [180, 100]],
        },
        {
            type: 'line',
            way: [[260, 100], [300, 100]],
        },
        {
            type: 'line',
            way: [[400, 320], [400, 340]],
        },
        {
            type: 'line',
            way: [[300, 220], [300, 280]],
        },
        {
            type: 'line',
            way: [[300, 340], [300, 280]],
        },
        {
            type: 'line',
            way: [[300, 280], [360, 280]],
        },
        {
            type: 'line',
            way: [[280, 280], [300, 280]],
        },
        {
            type: 'line',
            way: [[180, 320], [180, 280]],
        },
        {
            type: 'line',
            way: [[120, 320], [120, 280], [180, 280]],
        },
        {
            type: 'line',
            way: [[180, 280], [200, 280]],
        },
        {
            type: 'line',
            way: [[120, 480], [120, 460]],
        },
        {
            type: 'line',
            way: [[180, 400], [180, 460]],
        },
        {
            type: 'line',
            way: [[120, 400], [120, 460]],
        },
        {
            type: 'line',
            way: [[300, 420], [300, 460]],
        },
        {
            type: 'line',
            way: [[180, 460], [120, 460]],
        },
        {
            type: 'line',
            way: [[400, 440], [400, 460]],
        },
        {
            type: 'line',
            way: [[300, 460], [180, 460]],
        },
        {
            type: 'line',
            way: [[600, 440], [600, 460]],
        },
        {
            type: 'line',
            way: [[400, 460], [300, 460]],
        },
        {
            type: 'line',
            way: [[660, 440], [660, 460], [600, 460]],
        },
        {
            type: 'line',
            way: [[600, 460], [400, 460]],
        },
        {
            type: 'line',
            way: [[400, 240], [400, 100], [300, 100]],
        },
        {
            type: 'line',
            way: [[300, 100], [300, 140]],
        },
        {
            type: 'line',
            way: [[540, 340], [600, 340]],
        },
        {
            type: 'line',
            way: [[660, 360], [660, 340], [600, 340]],
        },
        {
            type: 'line',
            way: [[600, 340], [600, 360]],
        },
        {
            type: 'line',
            way: [[460, 340], [400, 340]],
        },
        {
            type: 'line',
            way: [[400, 340], [400, 360]],
        },
    ],
};

export default storage;
