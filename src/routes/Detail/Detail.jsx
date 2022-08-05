import style from './Detail.module.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import Sword from '/images/cards/sword.png';
import Health from '/images/cards/heart.png';
import Shield from '/images/cards/shield.png';
import Speed from '/images/cards/run.png';
import Pokeball from '/images/cards/pokeball.png';
import Weight from '/images/cards/weight.svg';
import Height from '/images/cards/height.svg';
import Happiness from '/images/cards/happy.png';
import Loading from '/images/pokeLoading.gif';
import Pin from '/images/cards/pin.png';
import Navbar from '../../components/Navbar/Navbar';


const Detail = () => {

  const params = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSpe, setPokemonSpe] = useState([]);
  const [pokemonLocation, setPokemonLocation] = useState([])
  const [section, setSection] = useState(1);

  // Busca Pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        setPokemon(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPokemon()
  }, [])

  // Busca en especies
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
        setPokemonSpe(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPokemon()
  }, [])

  // Busca localizaciones de los pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}/encounters`)
        setPokemonLocation(response.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchPokemon()
  }, [])


  function handleSection(e) {
    if (e.target.innerHTML === 'About') {
      setSection(1);
    } else if (e.target.innerHTML === 'Base Stats') {
      setSection(2)
    }
  }

  return (

    <div className={style.bg} style={ {overflowX: 'hidden'}}>

      <Navbar style={ {overflowX: 'hidden'}} />


      {pokemon.length === 0 || pokemonSpe.length === 0 ? (
        <h3>
          <img src={Loading} className={style.loading} alt="Loading..." />
        </h3>

      ) : (

        <div className={style.grid} style={{ maxHeight: '100vh' }}>
          <div className={style.encabezado}>
            <h1 className={style.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <h2>#{pokemon.id}</h2>
          </div>

          <nav className={style.sections} style={{ position: 'relative' }}>
            <button onClick={e => handleSection(e)} className={section === 1 ? style.active : style.noactive}>About</button>
            <span className={style.lineab} style={section === 1 ? { opacity: '100%' } : { opacity: '0%' }}></span>

            <button onClick={e => handleSection(e)} className={section === 2 ? style.active : style.noactive}>Base Stats</button><span className={style.linestat} style={section === 2 ? { opacity: '100%' } : { opacity: '0%' }}></span>
          </nav>

          <div className={style.visual}>
            

              {/* Imagen pokemon */}
              <img src={`${pokemon.sprites.other.home.front_default}`} className={style.img} />

              {/* Muestra los tipos */}
              <div className={style.types}>
                {
                  pokemon.types ? pokemon.types.map(el => {
                    return (
                      <img src={`../../images/types/${el.type.name}.png`} alt="Types" height="160px" />
                    )
                  }
                  ) :
                    <span>Types not found</span>
                }
              </div>

            

          </div>

          {/* Contenido de la pestaña 1 */}
          <section className={section === 1 ? style.show : style.hide}>

            <div className={style.firstinfo}>
              <div className={style.descripok} style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start' }} >
                <span style={{ color: "black", fontWeight: '500', fontSize: "18px"}}>Description</span>
                <span style={{ alignSelf: 'flex-start', width: '80%' }}>
                  {/* Aca va la descripcion, tiene seteado el texto nro 4*/}

                  {pokemonSpe.flavor_text_entries[4].flavor_text}

                </span>
              </div>

              <div className={style.importantinfo}>
                <div className={style.combatinfo} style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start' }}>
                  <span style={{ color: "black", fontWeight: '500', marginBottom: '4%' }}>Combat</span>
                  <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }} className={style.animabil}>

                      <span>Abilities:</span>
                      <div className={style.apinfo}>
                        {
                          pokemon.abilities.length ? pokemon.abilities.map(el => {
                            return (
                              <span key={pokemon.id} style={{ width: '15vw', display: 'flex', justifyContent: 'flex-start' }}>{el.ability.name.replace('-', ' ')}</span>
                            )
                          }) :
                            <span>This pokemon has no abilities</span>
                        }
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '6%' }} className={style.animoves}>


                      <span>Moves:</span>



                      <div className={style.apinfo}>
                        {
                          pokemon.moves.length ? pokemon.moves.slice(0, 8).map(el => {
                            return (
                              <span key={pokemon.id + 300} style={{ display: 'inline-block' }}><img src={Pokeball} alt='Move' height='13px' width='13px' /> {el.move.name.replace('-', ' ')}</span>
                            )
                          }) :
                            <span style={{ width: '17vw' }}>This pokemon has no moves</span>
                        }
                      </div>

                    </div>
                  </div>

                </div>
                <div className={style.breedinginfo} style={{ display: 'flex', flexFlow: 'column', alignItems: 'flex-start' }}>
                  <span style={{ color: "black", fontWeight: '500', marginBottom: '4%' }}>Breeding</span>
                  <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }} className={style.animspecie}>
                      <span>Specie:</span>
                      {/* Aca mostar especie */}
                      {
                        pokemon.name ?
                          <span style={{ marginLeft: "6%", width: '15vw', display: 'flex', justifyContent: 'flex-start', color: 'rgb(41, 41, 41)' }}>{pokemon.species.name}</span>
                          :
                          <span style={{ marginLeft: "6%", color: 'rgb(41, 41, 41)' }}>This pokemon has no specie</span>
                      }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '3%' }} className={style.animhabitat}>
                      <span>Habitat:</span>
                      {/* Aca mostar Habitat */}
                      {
                        pokemonSpe.habitat ?
                          <span style={{ marginLeft: "6%", color: 'rgb(41, 41, 41)' }}>{pokemonSpe.habitat.name}</span>
                          :
                          <span style={{ marginLeft: "4%", color: 'rgb(41, 41, 41)', width: '18vw' }}>This pokemon has no habitat</span>
                      }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '3%' }} className={style.animgrowth}>
                      <span>Growth Rate:</span>
                      {
                        pokemonSpe.growth_rate ?
                          <span style={{ marginLeft: "6%", color: 'rgb(41, 41, 41)' }}>{pokemonSpe.growth_rate.name}</span>
                          :
                          <span style={{ marginLeft: "6%", color: 'rgb(41, 41, 41)' }}>This pokemon has no growth-rate</span>
                      }
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '4%' }} className={style.animlocation}>


                      <span>Location Area Encounters:</span>


                      <div className={style.apinfo}>
                        {
                          pokemonLocation.length ? pokemonLocation.slice(0, 7).map(el => {
                            return (
                              <span key={el} style={{ display: 'inline-block' }}><img src={Pin} alt='Location' height='13px' width='13px' /> {el.location_area.name.replace('-', ' ')}</span>
                            )
                          }) :
                            <span style={{ width: '25vw' }}>This pokemon has no encounter locations</span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className={section === 2 ? style.show : style.hide}>
            <div className={style.stats}>
              <div className={style.bar}>
                <div className={style.info}>
                  <span><img src={Health} alt='Speed' height='16px' width='16px' /> Hp</span>
                </div>
                <div className={style.progress} ><span style={{ width: pokemon.stats[0].base_stat > 100 ? '100%' : pokemon.stats[0].base_stat + '%' }} per={`${pokemon.stats[0].base_stat}`} className={style.hp}></span></div>
              </div>

              <div className={style.bar}>
                <div className={style.info}>
                  <span><img src={Sword} alt='Attack' height='16px' width='16px' /> Attack</span>
                </div>
                <div className={style.progress} style={{ animationDelay: '0.1s' }}><span style={{ width: pokemon.stats[1].base_stat > 100 ? '100%' : pokemon.stats[1].base_stat + '%' }} per={`${pokemon.stats[1].base_stat}`} className={style.attack}></span></div>
              </div>

              <div className={style.bar}>
                <div className={style.info}>
                  <span><img src={Shield} alt='Speed' height='16px' width='16px' /> Defense</span>
                </div>
                <div className={style.progress} style={{ animationDelay: '0.2s' }}><span style={{ width: pokemon.stats[2].base_stat > 100 ? '100%' : pokemon.stats[2].base_stat + '%' }} per={`${pokemon.stats[2].base_stat}`} className={style.defense}></span></div>
              </div>

              <div className={style.bar}>
                <div className={style.info}>
                  <span><img src={Speed} alt='Speed' height='16px' width='16px' /> Speed</span>
                </div>
                <div className={style.progress} style={{ animationDelay: '0.3s' }}><span style={{ width: pokemon.stats[5].base_stat > 100 ? '100%' : pokemon.stats[5].base_stat + '%' }} per={`${pokemon.stats[5].base_stat}`} className={style.speed}></span></div>
              </div>

              <div style={{ display: 'flex' }} className={style.moreinfo}>
                <div className={style.about}>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img src={Weight} alt='Weight Icon' />
                      <span className={style.pokweight}>{pokemon.weight / 10}kg</span>
                    </div>
                    <span className={style.weight}>Weight</span>
                  </div>
                  <div style={{ paddingTop: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img src={Height} alt='Height Icon' />
                      <span className={style.pokheight}>{pokemon.height / 10}m</span>
                    </div>
                    <span className={style.height}>Height</span>
                  </div>
                </div>


                <div className={style.aboutwo}>
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img src={Happiness} alt='Happiness' height='22px' width='22px' />
                      <span className={style.pokweight}>{pokemonSpe.base_happiness}</span>
                    </div>
                    <span className={style.weight}>Happiness</span>
                  </div>
                  <div style={{ paddingTop: '4%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img src={Pokeball} alt='Capture' height='22px' width='22px' />
                      <span className={style.pokheight}>{pokemonSpe.capture_rate}</span>
                    </div>
                    <span className={style.height}>Capture Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </section>



        </div>

      )}
    </div>
  )
}



export default Detail;