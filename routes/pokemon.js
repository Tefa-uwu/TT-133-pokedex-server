const express = require ("express")
const {test, createPokemon, getPokemons}= require("../controllers/pokemon")

const router =express.Router()

router.get("/test", test)
router.post("/", createPokemon)
router.get("/", getPokemons)

module.exports= router