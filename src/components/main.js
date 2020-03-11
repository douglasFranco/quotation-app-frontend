import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Chart from './todayCharts'

const Main = () => {
  const [quotes, setQuotes] = useState([])
  const apiUrl = process.env.API_URI ? process.env.API_URI : 'http://localhost:3003/api/quotes/today'
  console.log(apiUrl); 

  useEffect (() => {
       axios.get(apiUrl)
      .then(function (resp) {
        setQuotes(resp.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const renderCards = () => {
    if(quotes.length <= 0) {
      return
    }

    const currencies = [quotes['0'].USD, quotes['0'].EUR, quotes['0'].BTC] 
    return (
      currencies.map(currency => {
        let buy = currency.buy.toFixed(2).toString().replace('.', ',')
        let sell = currency.sell.toFixed(2).toString().replace('.', ',')
        let variation = currency.variation.toFixed(2)

        return (         
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body ">
                <div className="d-flex flex-row mb-3">
                  <h2 className="card-title">{currency.name}</h2>
                 </div>
                <div className="d-flex flex-row mb-2">
                  <h4 className="card-title flex-grow-1">Buy</h4>
                  <span className="bg-primary text-white font-weight-bold rounded p-2">{buy}</span>
                </div>
                <div className="d-flex flex-row pb-2">
                  <h4 className="card-title flex-grow-1">Sell</h4>
                  <span className="bg-primary text-white font-weight-bold rounded p-2">{sell}</span>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <span 
                    className={`${variation > 0 ? 'bg-success' : 'bg-danger'} text-white font-weight-bold rounded p-2`}>
                      {variation.toString().replace('.', ',') + '%'}
                  </span>
                </div>               
              </div>
            </div>
          </div>
        )
      })      
    )
  }  

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-white mb-3">Currencies Quotation</h1>
          <div className="row">
            {renderCards()}
          </div>
        </div>        
      </div>
      <div className="container">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Dollar</a>
            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Euro</a>
            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Bitcoin</a>
          </div>
        </nav>        
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <Chart currency="USD" data={quotes}/>
          </div>
          <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <Chart currency="EUR" data={quotes}/>
          </div>
          <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
            <Chart currency="BTC" data={quotes}/>
          </div>
        </div>      
      </div>  
    </div>
        
  )
}

export default Main