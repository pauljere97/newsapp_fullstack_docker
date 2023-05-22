import React, { useEffect, useContext, useState } from "react"
import { Context } from "../context/Context";
import { createPayload, compareByDate } from "../utils/helpers";
import * as api from "../utils/apiService"
import * as constants from "../utils/constants"

function SavePreferences() {
    const { state, setState } = useContext(Context)
    const [prefSource, setPrefSource] = useState(state.source)
    const [prefCategory, setPrefCategory] = useState(state.category)
    const [prefAuthor, setPrefAuthor] = useState(state.author)
    
    const savePref = () => {
        let payload = {
            "user_id": state.user.id,
            "source": prefSource,
            "category": prefCategory,
            "author": prefAuthor
        }
        api.post('create_preferences', payload)
            .then(res => {
                setState({ ...state, mobile_pref_out: false, source: res['preference']['source'], author: res['preference']['author'], category: res['preference']['category'], mobile_pref_out: false })
                console.log(res['preference'])
                alert("Saved")
            }).catch(e => {
                setState({ ...state, is_loading: false })
                console.log(e)
            })
    }


    return (<div className={state.mobile_pref_out ? "prefereces prefereces_mobile" : "prefereces"} onClick={()=>setState({ ...state, mobile_pref_out: false })}>
        <div className="pref_wrapper" style={state.user ? {} : { display: 'none' }} onClick={e => e.stopPropagation()}>
            <p>Preferences</p>
            <div className="input_rows">
                <label htmlFor="date_to">Source</label>
                <select name="source" id="source" value={prefSource} onChange={(e) => setPrefSource(e.target.value)}>
                    <option value={''}>All</option>
                    {constants.sources.map(e => {
                        return <option value={e} key={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Category</label>
                <select name="category" id="category" value={prefCategory} onChange={(e) => setPrefCategory(e.target.value)}>
                    <option value={''}>All</option>
                    {constants.categories.map(e => {
                        return <option value={e} key={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Author</label>
                <input type="text" name="author" id="author" value={prefAuthor} onChange={(e) => setPrefAuthor(e.target.value)} />
            </div>
            <button onClick={savePref} className="filter_btn">Save</button>
        </div>
    </div>);
}

export default SavePreferences;