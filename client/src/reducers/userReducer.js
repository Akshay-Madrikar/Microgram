export const INTIAL_STATE = null;

const userReducer = (state, action) => {
    if(action.type === 'USER') {
        return action.payload
    } 
    return state;
};

export default userReducer;