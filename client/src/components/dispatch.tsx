import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export  function changePage(page){
    dispatch({ type: 'changepage', page: page })
}

export function changeAuth(auth){
    dispatch({ type: 'changeauth', auth: auth })
}
