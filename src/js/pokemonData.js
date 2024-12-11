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

export async function displayDetails() {
    const name1 = selectName('pokemon1');
    const name2 = selectName('pokemon2');

    const pokemon1Details = await getData(name1);
    const pokemon2Details = await getData(name2);

    const table1 = document.getElementById('pokemon1-data');
    const table2 = document.getElementById('pokemon2-data');

    const newTable1 = detailsTemplate(pokemon1Details);
    const newTable2 = detailsTemplate(pokemon2Details);

    const sp1 = document.getElementById('pokemon1-sprite');
    const sp2 = document.getElementById('pokemon2-sprite');

    sp1.innerHTML = await updateSprite(pokemon1Details);
    sp2.innerHTML = await updateSprite(pokemon2Details);
    
    table1.innerHTML = newTable1;
    table2.innerHTML = newTable2;
}

function detailsTemplate(data) {
    if (!data) {
        return `<table><tr><td colspan='2'>No stats available</td></tr></table>`;
    }

    const newTable = `
    <table>
        <tr>
            <th>Stat</th>
            <th>Value</th>
        </tr>
        ${statSelection(data.stats) || "<tr><td colspan='2'>No stats selected</td></tr>"}
    </table>`;

    return newTable;
}

export function statSelection(data) {  
    const table = document.getElementById('stats');
    
    const selected = Array.from(table.querySelectorAll('input[type="checkbox"]:checked')).map(stat => stat.value);

    const filter = data.filter(stat => selected.includes(stat.stat.name));

    const rows = filter.map(stat =>`
        <tr>
            <td>${stat.stat.name.toUpperCase()}</td>
            <td>${stat.base_stat}</td>
        </tr>`).join('');

    return rows;
}

export async function initDd() {
    try{
        const response = await fetch(url);

            if(!response.ok) {
                throw new Error(`Error getting data. Status: ${response.status}`);
            }

            const data = await response.json();

           
            populateNames(data.results, ['pokemon1', 'pokemon2']);
            statListener();
            nameListener();
            
    } catch {
        console.error(error);
    }   
}

export function populateNames(data, ids) {
    
    const sortData = data.sort((a, b) => a.name.localeCompare(b.name));

    ids.forEach(id => {
        const menu = document.getElementById(id);
        menu.innerHTML = sortData.map(pokemon => `<option value="${pokemon.name}">${pokemon.name}</option>`).join('');
        
    });
}

function selectName(id) {
    const dd = document.getElementById(id);
    return dd.value;
}

export function statListener() {
    const table = document.getElementById('stats');

    table.addEventListener('change', async () => {
        await displayDetails();
    })
}

export function nameListener() {
    const dd1 = document.getElementById('pokemon1');
    const dd2 = document.getElementById('pokemon2');

    dd1.addEventListener('change', () => {
        displayDetails();
    });

    dd2.addEventListener('change', () => {
        displayDetails();
    })
}

export async function updateSprite(data) {
    const sprite = data.sprites.front_default;
    
    const spriteTemplate = `<img src=${sprite}>`
    return spriteTemplate;
}