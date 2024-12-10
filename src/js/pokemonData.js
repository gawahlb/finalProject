const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

export async function getData(name) {
    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error(`Error getting data. Status: ${response.status}`);
        }

        const data = await response.json();

        const pokemon = data.results.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());

        if (!pokemon) {
            throw new Error(`${name} not found!`);
        }

        const pokemonData = await fetch(pokemon.url);

        const pokemonDetails = await pokemonData.json();

        return pokemonDetails;

    } catch(error) {
        console.log(error);
    }
}

export function displayDetails(pokemonDetails) {
    const table = document.getElementById('pokemon-data');
    const newTable = detailsTemplate(pokemonDetails);
    
    table.innerHTML = newTable;
}

function detailsTemplate(data) {
    const newTable = `
    <table>
        <tr>
            <th>Stat</th>
            <th>Value</th>
        </tr>
        ${statSelection(data) || "<tr><td colspan='2'>No stats selected</td></tr>"}
    </table>`;

    return newTable;
}

export function statSelection(data) {  
    const table = document.getElementById('stats');
    
    table.addEventListener('change', () => {
        const selected = Array.from(table.querySelectorAll('input[type="checkbox"]:checked')).map(stat => stat.value);

        const filter = data.table.filter(stat => selected.includes(stat.stat.name));

        const rows = filter.map(stat =>`
            <tr>
                <td>${stat.stat.name.toUpperCase()}</td>
                <td>${stat.base_stat}</td>
            </tr>`).join('');

        return rows;
    });
}

export async function initDd() {
    try{
        const response = await fetch(url);

            if(!response.ok) {
                throw new Error(`Error getting data. Status: ${response.status}`);
            }

            const data = await response.json();

           
            populateNames(data.results, ['pokemon1', 'pokemon2']);
            
    } catch {
        console.error(error);
    }   
}

export function populateNames(data, ids) {
    console.log(data);
    ids.forEach(id => {
        const menu = document.getElementById(id);
        menu.innerHTML = data.map(pokemon => `<option value="${pokemon.name}">${pokemon.name}</option>`).join('');
        
    });

}