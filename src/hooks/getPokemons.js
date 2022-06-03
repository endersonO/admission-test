import { useEffect, useState } from "react";
import axios from "axios";

const useGetPokemons = (API) => {
    const [pokemons, setPokemons] = useState([]);
    console.log(API)

    console.log("consultar api")
    useEffect(async() => {
        const response = await axios(API);
        console.log("respuesta", response)
        setPokemons(response.data);
    }, []);
    console.log("api consultada")

    return pokemons;
}

export default useGetPokemons;
