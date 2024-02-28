import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News= (props)=> {

    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3ddf538476574dd9bdd36795e2386331&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json()
    props.setProgress(70);
    // console.log(parsedata);
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);

  }

useEffect(() =>{
  //The below comment disable the warning generated due to this function
    document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
  updateNews();
  //eslint-disable-next-line
},[])               // function based component

  // async componentDidMount(){           // class based component
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3ddf538476574dd9bdd36795e2386331&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedata = await data.json()
  //   // console.log(parsedata);
  //   // this.setState({articles: parsedata.articles, 
  //   // totalResults: parsedata.totalResults,
  //   //   loading :false
  //   // })
  //   this.updateNews();
  // }

  // const handlePrevClick =async ()=>{
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3ddf538476574dd9bdd36795e2386331&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data = await fetch(url);
  //   // let parsedata = await data.json()
  //   // console.log(parsedata);
  //   // this.setState({
  //   //   page:this.state.page-1,
  //   //   articles: parsedata.articles,
  //   //   loading: false
  //   // })
  //   setPage(page-1)
  //   updateNews();
  // }
  // const handleNextClick =async ()=>{
  //   // if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize))){
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3ddf538476574dd9bdd36795e2386331&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let data = await fetch(url);
  //   //   let parsedata = await data.json()
  //   //   this.setState({
  //   //     page:this.state.page+1,
  //   //     articles: parsedata.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   setPage(page+1)
  //   updateNews();

  // }

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3ddf538476574dd9bdd36795e2386331&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)          // in url hamne page+1 isliye kiya kyoki page nhi to page late reload ho ra tha aur set page jaldi kam kr de ra tha. TO hamne url me hi page +1 kr diya. so that uske baad setpage functioncall kiya aur wo koi error ni de ra.
    // this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json()
    // console.log(parsedata);
    setArticles(articles.concat(parsedata.articles))
    setTotalResults(parsedata.totalResults)
  }

    return ( 
      <>
      <h1 className="text-center" style = {{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container"> 
        <div className='row'> 
        {articles.map((element)=>{
        return <div className="col-md-4" key = {element.url} >
            <NewsItem title = {element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""}  imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>})}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled = {this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button> 
        </div> */}
      </>
    ) 
  };


News.defaultProps = {
    country:'in',
    pageSize: 8,
    category : "general",

}
News.propTypes = {
  country : PropTypes.string,
  pageSize: PropTypes.number,
  category : PropTypes.string,
}

export default News
