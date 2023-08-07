import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './DemoUser.css'
import { useModal } from "../../context/Modal";
function DemoLoginButton() {
    const {closeModal} =useModal()
    const dispatch = useDispatch();
    const credential= "Demo-lition"
    const password = "password"
    return (
        <>
        <button className='demoButton' onClick={(e)=>{
            dispatch(sessionActions.login({ credential, password})).then(closeModal)
            }
            }>Demo Login</button>
        </>
    )
}

export default DemoLoginButton
