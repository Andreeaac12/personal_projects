let body = document.querySelector('body');

let h1 = document.createElement('h1');
body.appendChild(h1);

let btn = document.querySelector('#pokemon-btn');
let p = document.querySelector('#p1');
let base = document.querySelector('#p2');
let stats = document.querySelector('#p3');
let hp = document.querySelector('#p4');
let height = document.querySelector('#p5');



let img = document.createElement('img');
img.width = 210;
img.height = 210;

body.appendChild(img);

async function getPokemon(id){
    
       await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            console.log(`${pokemon.id}: ${pokemon.name}`);
            // console.log(`Numele pokemonului este ${pokemon.name.toUpperCase()}`)
            h1.innerText = pokemon.name.toUpperCase();
            img.src = pokemon.sprites.front_default;
            p.innerText = (`Weight - ${pokemon.weight}kg`);
            height.innerText = (`Height - ${pokemon.height}m`)
            base.innerText = (`Experience - ${pokemon.base_experience}`);
            hp.innerText = `HP - ${pokemon.stats[0].base_stat}`;
            stats.innerText = `Type -  ${pokemon.types[0].type.name}`;
         
        });
 
}


btn.addEventListener('click', function(){
    let pokemonInput = document.querySelector('#pokemon-id');
    let pokemonId = pokemonInput.value;
    getPokemon(pokemonId);
});



   

    
    
 



