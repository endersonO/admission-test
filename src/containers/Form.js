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
  const { sprites, id_pokemon, name, desciption,  } = location.state;

  const { pokemonTypesOptions, tableRows, handleUpdatePokemonRow, state } = props;
  console.log("table rows form", tableRows)
  console.log("table rows form", handleUpdatePokemonRow)
  console.log("table rows form state", state)
  console.log("location state", location.state)


  const onSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleUpdatePokemonRow({});
  };

  return (
    <form>
      <Text label={name} helper={'ingresa el nuevo nombre'} />
      <Text label={desciption} helper={'ingresa la nueva descripción'} />
      <h1>{name}</h1>

      {/* <Select label={"New type"} defaultValue={foundPokemon.my_types} />
      <Select
        label={"Best teammate"}
        defaultValue={foundPokemon.my_teammates}
      />*/}

      <ImageList sprites={sprites} /> 

      <button>Submit</button>
      <h1>hola</h1>
    </form>
  );
}
