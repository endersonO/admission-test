import { useEffect, useState } from "react";
import axios from "axios";

const useGetPokemons = () => {
  const [pokemons, setPokemons] = useState([]);

  const data = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    .then(response => {
      for (let i = 0; i < response.data.results.length; i++) {
        axios.get(response.data.results[i].url)
          .then(result => {
            setPokemons(prevArray => [...prevArray, result.data])
          })
      }
    })
  }
  useEffect(data, [])
  //console.log("pokemons", pokemons)
  return pokemons
}

export default useGetPokemons;
