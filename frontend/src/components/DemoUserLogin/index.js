// import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";


function DemoLoginButton() {
    const dispatch = useDispatch();
    const credential= "Demo-lition"
    const password = "password"
    return (
        <>
        <button onClick={(e)=>{dispatch(sessionActions.login({ credential, password }))}}>Log In DemoUser</button>
        </>
    )
}

export default DemoLoginButton
