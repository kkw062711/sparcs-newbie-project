
const initialState = {
    page: "Home",
    auth: localStorage.getItem('auth'),
    room: 0//localStorage.getItem('room')
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case "changepage":
            return {
                ...state,
                page: action.page
            }
        case 'changeauth':
            localStorage.setItem("auth", action.auth)
            return {
                ...state,
                auth: localStorage.getItem('auth')
            }
        case 'changeroom':
            // console.log(action.room)
            // localStorage.setItem("room", action.rooom)
            return {
                ...state,
                room: action.room//localStorage.getItem("room")
            }
        default:
            return state;
    }
}




export type RootState = ReturnType<typeof Reducer>;