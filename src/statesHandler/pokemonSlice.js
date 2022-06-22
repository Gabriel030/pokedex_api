import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    data: [],
    filter: "",
    selectedPokemon: null
}


//el metodo createSlice tiene 3 parametros, 1) name 2) initialState 3) reducers
const pokemonSlice  = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload
        },
        serFilter(state, action) {
            state.filter = action.payload
        },
        setSelectedPokemon(state, action){
            state.selectedPokemon = action.payload
        }
    }
})

export const {setData, setSelectedPokemon, serFilter} = pokemonSlice.actions
export default pokemonSlice.reducer
