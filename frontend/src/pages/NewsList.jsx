import NavBar from "../components/NavBar";
import NewsCard from "../components/NewsCard";
import React, { useEffect, useContext, useState } from "react"
import { Context } from "../context/Context";
import { createPayload, compareByDate } from "../utils/helpers";
import * as api from "../utils/apiService"
import * as constants from "../utils/constants"
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'
import Filter from "../components/Filter";
import SavePreferences from "../components/SavePrefereces";
function NewsList() {

    const { state, setState } = useContext(Context)
    const [page, setPage] = useState(1)
    
    const fetchData = (page = null) => {
        if (!page) setPage(1)
        setState({ ...state, is_loading: true })
        api.get('get_news_feed' + createPayload(state, page), useContext)
            .then(res => {
                setState({ ...state, feed: res['feed'].sort(compareByDate), is_loading: false })
            }).catch(e => {
                setState({ ...state, is_loading: false })
                console.log(e)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    
    

    const pageChange = (type) => {
        console.log(page)
        if (type == -1) {
            if (state.page !== 1) {
                setPage((e) => e - 1)
                fetchData(page)
            }
        } else {
            if (state.feed.length) {
                setPage((e) => e + 1)
                fetchData(page)
            }
        }

    }


    return <div className="news_list">
        <NavBar />
        <div >
            <Filter/>
            <div className="card_list">
                {state.feed.map((element) => {
                    return <NewsCard key={element['id']} data={element} />
                })}
                <p className="not_found" style={state.feed.length ? { display: 'none' } : {}}>No articles found</p>
                <div className="pagination" style={state.feed.length ? {} : { display: 'none' }}>
                    <button onClick={() => pageChange(-1)}><AiFillCaretLeft /></button>
                    <p>{page}</p>
                    <button onClick={() => pageChange(1)}><AiFillCaretRight /></button>
                </div>
            </div>
            <SavePreferences/>
        </div>
    </div>;
}

export default NewsList;