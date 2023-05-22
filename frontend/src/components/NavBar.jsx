import React, { useContext, useState } from "react"
import { Context } from "../context/Context";
import { compareByDate, createPayload } from "../utils/helpers";
import * as api from "../utils/apiService"
import { BiCaretDown } from 'react-icons/bi'
function NavBar() {
    const { state, setState } = useContext(Context)
    const [ showNav, setShowNav ] = useState(false)
    const searchQuery = () => {
        api.get('get_news_feed' + createPayload(state))
            .then(res => {
                setState({ ...state, feed: res['feed'].sort(compareByDate) })
            }).catch(e => {
                console.log(e)
            })
    }

    const logout = () => {
        api.post('logout', {user_id: state.user.id})
            .then(res => {
                setState({ ...state, user: null })
                setShowNav(false)
            }).catch(e => {
                console.log(e)
            })
    }

    const toggleNavLink = (type) => {
        if(type == 'preferences'){
            setState({ ...state, mobile_pref_out: true })
        }
        if(type == 'filter'){
            setState({ ...state, mobile_filter_out: true })
        }
        setShowNav(false)
    }

    return <div className="nav_wrapper">
        <div className="nav_bar">
            <p className="logo">NEWS<span>app</span></p>
            <div className="search_bar">
                <input type="search" placeholder="Search..." value={state.query_string} onChange={(e) => setState({ ...state, query_string: e.target.value })} />
                <button onClick={searchQuery}>
                    search
                </button>
            </div>
            <div style={state['user'] ? { display: 'none' } : { display: 'block' }} className="none_logged_btns">
                <button onClick={() => setState({ ...state, auth: 'REGISTER' })}>Register</button>
                <button onClick={() => setState({ ...state, auth: 'LOGIN' })}>Login</button>
            </div>
            <div className="logged_wrapper" style={state.user ? { display: 'block' } : { display: 'none' }}>
                <button className="logged_in_btn" onClick={()=>setShowNav(!showNav)}>
                    {state.user?.name} &nbsp;<BiCaretDown />
                </button>
                <div className="drop_list" style={showNav ? { display: 'flex' } : { display: 'none' }}>
                    <button onClick={()=>toggleNavLink('filter')}>Search</button>
                    <button onClick={()=>toggleNavLink('preferences')}>Preferences</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </div>;
}

export default NavBar;