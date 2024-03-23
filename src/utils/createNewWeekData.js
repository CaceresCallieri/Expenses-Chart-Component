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

export default createNewWeekData;