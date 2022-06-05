import React, {useContext} from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext.js";
import getPokemons from "../hooks/getPokemons.js";
let countHome = 0;

export default function Home() {
  const { setRowState, row } = useContext(AppContext);

  const pokemonsApi = getPokemons()
  //console.log("pokemons api", pokemonsApi)

  /* console.log("pokemons api home", pokemonsApi, pokemonsApi.length, row.rowInformation[0])  */

  if (pokemonsApi.length > 99 && countHome == 0) {
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
    setRowState(pokemons)
    countHome = 1
  }

  const navigate = useNavigate();

  const handleEditButton = (row) => (e) => {
    //console.log("row functon handle edit",row)
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    //console.log("params", params)
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params },
    });
  };

  return (
    <div>
      { countHome ? (
        <EnhancedTable
          rowsProp={row.rowInformation[0]}
          handleEditButton={handleEditButton}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
