import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)
      .forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                      .map(name => {
                            let option = document.createElement('option')
                            option.setAttribute('value', name)
                            option.textContent = name
                            return option
                      })
        )
     }) 

    return (data, state, action) => {
        if (action) {
            if (action.getAttribute('name') === 'clear') {
                const input = action.parentElement.querySelector('input')
                input.value = ''
            }
        }

        return data.filter(row => compare(row, state));
    }
}