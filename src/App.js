import Routes from "./Routes";
import "./App.css";
import Text from "./components/Text";
import EnhancedTable from "./components/Table";
import Dialog from "./components/Dialog";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

import getPokemons from "./hooks/getPokemons"
import createPokemon from "./hooks/createPokemon.js"

const API = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0" // agarrar 100 pokemons

function App() {
  //const pokemonsApi = getPokemons(API);
  //console.log("despues de api")
  //console.log("pokemons",pokemonsApi)
  //const pokemons = createPokemon(pokemonsApi.results[0]);
  //console.log(pokemons)
  const pokemon = [{ name: "char", types: ['water', 'pou'], height: 2, weight: 20, description: "super pokemon"}, 
  {name: "second", types: ['water', 'pou'], height: 6, weight: 40, description: "super segundo"}]

  const [tableRows, setTableRows] = React.useState(pokemon);
  const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);

  console.log(tableRows)
  const handleUpdatePokemonRow = ({ id_pokemon, fields }) => {
    const { my_name, my_description, my_types, my_teammates, my_sprite } =
      fields;
  };

  //console.log("tables rows", tableRows)
  return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        handleUpdatePokemonRow={handleUpdatePokemonRow}
      />
      <Outlet />
    </div>
  );
}

export default App;
