setInterval(setClock, 1000)

const minuteHand = document.querySelector('[data-minute-hand]')

const secondHand = document.querySelector('[data-second-hand]')

const hourHand = document.querySelector('[data-hour-hand]')

function setClock(){
    const currentdate = new Date()
    const secondsratio = currentdate.getSeconds()/60
    const minutesratio = (secondsratio + currentdate.getMinutes())/60
    const hoursratio = (minutesratio +  currentdate.getHours())/12
    setrotation (secondHand, secondsratio)
    setrotation (minuteHand, minutesratio)
    setrotation (hourHand, hoursratio)
}



function setrotation(elements, rotationRatio){
    elements.style.setProperty('--rotation',rotationRatio*360)
}

setClock()