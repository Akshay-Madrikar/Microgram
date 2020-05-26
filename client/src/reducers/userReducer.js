export const INTIAL_STATE = null;

const userReducer = (state, action) => {
    switch(action.type) {
        case 'USER':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state;
    }
};

export default userReducer;