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

let count = 0;

function App() {
	const [tableRows, setTableRows] = React.useState([]);
	const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);
	const pokemonsApi = getPokemons()

	if (pokemonsApi.length > 99 && count === 0) {
		console.log("pokemons api",pokemonsApi)
		const pokemons = pokemonsApi.map((data) => {
			return {
				pokedexNumber: data.id,
				name: data.name,
				height: data.height,
				weight: data.weight,
				types: Object.values(data.types).map(data => data.type.name),
				friends: [],
				description: "",
				image: data.sprites.front_default,
				sprites: data.sprites,
			}
		})
		setTableRows(pokemons)
		count++
	}
	const handleUpdatePokemonRow = ({ id_pokemon, fields }) => {
		const { my_name, my_description, my_types, my_teammates, my_sprite } = fields;
	};
	//console.log("pokemon types options", tableRows) 

	//setTableRows(pokemonsApi)
	/* console.log("table rows app",tableRows)
	console.log("app lenth",tableRows.length) */
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
