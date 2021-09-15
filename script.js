const $ = document
const $$ = (selector) =>  $.querySelectorAll(selector)

let userData;
const periods = Array.from($$(".time-selector > button"))
const periodSpans = Array.from($$(".period"))
const hourSpans = Array.from($$(".hours")) 

fetch("./data.json")
.then(r => r.json())
.then( response => {
    userData = response
    populateData("weekly")
})

const populateData = (periodName) =>{
    userData.map((area, index) => {
        hourSpans[index].innerText = `${area.timeframes[periodName].current}hrs`
        $$(`#previous-${area.title.toLowerCase().split(" ").join("-")}-hours`)[0].innerText = area.timeframes[periodName].previous
    })
}

const changePeriod = (periodName) => {
    periodSpans.map(p => {
        p.innerText = periodName
    })
}

periods.map(period => {
    period.addEventListener("click", () => {
        $$(".time-selected")[0].classList.toggle("time-selected")
        period.classList.toggle("time-selected")
        changePeriod(period.innerText)
        populateData(period.innerText.toLowerCase())
    })
})
