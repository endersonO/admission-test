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
//const API = "https://pokeapi.co/api/v2/pokemon/1/"

async function App() {
  const pokemonsApi = await getPokemons(API)
  /* .then(
	data=> {console.log("dentro then",data) 
	return data
}
  ).catch(e=> console.log(e)); */
  console.log("fuera rhen",pokemonsApi)
   const pokemons = Object.values(JSON.parse(JSON.stringify(pokemonsApi.results)))
   console.log("convert pokemons",pokemons)

  const pokemon = Object.values(JSON.parse(JSON.stringify(await createPokemon(pokemons))))
  console.log("lista de pokemons creados", pokemon)
  console.log(typeof (pokemon))
  //const pokemon = [{ name: "char", types: ['water', 'pou'], height: 2, weight: 20, description: "super pokemon"}, {name: "second", types: ['water', 'pou'], height: 6, weight: 40, description: "super segundo"}]
  
  console.log("antes de tables")
  const [tableRows, setTableRows] = React.useState(await pokemon);
  const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);
  console.log("tableRows", tableRows)
/*
  const handleUpdatePokemonRow = ({ id_pokemon, fields }) => {
    const { my_name, my_description, my_types, my_teammates, my_sprite } =
      fields;
  };
  console.log("pokemon types options", tableRows) */

  /* return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        handleUpdatePokemonRow={handleUpdatePokemonRow}
      />
      <Outlet />
    </div>
  ); */
}

export default App;
