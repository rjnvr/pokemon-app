import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonInfo, setPokemon] = useState({
        name: "", 
        species: "", 
        img: "",
        hp: "",
        attack: "",
        defense: "",
        type: ""
      })

  
  const searchPokemon = () => {    
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        name: pokemonName, 
        species: response.data.species.name, 
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true);
    }
  );
};

  return (
    <div className='App'>
      <div className='TitleSection'>
        <img src="./icon.png"></img>
        <h1>Pokemon Search</h1>
        <input type="text" onChange={(event)=> {
            setPokemonName(event.target.value);
          }}></input>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (<h1> Please choose a pokemon</h1>
        ) : (
        <>
        <h1>{pokemonInfo.name}</h1>
        <img src={pokemonInfo.img}/>
        <h3>Species : {pokemonInfo.species}</h3>
        <h3>Type : {pokemonInfo.type}</h3>
        <h4>Hp : {pokemonInfo.hp}</h4>
        <h4>Attack : {pokemonInfo.attack}</h4>
        <h4>Defense : {pokemonInfo.defense}</h4>
        </>
        )}
      </div>
    </div>
  );
}

export default App;