import { useEffect, useState } from "react";
import axios from "axios";

const useGetPokemons = (API) => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await axios(API)
          setPokemons(response.data.results);
        }
        fetchData();
      }, []); 

    console.log("api consultada", pokemons)
    return pokemons;
}

export default useGetPokemons;
