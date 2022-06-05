import React, {useContext} from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext.js";
import getPokemons from "../hooks/getPokemons.js";
let countHome = 0;
let countHome2 = 0;
let tableInfo = [];

export default function Home(props) {
  const { setRowState, row } = useContext(AppContext);
  const { tableRows, controlHome, setControlHome } = props;

  const pokemonsApi = getPokemons()

  console.log("pokemons api home", pokemonsApi, pokemonsApi.length, row.rowInformation[0]) 

  if (pokemonsApi.length > 90 && countHome2 == 0) {
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
    countHome2 = 1
  }
  if (tableRows.length > 90 && countHome === 0) {
    //setRowState(pokemonsApi)
    console.log("row externo",row)
    tableInfo = [...tableRows]
    countHome++
  }

  const navigate = useNavigate();

  const handleEditButton = (row) => (e) => {
    console.log("row functon handle edit",row)
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    console.log("params", params)
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params },
    });
  };

  return (
    <div>
      { countHome2 ? (
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
