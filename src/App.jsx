import './App.css'
import { useState, useMemo } from 'react'

import Day from './components/Day.jsx'

import initialData from './utils/data.js'
import createNewWeekData from './utils/createNewWeekData.js'

function App() {
  const [data, setData] = useState(initialData)
  const { balance, week } = data
  const [prevTotal, setPrevTotal] = useState(222.60) // hardcoded value for the first week to acomodate for the original design

  const weekTotal = useMemo(() => (week.reduce((acc, item) => acc + item.amount, 0)).toFixed(2), [week])

  function getMostExpensiveDaysIndices() { // returns an array with the indices of the most expensive days, to account for the rare case of multiple days with the same amount
    const mostExpensiveDayAmount = Math.max(...week.map(item => item.amount))
    const mostExpensiveDayIndices = week
      .map((item, index) => item.amount === mostExpensiveDayAmount ? index : -1)
      .filter(index => index !== -1);
    return mostExpensiveDayIndices
  }

  const mostExpensiveDayIndices = useMemo(getMostExpensiveDaysIndices, [week]) // useMemo to avoid recalculating the most expensive days on every render, only when the week data changes

  function isMostExpensiveDay(index) {
    return mostExpensiveDayIndices.includes(index)
  }

  function handleButtonClick() {
    setPrevTotal(weekTotal)
    setData(createNewWeekData())
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
              <>
                <Day item={item} index={index} isMostExpensiveDay={isMostExpensiveDay} />
              </>
            )
          })}
        </div>

        <div className="divider"></div>

        <div className="bottom">
          <div className="total">
            <p>Total this week</p>
            <h2>${weekTotal}</h2>
          </div>

          <div className="performance">
            <h4>{(((weekTotal - prevTotal) / prevTotal) * 100).toFixed(1)}%</h4>
            <p>from last week</p>
          </div>
        </div>
      </article>

      <button onClick={handleButtonClick}>Next week</button>
    </main>
  )
}

export default App