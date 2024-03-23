const Day = ({ item, index, isMostExpensiveDay }) => {
    return (
        <div className='day-info' key={item.day}>
            <div className={`bar ${isMostExpensiveDay(index) ? 'longest' : ''}`} style={{ height: (item.amount * 2) }}></div> {/* multiplied by 2 to make it more visible */}
            <p className='amount'>${item.amount}</p>
            <p className='day'>{item.day}</p>
        </div>
    )
}

export default Day