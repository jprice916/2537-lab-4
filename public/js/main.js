console.log("js file loaded");

let offset = 0;
let limit = 10;
let loading = false;
let loader = document.getElementById('spinner');
async function loadPokemon() {
    
    loader.hidden = true;
    if (loading) return;
    loading = true;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
    const pokeres = await response.json();

    for (let pokemon of pokeres.results) {
        const detailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const details = await detailsRes.json();

        const name = capitalize(details.name);
        const imgUrl = details.sprites.other['official-artwork'].front_default;

        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '475px';

        card.innerHTML = `
            <img src="${imgUrl}" class="card-img-top" style="width:100%;">
            <div class="card-body" style="background-color:#f8f8f8;">
             <h4 class="card-title">${name}</h4>
             </div>
                `;

        document.getElementById('pokemonList').appendChild(card);
    }

    offset += limit;
    loading = false;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
loadPokemon();

document.getElementById('load').addEventListener('click', () => {
    loader.hidden = false;
    setTimeout(() => {
        loadPokemon();
    loader.hidden = true;
    }, 500);
    
})
// document.addEventListener("scroll", function () {
//     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     if (scrollTop + clientHeight >= scrollHeight) {
//         loadPokemon();

//     }
// });

