import { getPets } from "./database.js"

const pets = getPets()

import { getWalkers } from "./database.js"
const walkers = getWalkers()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("pet")) {
            const [,petId] = itemClicked.id.split("--")
            const petPrimaryKey = parseInt(petId)
            
            //use this loop to find the name and store an object
            let matchingPet = null
            for (const pet of pets) {
                if (pet.id === petPrimaryKey) {
                    matchingPet = pet
                }
            }

            // use this loop to iterate through walkers array to get the name
            let matchingWalker = null
            for (const walker of walkers) {
                if (matchingPet.walkerId === walker.id)
                    matchingWalker = walker
            }
            window.alert(`${matchingPet.name} is being walker by ${matchingWalker.name}.`)
        }
    }
)