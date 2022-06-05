import Routes from "./Routes";
import "./App.css";
import Text from "./components/Text";
import EnhancedTable from "./components/Table";
import Dialog from "./components/Dialog";
import React, {useContext} from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

import getPokemons from "./hooks/getPokemons"
import createPokemon from "./hooks/createPokemon.js"
import AppContext from "./context/AppContext.js";
import rowState from "./hooks/useRowState.js";

let count = 0;

function App() {
	const rowInitialState = rowState();
	const { setRowState } = useContext(AppContext);
	const [tableRows, setTableRows] = React.useState([]);
	const [pokemonTypesOptions, setPokemonTypesOptions] = React.useState([]);
	const [controlHome, setControlHome] = React.useState([false]);
	const pokemonsApi = getPokemons()
	const navigate = new useNavigate();

	if (pokemonsApi.length > 99 && count === 0) {
		console.log("pokemons api", pokemonsApi)
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
		setTableRows([...pokemons])
		count++
	}

	const HandleUpdatePokemonRow = (data) => {
		/* const { my_name, my_description, my_types, my_teammates, my_sprite } = fields; */
		console.log("App handle update", data)

		console.log("App update", tableRows)
		React.useEffect(() => {
			setTableRows(data)
			return navigate(`/`);
		});
		
	};
	console.log("pokemon types options", tableRows)
	console.log(controlHome[0])

	return (
		<AppContext.Provider value={rowInitialState} >
		<div className="App">
			<Routes
				setTableRows={setTableRows}
				tableRows={tableRows}
				pokemonTypesOptions={pokemonTypesOptions}
				handleUpdatePokemonRow={HandleUpdatePokemonRow}
				controlHome={controlHome}
				setControlHome={setControlHome}
			/>
			<Outlet />
		</div>
		</AppContext.Provider>
	);
}

export default App;
