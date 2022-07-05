import React from 'react';
import { Link } from "react-router-dom";
import style from './Home.module.css'
import {useEffect, useState, useMemo, useRef} from 'react'
import Card from '../../components/Card/Card'
import Detail from '../../routes/Detail/Detail'
import axios from 'axios'; 
import Navbar from '../../components/Navbar/Navbar'
import Paginado from '../../components/Paginado/Paginado'
import PokeNotFound from '../../components/PokeNotFound/PokeNotFound';
import Loading from '/images/pokeLoading.gif';
import poke from '/images/pokebola.png';
import game from '/images/game.png';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=100'
    const  [order, setOrder] = useState("normal")
    const  [types, setTypes] = useState([])
    const  [selectedType, setSelectedType] = useState("All")
    const  [searchTerm, setSearchTerm] = useState("") // es lo que escribe el usuario
    const  [errorPokeNotFound, setErrorPokeNotFound] = useState(false);
    const  [currentPage, setCurrentPage] = useState(1)
    const  [allPokemons, setAllPokemons] = useState([])
    const  orderRef = useRef() 
    const  typeRef = useRef()

    //const [pokemon, setPokemon] = useState();

    
    useEffect(() =>{
        const getTypes = async () => {
           
            try {
           
                const {data} = await axios("https://pokeapi.co/api/v2/type/")
                setTypes(data.results)
            } catch (e) {
                console.log(e)
            }
        }
        getTypes()

    },[])


    
         
    useEffect( () => {

        const grabData = async () => {
            setErrorPokeNotFound(false)
            console.log('running the useEffect')
            const { data } = await axios(baseURL)
            const { results } = data
           
       return Promise.all(
            
            results.map( async (pokeData) => {
            const pokemon = await axios(pokeData.url);
            //si el id es mayor a 100, me tengo q traer una imagen de la api
            
            return pokemon
            })
        )
        }
        
        grabData()
            .then(data => {
           // console.log(data)
            setAllPokemons(data)
           
        })
    }, [])

//ACA YA TENGO UNA VARIABLE allPokemons que tiene a todos los pokemones
//-----------------------------------------------------------------------------------------------------------------

let filtered = allPokemons


const filteredList = useMemo(() =>{
    
    if (searchTerm === ""){

             // INICIO FILTRO ORDENAMIENTO 
            
             switch (order) {
                 case 'normal': 
                             console.log("normal")
                             filtered.sort((a,b) => {
                             if(a.data.id > b.data.id){
                                 return 1;
                             }
                             if(b.data.id > a.data.id){
                                 return -1;
                             }
                             return 0;
                             })
                      break;
                         
                 case 'asc': 
                             
                             console.log("ASC")
                             filtered.sort((a,b) => {
                             if(a.data.name > b.data.name){
                                 return 1;
                             }
                             if(b.data.name > a.data.name){
                                 return -1;
                             }
                             return 0;
                             })
                     break;   
                     
                 case 'desc':
                     console.log("DESC")
                             filtered.sort((a,b) => {
                             if(a.data.name > b.data.name){
                                 return -1;
                             }
                             if(b.data.name > a.data.name){
                                 return +1;
                             }
                             return 0;
                             })      
                         
                     break;
     
             
                     default:
                         break;
                             
             }

            //FILTRO POR TYPE
            if(selectedType != "All" ){

                filtered = allPokemons.filter(poke => {
            
                    return  poke.data.types[0].type.name.includes(selectedType)
            })
            setCurrentPage(1)
            return filtered
            
            }//FIN FILTRO POR TYPE

            setCurrentPage(1)
            return allPokemons
    }else {
        filtered = allPokemons.filter(p => p.data.name.includes(searchTerm) )
        setCurrentPage(1)
        return filtered

    }

    

},[allPokemons, searchTerm, selectedType, order])

const indexOfLastPokemon =  currentPage * 20 ;
const indexOfFirstPokemon = indexOfLastPokemon - 20 ;





const handleSearch = (e) => {
    setSearchTerm(e.target.value)
}

const handleType = (e) => {
    console.log(e.target.value)
    setSelectedType(e.target.value)
}


const handleOrder = (e) => {
    console.log(e.target.value)
    setOrder(e.target.value)

}

const reloadAll =  () =>  {
    
    setSearchTerm("")
    
    setSelectedType("All")
    typeRef.current.value = "All"
    setOrder('normal')
    orderRef.current.value = "normal"
    setCurrentPage(1)
    

}



     
      
    return (
    <div className = {style.fondo}>
        <Navbar searchTerm ={searchTerm} handleSearch={handleSearch} ></Navbar>
        <button  onClick ={() => reloadAll()} className={style.poke}><img src={poke} alt="pokebola" width='20px'/> Reload all</button>

        <Link to='/game' style={{textDecoration: 'none'}} className={style.game}><button className={style.poke}><img src={game} alt="Who's that Pokemon" width='100px'/></button></Link>

        <div className={style.sortfilter}>
                <select ref ={orderRef} onChange={(e)=> handleOrder(e)}>
                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="HAttack">Highest Attack</option>
                    <option value="LAttack">Lowest Attack</option>
                </select>
                <select >
                    <option value="All">All</option>
                    <option value="Api">API</option>
                    <option value="Created">Created</option>
                </select>
                <select ref = {typeRef} onChange= {(e) => handleType(e)}>
                    <option value="All">all types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                    }
                </select>
            </div>


        <Paginado filteredList = {filteredList} currentPage = {currentPage} setCurrentPage ={setCurrentPage} ></Paginado>
        
        


        <div className={style.home}>

                {
                    filteredList.slice(indexOfFirstPokemon, indexOfLastPokemon).map(poke => {
                        return (
                            <Card key={ poke.data.id} poke={poke.data}></Card>
                        )

                    })
                }
               
                
            </div>

    </div>
  )

}

export default Home