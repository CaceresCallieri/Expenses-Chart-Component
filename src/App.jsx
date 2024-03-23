import { useState } from 'react'
import './App.css'
import initialData from './utils/datatest.js'

function createNewWeekData() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const week =
    days.map(day => {
      return {
        "day": day,
        "amount": Number((Math.random() * 100).toFixed(2))
      }
    })

  const data = {
    "balance": Number((Math.random() * 1000).toFixed(2)),
    "week": week
  }

  return data
}

function App() {
  const [data, setData] = useState(initialData)
  const [prevTotal, setPrevTotal] = useState(222.60) // hardcoded value for the first week to acomodate for the original design
  const { balance, week } = data

  function getMostExpensiveDaysIndices() {
    const mostExpensiveDayAmount = Math.max(...week.map(item => item.amount))
    const mostExpensiveDayIndices = week
      .map((item, index) => item.amount === mostExpensiveDayAmount ? index : -1)
      .filter(index => index !== -1);
    return mostExpensiveDayIndices
  }

  function isMostExpensiveDay(index) {
    return getMostExpensiveDaysIndices().includes(index)
  }
  
  function getWeekTotal() {
    const total = week.reduce((acc, item) => acc + Number(item.amount), 0)
    return total.toFixed(2)
  }

  return (
    <main>
      <div className="balance-container">
        <div className="balance">
          <p>My balance</p>
          <h3>${balance}</h3>
        </div>
        <img src="logo.svg" alt="App logo: to circles overlapping" />
      </div>

      <article>
        <h2>Spending - Last 7 days</h2>
        <div className="graph">
          {week.map((item, index) => {
            return (
              <div className='day-info' key={index}>
                <div className={`bar ${isMostExpensiveDay(index) && 'longest'}`} style={{ height: (item.amount * 2) }}></div>
                <p className='amount'>${item.amount}</p>
                <p className='day'>{item.day}</p>
              </div>
            )
          })}
        </div>

        <div className="divider"></div>

          <div className="bottom">
            <div className="total">
              <p>Total this week</p>
              <h2>${getWeekTotal()}</h2>
            </div>

              <div className="performance">
                <h4>{(((getWeekTotal() - prevTotal) / prevTotal) * 100).toFixed(1)}%</h4>
                <p>from last week</p>
              </div>
          </div>
        </article>

      <button onClick={() => { setData(createNewWeekData()); setPrevTotal(getWeekTotal()) }}>Next week</button>
    </main>
  )
}

export default App