import getPokemoninfo from './getPokemon'
import { useEffect, useState } from "react";
import axios from "axios";

const createPokemon = async (pokemon) => {
    console.log("crear pokemon", pokemon)

    const result = await Promise.all(pokemon.map(async (data) => {
        //const [pokemons, setPokemons] = useState([]);
        //console.log("data", data)
        //console.log("data characteris url",typeof(data.url))
        //console.log("data response", getPokemoninfo(data.url))
        const characteristic = await getPokemoninfo(data.url)
        console.log("characteristic in create pokemon", characteristic)
        
        return {
            name: data.name, 
            images: characteristic.sprites,
            types: characteristic.types, 
            height: characteristic.height, 
            weight: characteristic.weight, 
            description: "" 
        }}))
    
    console.log("create pokemon", result)
    return result
}

export default createPokemon