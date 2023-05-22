import React, { useContext, useState } from "react"
import { Context } from "../context/Context";
import { IoClose } from 'react-icons/io5'
import * as api from '../utils/apiService'
import Cookies from 'js-cookie'

function Login() {
    // Cookies.remove('name')
    const { state, setState } = useContext(Context)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerNames, setRegisterNames] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const login = () => {
        if(!loginEmail){
            alert('Please input Email')
            return 
        }
        if(!loginPassword){
            alert('Please input Password')
            return 
        }
        let payload = {
            email: loginEmail,
            password: loginPassword
        }
        api.post('login', payload).then(res => {
            if (res['message']) {
                console.log(res['message'])
            }
            if (res['token']) {
                Cookies.set('AuthToken', res['token'], { expires: 30 }) // expires 30 days
                setState({ ...state, user: res['user'], auth: null, preference: res['preference'] })
                if (res['preference']) {
                    setState({ ...state, user: res['user'], preference: res['preference'],  auth: null, source: res['preference']['source'], author: res['preference']['author'], category: res['preference']['category'] })
                }
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const register = () => {
        if(!registerNames){
            alert('Please input Names')
            return 
        }
        if(!registerEmail){
            alert('Please input Email')
            return 
        }
        if(!registerPassword){
            alert('Please input Password')
            return 
        }
        let payload = {
            name: registerNames,
            email: registerEmail,
            password: registerPassword
        }
        api.post('create_user', payload).then(res => {
            if (res['message']) {
                console.log(res['message'])
            }
            if (res['token']) {
                Cookies.set('AuthToken', res['token'], { expires: 30 }) // expires 30 days
                setState({ ...state, user: res['user'], auth: null })
            }
            if (res['success']) {

            }
        }).catch(e => {
            console.log(e)
        })
    }

    const close = () => {
        setState({ ...state, auth: null })
    }
    return (
        <div className='dialog_bg' onClick={(e) => close(e)}>
            <div className="dialog_pad" style={state.auth == 'LOGIN' ? { display: 'block' } : { display: 'none' }} onClick={e => e.stopPropagation()}>
                <div className="dialog_top">
                    <p>Login</p>
                    <button onClick={close}>
                        <IoClose />
                    </button>
                </div>
                <div className="dialog_body">
                    <div className="input_rows">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="input_rows">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button className='auth_btn' onClick={login}>Login</button>
                    <button className='auth_btn' onClick={() => setState({ ...state, auth: 'REGISTER' })}>Register</button>
                </div>
            </div>
            <div className="dialog_pad" style={state.auth == 'REGISTER' ? { display: 'block' } : { display: 'none' }} onClick={e => e.stopPropagation()}>
                <div className="dialog_top">
                    <p>Register</p>
                    <button onClick={close}>
                        <IoClose />
                    </button>
                </div>
                <div className="dialog_body">
                    <div className="input_rows">
                        <label htmlFor="names">Names</label>
                        <input type="names" name="names" id="names" value={registerNames} onChange={(e) => setRegisterNames(e.target.value)} />
                    </div>
                    <div className="input_rows">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className="input_rows">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                    </div>
                    <button className='auth_btn' onClick={register}>Register</button>
                    <button className='auth_btn' onClick={() => setState({ ...state, auth: 'LOGIN' })}>Login Instead</button>
                </div>
            </div>
        </div>
    );
}

export default Login;