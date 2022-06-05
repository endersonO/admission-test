import React, { useContext } from "react";
import Text from "../components/Text";
import Select from "../components/Select";
import { useNavigate, useLocation } from "react-router-dom";
import ImageList from "../components/ImageList"

import AppContext from "../context/AppContext.js";

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
  const { setRowState, row } = useContext(AppContext);
  const location = useLocation();
  // * Use navigate to return root path
  const navigate = useNavigate();
  const { sprites, id_pokemon, name, desciption, pokedexNumber } = location.state;

  const { pokemonTypesOptions, tableRows, setTableRows, handleUpdatePokemonRow, state } = props;

  const typePokemons = row.rowInformation[0].map(data => data.types).flat()
  const typePokemonsFilter = typePokemons.filter((item, index) => {
    return typePokemons.indexOf(item) === index;
  })
  //console.log("row",row)
  //console.log("type pokemons", typePokemons)
  //console.log("filter", typePokemonsFilter)

  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdatePokemonRow({});
  };

  const [pokemonType, setPokemonType] = React.useState([]);

  const pokemonsTeam = row.rowInformation[0].filter(data => data.types.map(type => pokemonType.includes(type)).reduce((a, b) => a += b, 0)).map(data => data.name) //{
  //console.log("pokemon type", pokemonsTeam)

  const [pokemonTeammates, setPokemonTeammates] = React.useState([]);
  const [pokemonNewName, setPokemonNewName] = React.useState('');
  const [pokemonNewDescription, setPokemonNewDescription] = React.useState([]);
  const [imgPokemon, setImgPokemon] = React.useState([]);

  const HandleEditButton = () => (e) => {
    //console.log("handleEditButton",row)
    const oldData = row.rowInformation[0].filter(data => data.pokedexNumber === pokedexNumber);
    //console.log("old data", oldData)
    const newData = {
      ...oldData[0],
      name: pokemonNewName ? pokemonNewName : oldData[0].name,
      description: pokemonNewDescription ? pokemonNewDescription : oldData[0].description,
      friends: pokemonTeammates ? pokemonTeammates : oldData[0].friends,
      image: imgPokemon ? imgPokemon : oldData[0].image,
    }
    //console.log("new data", newData)

    const newTableRows = row.rowInformation[0].map(data => {
      if (data.pokedexNumber === pokedexNumber) {
        return newData;
      }
      return data;
    })

    setRowState(newTableRows)
    return navigate(`/`);
  }

  return (
    <div >

      <Text label={name} helper={'ingresa el nuevo nombre'} setTextType={setPokemonNewName} />
      <Text label={desciption} helper={'ingresa la nueva descripción'} rows={5} multiline={true} setTextType={setPokemonNewDescription} />

      <Select label={"New type"} options={typePokemonsFilter} setInfoType={setPokemonType} />
      {pokemonType.length > 0 &&
        <Select
          label={"Best teammate"}
          options={pokemonsTeam}
          setInfoType={setPokemonTeammates}
        />}

      <ImageList sprites={sprites} setImgPokemon={setImgPokemon} />
      {imgPokemon != '' ? <div><p>Nueva imagen seleccionada</p>
        <img
          src={`${imgPokemon}`}
          srcSet={`${imgPokemon}`}
          alt={imgPokemon}
          loading="lazy"
        />
      </div> : ''}
      <button onClick={HandleEditButton()} >Submit</button>
    </div>
  );
}
