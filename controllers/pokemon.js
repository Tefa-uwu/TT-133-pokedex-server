const Pokemon= require("../models/pokemon")
const {fetchPokemon}= require ("../services/fetch")

exports.test = (req, res)=>{
    console.log("controllers pokemon OK")
    res.send("controllers pokemon OK").status(200)
}

exports.createPokemon = async(req, res) =>{
    try {
        const PokemonStatus= await Pokemon.create({
            pokemon_id: req.body.pokemon_id,
            view: req.body.view,
            catch: req.body.catch,
            in_team: req.body.in_team
        })
        res.json(PokemonStatus).status(201)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
}


exports.getPokemons = async(req, res) =>{
    try {
        const pokemon= await Pokemon.find({})
        res.status(200).json(pokemon)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}

exports.getPokemonByPokemonId = async (req, res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
                                //Encuentra uno
        const pokemon = await Pokemon.findOne({"pokemon_id":pokemon_id})
        const pokemonData= await fetchPokemon(pokemon_id, pokemon)
        res.status(200).json(pokemonData)
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}

exports.catchPokemonByPokemonId = async (req, res) =>{
    try {
        const pokemon_id = req.params.pokemon_id
        //Si yo pongo una variable es porque la he visto en el codigo
        let pokemon = await Pokemon.findOne({"pokemon_id":pokemon_id})
                        // Es un modelo
        //Si no existe
        if (!pokemon){
            return res.status (404).json({message:"Pokemon not view yet"})

         //Si el pokemon ya esta capturado no se hacen mas operaciones en la base de datos
        } else if (pokemon.catch){
            //Si ya esta en catch no hay que volverlo a poner
            return res.status(200).json(pokemon)
        }else{
            //Filtro, esperamos 
            pokemon = await Pokemon.findOneAndReplace({"pokemon_id":pokemon_id},{
                pokemon_id: pokemon_id,
                view: true,
                //Lo cambianos por true
                catch: true,
            }, {new:true})//Si hay algo modificado, el codigo espera y trae el codigo modificado desde la base de datos
            return res.status(200).json(pokemon)
        }
        //capturar
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}

exports.inTeamByPokemonId = async (req, res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        //Si yo pongo una variable es porque la he visto en el codigo
        let pokemon = await Pokemon.findOne({"pokemon_id":pokemon_id})
                        // Es un modelo
        //Si no existe
        if (!pokemon){
            return res.status (404).json({message:"Pokemon not view yet"})

         //Si el pokemon ya esta capturado no se hacen mas operaciones en la base de datos
        }else if (!pokemon.catch){
            return res.status (500).json ({message: "Bad request, pokemon not catch yet"})
        }else{
            pokemon = await Pokemon.findOneAndReplace({"pokemon_id": pokemon_id}, {
                pokemon_id: pokemon_id,
                view: true,
                //Lo cambianos por true
                catch: true,
                in_team:!pokemon.in_team
                //Si es verdadero dejelo de lo contrario cambialo
            }, {new:true}
        )
        return res.status (200).json(pokemon)
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error})
    }
}