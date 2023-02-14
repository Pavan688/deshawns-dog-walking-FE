import { getWalkers } from "./database.js"

const walkers = getWalkers()

import { getCities } from "./database.js"
const citiesList = getCities()

import { getWalkerCities } from "./database.js"
const walkerCities = getWalkerCities()

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
 return walkerHTML
}


document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [,walkerId] = itemClicked.id.split("--")
             

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
           let matchingWalker = null
            for (const walker of walkers) {

                /*
                    Compare the primary key of each walker to the one
                    you have. As soon as you find the right one, display
                    the window alert message.
                */
                if (walker.id === parseInt(walkerId)) {
                    matchingWalker = walker
                }
            }

            // this function will iterate through walkerCities array to find matching walkers
            const filterWalkerCitiesByWalker = (matchingWalker) => {
                let assignmentArray = []
                for (const walkercity of walkerCities) {
                    if (matchingWalker.id === walkercity.walkerId)
                        assignmentArray.push(walkercity)
                }
                return assignmentArray
            }
            

            // this will iterate through cities array to find matching cities.
            const assignedCityNames = (assignments) => {
                let cityNames = ''
                for (const assignment of assignments) {
                    for (const city of citiesList) {
                        if (city.id === assignment.cityId) {
                            cityNames = `${cityNames} ${city.name}`
                        }
                    }
                }
                return cityNames
                }

                for (const walker of walkers) {
                    if (walker.id === parseInt(walkerId)) {
                        const assignments = filterWalkerCitiesByWalker(matchingWalker)
                        const cities = assignedCityNames(assignments)
                        window.alert(`${walker.name} services ${cities}`)
                    }
                }
            }
        }
)