1. 리덕스 오류 해결
2. 리액트-리액트 돔 버전 오류 해결
3. Dispatch 함수 사용법
->
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
const changePage = (page) =>{
  dispatch({type:'changepage', page:page})
}
const changeAuth = () =>{
    dispatch({type:'changeauth'})
  }
꼴로 사용
※외부에서 export하면 hook error 발생해서 렌더링이 안됨