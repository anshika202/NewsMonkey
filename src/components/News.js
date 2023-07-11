import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize : 8,
    category : "general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string 
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      page : 1
    }
    document.title = this.props.category
  }

  async updatenews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f70a09464a148cebfcef58ab70edfdd&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsed_data = await data.json()
    this.setState({articles : parsed_data.articles, 
                  totalResults : parsed_data.totalResults,
                  loading : false})
  }


  async componentDidMount(){
    this.updatenews()
  }

  handleNextclick = async ()=>
  { 
    
    this.setState({page : this.state.page +1})
    this.updatenews()
  }

  handlePrevclick = async ()=>
  {
    
    
    this.setState({
        page : this.state.page - 1})
        this.updatenews()
    
  }


  render() {
    return (
      

        <div className="container my-3">
          <h1 className="text-center">Top-headlines</h1>

          {this.state.loading && <Spinner/>}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""}  description = {element.description?element.description.slice(0,88):""}  
            imgurl = {element.urlToImage}   newsurl = {element.url} author = {element.author} date = {element.publishedAt}/>
            </div>
          })}
          
          
          
          </div> 
          <div className="container d-flex justify-content-between">
          <button disabled= {this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePrevclick}> &larr; Prev</button>
          <button disabled ={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextclick}>&rarr; Next</button>
          </div>
        </div>


      
    )
  }
}

export default News