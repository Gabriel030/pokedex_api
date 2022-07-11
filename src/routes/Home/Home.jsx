import React from 'react';
import style from './Home.module.css';
import {useEffect, useState, useMemo, useRef} from 'react';
import Card from '../../components/Card/Card';
import axios from 'axios'; 
import Navbar from '../../components/Navbar/Navbar';
import Paginado from '../../components/Paginado/Paginado';
import poke from '/images/pokebola.png';
import pokedex from '/images/pokedex.png';
import pokeLoading from '/images/pokeloading.gif';
import notfound from '/images/notfound.png';

import { Link } from 'react-router-dom';

const Home = () => {
    
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/?limit=200';
    const [order, setOrder] = useState("normal");
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("") // es lo que escribe el usuario
    const [currentPage, setCurrentPage] = useState(1);
    const [allPokemons, setAllPokemons] = useState([]);

    const indexOfLastPokemon = currentPage * 20;
    const indexOfFirstPokemon = indexOfLastPokemon - 20;
    const orderRef = useRef(); 
    const typeRef = useRef();
   

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
    }

    filtered = allPokemons.filter(p => p.data.name.includes(searchTerm) )
    setCurrentPage(1)
    return filtered


},[allPokemons, searchTerm, selectedType, order])



const handleSearch = (e) => {
    setSearchTerm(e.target.value)
}

const handleType = (e) => {
    setSelectedType(e.target.value)
}


const handleOrder = (e) => {
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
        <button className={style.reload} onClick={() => reloadAll()}  ><img src={poke} alt="pokebola" width='20px'/> Reload</button>

        
        <Link to='/game' style={{textDecoration: 'none'}} className={style.game}>
            <button className={style.reload}>
                <img src={pokedex} alt="Who's that Pokemon" width='30px'/> Play!
            </button>
        </Link>

        <div className={style.sortfilter}>
                <select className={style.sortOrder} ref={orderRef} onChange={(e)=> handleOrder(e)}>
                    <option value="normal">Normal</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                
                </select>
    
                <select className={style.sortOrder} ref = {typeRef} onChange= {(e) => handleType(e)}>
                    <option  value="All">All types</option>
                    {
                        types.map( type => (
                            <option value={type.name} key={type.name}>
                               {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                            </option>
                        ))
                    }
                </select>
            </div>


        <Paginado filteredList = {filteredList} currentPage = {currentPage} setCurrentPage={setCurrentPage}></Paginado>
        
        <div className={style.home}>

                     {/* Si aun no cargo allPokemons, entonces muestro el loading */}
                {allPokemons.length === 0 
                ? 
                (
                    <h3>
                        <img src={pokeLoading} className={style.loading} alt="Loading..." width={'300px'}/>
                    </h3>
                ) 
                :
                filteredList.length === 0 
                   ?
                   (
                    <div className={style.text}>
                    <img src={notfound} alt="not found" width={'130px'}/>
                    <h2>Pokemon not found</h2>
                  </div>
                   )
                   :
                   (
                    /* si ya cargo el allPokemons entonces mapeo la variable */
                    filteredList.slice(indexOfFirstPokemon, indexOfLastPokemon).map(poke => {
                        return (
                            <Card key={poke.data.id} poke={poke.data}></Card>
                        )
                    })
                   ) 
                }












              
            </div>
    </div>
  )

}

export default Home