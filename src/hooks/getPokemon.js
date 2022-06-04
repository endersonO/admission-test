import { useEffect, useState } from "react";
import axios from "axios";

const useGetPokemon = async (API) => {
    //const [pokemon, setPokemon] = useState({});
    //console.log("api get pokemon", API, typeof(API));
    let pokemon = {};
    /* useEffect(() => {
        async function fetchData() { */
        await axios.get(API)
        .then(response => {pokemon = response.data})
        .catch(error => console.log(error))
        /* }
        fetchData();
      }, []); 
 */
    //console.log("api consultada", pokemon) 

    return pokemon;
}

export default useGetPokemon;