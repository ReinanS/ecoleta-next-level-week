function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    // verificar se existem itens selecionados, se sim
    // pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{ 
        // se não estiver adicionado ,adicionar à seleção
        // adicionar à selecao
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os item selecionados
    collectedItems.value = selectedItems
}