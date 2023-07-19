import React  from 'react'

const NewsItem = (props) =>{
  

    let {title, description, imgurl, newsurl,author, date} = 
    props;
    return (
      <div>
        <div className="card my-4" style={{width : "18rem"}}>
          <img src={imgurl?imgurl:"https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-body-secondary">By - {!author?"Unknown":author}  on {date}</small></p>

            <a href={newsurl} target= "_blank" rel="noreferrer" className="btn btn-sm btn-info">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem