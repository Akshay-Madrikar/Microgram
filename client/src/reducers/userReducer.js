export const INTIAL_STATE = null;

const UserReducer = (state, action) => {
    switch(action.type) {
        case 'USER':
            return action.payload
        case 'CLEAR':
            return null
        case 'UPDATE':
            return {
                ...state,
                following: action.payload.following,
                followers: action.payload.followers
            }
        case 'UPDATE_PIC':
            return {
                ...state,
                pic: action.payload
            }
        default:
            return state;
    }
};

export default UserReducer;