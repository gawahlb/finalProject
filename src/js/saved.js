import { getLocalStorage } from "./utils.mjs";

console.log('its connected!!!!!');

export function displaySaved() {
    const currentStorage1 = getLocalStorage('saved1');
    const currentStorage2 = getLocalStorage('saved2');
    const currentName1 = getLocalStorage('name1');
    const currentName2 = getLocalStorage('name2');

    const name1 = document.getElementById('pokemon1-name');
    const name2 = document.getElementById('pokemon2-name');  

    name1.textContent = "";
    name2.textContent = "";

    if(currentStorage1.length > 0 && currentStorage2.length > 0) {
        const table1 = document.getElementById('pokemon1-list');
        const table2 = document.getElementById('pokemon2-list');

        table1.innerHTML = "";
        table2.innerHTML = "";

        currentStorage1.slice(1).forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(data => {
                const td = document.createElement('td');
                td.textContent = data;
                tr.appendChild(td);
            });
            table1.appendChild(tr);
        });

        currentStorage2.slice(1).forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(data => {
                const td = document.createElement('td');
                td.textContent = data;
                tr.appendChild(td);
            });
            table2.appendChild(tr);
        });
        
            name1.textContent = currentName1;
            name2.textContent = currentName2;

        } else {
            const message = document.getElementById('view-list');

            message.textContent = "No currently saved view!";
        }

        
        
    }

    

window.addEventListener("DOMContentLoaded", () => {
    displaySaved();
});