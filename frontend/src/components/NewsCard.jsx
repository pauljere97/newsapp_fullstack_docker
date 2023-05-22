import moment from 'moment';

function NewsCard({ data, index }) {
    // console.log(data)
    const visitSite = (site) => {
        window.open(site)
    }

    return <div className="news_card" >
        <div className="card_top">
            <p><strong>By {data.author || 'Anonymous'}</strong></p>
            <p>{moment(data.date).fromNow()}</p>
        </div>
        <div className="card_mid">
            <p className="card_mid_header" onClick={() => visitSite(data.url)}>{data.title}</p>
            <div className="card_mid_details">
                <p className="card_mid_desc" onClick={() => visitSite(data.url)}>{data.desc}</p>
                {data.image ? <img onClick={() => visitSite(data.url)} className="card_mid_img" src={data.image} alt="news_pic" /> : ''}
            </div>
        </div>
        <div className="card_bottom">
            <div className="news_categories" >{data.category}</div>
            <p className="bookmarker">{data.source}</p>
        </div>
    </div>
}

export default NewsCard;