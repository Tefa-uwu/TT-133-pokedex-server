const Pokemon= require("../models/pokemon")

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
