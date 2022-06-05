import React from "react";
import Text from "../components/Text";
import Select from "../components/Select";
import { useNavigate, useLocation } from "react-router-dom";
import ImageList from "../components/ImageList"

// * use spritesTitles to set the titles to Images

const spriteTitles = {
  back_default: "Macho posterior",
  back_female: "Hembra posterior",
  back_shiny: "Macho brillante posterior",
  back_shiny_female: "Hembra brillante posterior",
  front_default: "Macho frontal",
  front_female: "Hembra frontal",
  front_shiny: "Macho frontal brillante",
  front_shiny_female: "Hembra frontal brillante",
};

export default function Form(props) {
  const location = useLocation();
  // * Use navigate to return root path
  const navigate = useNavigate();
  const { sprites, id_pokemon, name, desciption, pokedexNumber } = location.state;

  const { pokemonTypesOptions, tableRows, setTableRows, handleUpdatePokemonRow, state } = props;

  const typePokemons = tableRows.map(data => data.types).flat()
  const typePokemonsFilter = typePokemons.filter((item, index) => {
    return typePokemons.indexOf(item) === index;
  })
  console.log(tableRows)
  console.log("type pokemons", typePokemons)
  console.log("filter", typePokemonsFilter)



  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdatePokemonRow({});
  };

  const [pokemonType, setPokemonType] = React.useState([]);
  console.log("pokemon type", pokemonType)
  const pokemonsTeam = tableRows.filter(data => data.types.map(type => pokemonType.includes(type)).reduce((a, b) => a += b, 0)).map(data => data.name) //{
  //data.map(data => console.log("dentro de filter",data.types))
  //  console.log(data.types.map(type => pokemonType.includes(type)).reduce((a,b)=>a+=b, 0))
  //})
  const [pokemonTeammates, setPokemonTeammates] = React.useState([]);
  const [pokemonNewName, setPokemonNewName] = React.useState('');
  const [pokemonNewDescription, setPokemonNewDescription] = React.useState([]);
  /* console.log("posible equipo pokemon", pokemonsTeam)
  console.log("equipo", pokemonTeammates)
  console.log("nombre", pokemonNewName)
  console.log("descripcion", pokemonNewDescription) */
  /* const oldData = tableRows.filter(data => data.pokedexNumber === pokedexNumber);
  console.log("old data", oldData)
  const newData = {
    ...oldData[0],
    name: pokemonNewName ? pokemonNewName : oldData[0].name,
    description: pokemonNewDescription ? pokemonNewDescription : oldData[0].description,
    friends: pokemonTeammates ? pokemonTeammates : oldData[0].friends,
  }
  console.log("new data", newData)

  const newTableRows = tableRows.map(data => {
    if (data.pokedexNumber === pokedexNumber) {
      return newData;
    }
    return data;
  })
  setTableRows(newTableRows) */

  //console.log("new table rows", newTableRows)
  const HandleEditButton = () => {
    const oldData = tableRows.filter(data => data.pokedexNumber === pokedexNumber);
    console.log("old data", oldData)
    const newData = {
      ...oldData[0],
      name: pokemonNewName ? pokemonNewName : oldData[0].name,
      description: pokemonNewDescription ? pokemonNewDescription : oldData[0].description,
      friends: pokemonTeammates ? pokemonTeammates : oldData[0].friends,
    }
    console.log("new data", newData)

    const newTableRows = tableRows.map(data => {
      if (data.pokedexNumber === pokedexNumber) {
        return newData;
      }
      return data;
    })
    //setTableRows(newTableRows)
    /* React.useEffect(() => { */
			//setTableRows(newTableRows)
			return navigate(`/`, {
        state: { ...newTableRows }
      });
		/* }); */
  }

  return (
    <form >
      <Text label={name} helper={'ingresa el nuevo nombre'} setTextType={setPokemonNewName} />
      <Text label={desciption} helper={'ingresa la nueva descripción'} rows={5} multiline={true} setTextType={setPokemonNewDescription} />

      <Select label={"New type"} options={typePokemonsFilter} setInfoType={setPokemonType} />
      {pokemonType.length > 0 &&
        <Select
          label={"Best teammate"}
          options={pokemonsTeam}
          setInfoType={setPokemonTeammates}
        />}

      <ImageList sprites={sprites} />

      <button type='submit' onClick={HandleEditButton} >Submit</button>
    </form>
  );
}
