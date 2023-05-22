import React, { useEffect, useContext, useState } from "react"
import { Context } from "../context/Context";
import { createPayload, compareByDate } from "../utils/helpers";
import * as api from "../utils/apiService"
import * as constants from "../utils/constants"

function Filter() {
    const { state, setState } = useContext(Context)
    const changeField = (field, value) => {
        setState(e => e = { ...state, [field]: value })
    }
    const fetchData = (page = null) => {
        setState({ ...state, is_loading: true })
        api.get('get_news_feed' + createPayload(state, page), useContext)
            .then(res => {
                setState({ ...state, feed: res['feed'].sort(compareByDate), is_loading: false, mobile_filter_out: false })
            }).catch(e => {
                setState({ ...state, is_loading: false })
                console.log(e)
            })
    }
    return (
    <div className={state.mobile_filter_out ? "filter_wrapper filter_wrapper_mobile" : "filter_wrapper"} onClick={()=>setState({ ...state, mobile_filter_out: false })}>
        <div className="main_filter" onClick={e => e.stopPropagation()}>
            <div className="input_rows">
                <label htmlFor="query_string">Search</label>
                <input type="search" name="query_string" id="query_string" value={state.query_string} onChange={(e) => changeField('query_string', e.target.value)} />
            </div>
            <div className="input_rows">
                <label htmlFor="date_from">Date From</label>
                <input type="date" name="date_from" id="date_from" value={state.date_from} onChange={(e) => changeField('date_from', e.target.value)} />
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Date To</label>
                <input type="date" name="date_to" id="date_to" value={state.date_to} onChange={(e) => changeField('date_to', e.target.value)} />
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Source</label>
                <select name="source" id="source" value={state.source} onChange={(e) => changeField('source', e.target.value)}>
                    <option value={''}>All</option>
                    {constants.sources.map(e => {
                        return <option value={e} key={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Category</label>
                <select name="category" id="category" value={state.category} onChange={(e) => changeField('category', e.target.value)}>
                    <option value={''}>All</option>
                    {constants.categories.map(e => {
                        return <option value={e} key={e}>{e}</option>
                    })}
                </select>
            </div>
            <div className="input_rows">
                <label htmlFor="date_to">Author</label>
                <input type="text" name="author" id="author" value={state.author} onChange={(e) => changeField('author', e.target.value)} />
            </div>
            <button onClick={fetchData} className="filter_btn">Search</button>
        </div>
    </div>);
}

export default Filter;