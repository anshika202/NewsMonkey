import React, { useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';



const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalresults] = useState(0)

  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

 
  
    
    //document.title = props.category
  

  const updatenews = async()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    props.setProgress(20);
    let parsed_data = await data.json()
    props.setProgress(50);
    setArticles(parsed_data.articles);
    setLoading(false);
    setTotalresults(parsed_data.totalResults);
    
    props.setProgress(100);
  }


  useEffect(() => {
    updatenews()
  }, [])
  
  

  // handleNextclick = async () => {

  //   setState({ page: page + 1 })
  //   updatenews()
  // }

  // handlePrevclick = async () => {


  //   setState({
  //     page: page - 1
  //   })
  //   updatenews()

  // }

  const fetchMoreData = async () => {

    
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    let parsed_data = await data.json()
    setArticles(articles.concat(parsed_data.articles));
    setTotalresults(parsed_data.totalResults)

  }


 
    return (


      <>
        <h1 className="text-center">Top-headlines</h1>

        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >

          

          <div className="container">


            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                    imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}




            </div>
          </div>
        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-info" onClick={handlePrevclick}> &larr; Prev</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-info" onClick={handleNextclick}>&rarr; Next</button>
        </div> */}
      </>



    )
  
}

// 1f70a09464a148cebfcef58ab70edfdd

export default News