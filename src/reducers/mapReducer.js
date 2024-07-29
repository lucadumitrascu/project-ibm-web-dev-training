const initialState = {
    maps: [
        {
            id: 0,
            matrix: [
                [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
                [1, 0, 0, 0, 6, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 4, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            id: 1,
            matrix: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 0, 1, 0, 0, 0, 7, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 5, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 5, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 5, 5, 0, 0, 0, 0, 1, 1],
                [1, 0, 5, 5, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 2, 1]
            ]
        },
        {
            id: 2,
            matrix: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 2],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 2, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            id: 3,
            matrix: [
                [1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 5, 0, 0, 0, 5, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 5, 0, 0, 0, 5, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 2],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            id: 4,
            matrix: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 4, 1],
                [2, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 2, 1]
            ]
        }
    ],
    mapIndex: 0,
};

const mapControllerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_MAP':
            return { ...state, mapIndex: action.payload.mapIndex };
        default:
            return state;
    }
};

export default mapControllerReducer;