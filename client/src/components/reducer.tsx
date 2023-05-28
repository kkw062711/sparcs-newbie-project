
const initialState = {
    page: "Home",
    auth: localStorage.getItem('auth')
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case "changepage":
            return {
                ...state,
                page: action.page
            }
            case 'changeauth':
                localStorage.setItem("auth",action.auth)
                return {
                    ...state,
                    auth: localStorage.getItem('auth')
                }
                default:
            
            return state;
    }
}




export type RootState = ReturnType<typeof Reducer>;