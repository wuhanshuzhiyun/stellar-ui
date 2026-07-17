export default {
    modelValue: {
        type: Array,
        default: () => [],
    },
    rows: {
        type: Number,
        default: 0,
    },
    cols: {
        type: Number,
        default: 0,
    },
    width: {
        type: Number,
        default: 350,
    },
    height: {
        type: Number,
        default: 400,
    },
    seats: {
        type: Array,
        default: () => [],
    },
    seatSize: {
        type: Number,
        default: 40,
    },
    seatGap: {
        type: Number,
        default: 8,
    },
    borderRadius: {
        type: Number,
        default: 8,
    },
    borderWidth: {
        type: Number,
        default: 1,
    },
    bgColor: {
        type: String,
        default: '#ffffff',
    },
    borderColor: {
        type: String,
        default: '#e5e5e5',
    },
    selectedBgColor: {
        type: String,
        default: '',
    },
    selectedColor: {
        type: String,
        default: '#ffffff',
    },
    disabledBgColor: {
        type: String,
        default: '#cccccc',
    },
    showRowLabels: {
        type: Boolean,
        default: true,
    },
};