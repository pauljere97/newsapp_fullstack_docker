import NavBar from "../components/NavBar";
import NewsCard from "../components/NewsCard";
import React, { useEffect, useContext } from "react"
import { Context } from "../context/Context";
import { createPayload, compareByDate } from "../utils/helpers";
import * as api from "../utils/apiService"
import Filter from "../components/Filter";
import SavePreferences from "../components/SavePrefereces";
function NewsList() {
    const { state, setState } = useContext(Context)
    
    const fetchData = (page = null) => {
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


    return <div className="news_list">
        <NavBar />
        <div >
            <Filter/>
            <div className="card_list">
                {state.feed.map((element) => {
                    return <NewsCard key={element['id']} data={element} />
                })}
                <p className="not_found" style={state.feed.length ? { display: 'none' } : {}}>No articles found</p>
            </div>
            <SavePreferences/>
        </div>
    </div>;
}

export default NewsList;