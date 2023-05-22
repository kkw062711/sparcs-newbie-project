
const initialState = {
    page: "Home",
    auth: false
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case "changepage":
            return {
                ...state,
                page: action.page
            }
            case 'changeauth':
                return {
                    ...state,
                    auth: action.auth
                }
                default:
            
            return state;
    }
}




export type RootState = ReturnType<typeof Reducer>;