import React from 'react'

//target = blank opens the function in a new tab
const NewsItem=(props)=> {
    let {title,description , imageUrl ,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
    <div className="card" >
      <div style={{display : 'flex',
                    justifyContent: 'flex-end',
                    position:'absolute',
                    right: '0'
                  }}>
      <span className='badge rounded-pill bg-danger'>{source}
      </span>
      </div>
              <img className="card-img-top" src={!imageUrl?"https://imgeng.jagran.com/images/2023/jul/XBOX%20(1)1689688440483.jpg" : imageUrl} alt=" "/>
        <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'><small className="text-muted">BY  {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel='noreferrer' href={newsUrl} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
    </div>
      </div>
    )
}

export default NewsItem
