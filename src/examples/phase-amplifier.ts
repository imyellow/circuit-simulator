import { CircuitStorage } from './types';

const storage: CircuitStorage = {
    data: [
        {
            type: 'ac_voltage_source',
            id: 'V_1',
            position: [260, 240],
            rotate: [[0, 1], [-1, 0]],
            params: ['10', '200', '0', '0'],
        },
        {
            type: 'operational_amplifier',
            id: 'OP_1',
            position: [500, 220],
            rotate: [[1, 0], [0, 1]],
            params: ['120', '80M', '40'],
        },
        {
            type: 'resistance',
            id: 'R_1',
            position: [380, 240],
            rotate: [[1, 0], [0, 1]],
            params: ['10k'],
        },
        {
            type: 'reference_ground',
            id: 'GND_1',
            position: [160, 240],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'voltage_meter',
            id: 'V_in',
            position: [320, 320],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'reference_ground',
            id: 'GND_2',
            position: [320, 420],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'resistance',
            id: 'R_2',
            position: [500, 140],
            rotate: [[1, 0], [0, 1]],
            params: ['10k'],
        },
        {
            type: 'resistance',
            id: 'R_3',
            position: [380, 200],
            rotate: [[1, 0], [0, 1]],
            params: ['10k'],
        },
        {
            type: 'reference_ground',
            id: 'GND_3',
            position: [300, 200],
            rotate: [[0, 1], [-1, 0]],
        },
        {
            type: 'resistance',
            id: 'R_4',
            position: [560, 320],
            rotate: [[0, 1], [-1, 0]],
            params: ['10k'],
        },
        {
            type: 'voltage_meter',
            id: 'V_out',
            position: [620, 320],
            rotate: [[1, 0], [0, 1]],
        },
        {
            type: 'line',
            way: [[180, 240], [220, 240]],
        },
        {
            type: 'line',
            way: [[340, 240], [320, 240]],
        },
        {
            type: 'line',
            way: [[460, 240], [420, 240]],
        },
        {
            type: 'line',
            way: [[320, 280], [320, 240]],
        },
        {
            type: 'line',
            way: [[320, 240], [300, 240]],
        },
        {
            type: 'line',
            way: [[320, 400], [320, 380]],
        },
        {
            type: 'line',
            way: [[340, 200], [320, 200]],
        },
        {
            type: 'line',
            way: [[460, 200], [440, 200]],
        },
        {
            type: 'line',
            way: [[460, 140], [440, 140], [440, 200]],
        },
        {
            type: 'line',
            way: [[440, 200], [420, 200]],
        },
        {
            type: 'line',
            way: [[540, 140], [560, 140], [560, 220]],
        },
        {
            type: 'line',
            way: [[560, 280], [560, 220]],
        },
        {
            type: 'line',
            way: [[560, 220], [540, 220]],
        },
        {
            type: 'line',
            way: [[560, 360], [560, 380]],
        },
        {
            type: 'line',
            way: [[320, 380], [320, 360]],
        },
        {
            type: 'line',
            way: [[620, 280], [620, 220], [560, 220]],
        },
        {
            type: 'line',
            way: [[620, 360], [620, 380], [560, 380]],
        },
        {
            type: 'line',
            way: [[560, 380], [320, 380]],
        },
    ],
};

export default storage;
