import React from 'react'
import style from '../Card/Card.module.css'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



const Card = ({poke}) => {
      
  
  const typesColors={
      fire: style.fire,
      normal: style.normal,
      fighting: style.fighting,
      flying: style.flying,
      ground: style.ground,
      poison: style.poison,
      rock: style.rock,
      bug: style.bug,
      ghost: style.ghost,
      steel: style.steel,
      water: style.water,
      grass: style.grass,
      electric: style.electric,
      psychic: style.psychic,
      ice: style.ice,
      dragon: style.dragon,
      dark: style.dark,
      fairy: style.fairy,
      unknown: style.unknown,
      shadow: style.shadow
    }

    let sprite = false;
    if(poke.id >= 1 && poke.id <= 100){
        sprite = true
    }



  return (

    <Link to = {`/detail/${poke.id}`} className={style.link} >

        <div className={style.card} style={{ backgroundImage: `url(images/typesbkgm/${poke.types[0].type.name}.png)` }} >
            <span className={style.name}>{poke.name.charAt(0).toUpperCase()+ poke.name.slice(1)}</span>
            {
              poke.id< 100 ?
              <img src={`./images/sprites/${poke.id}.gif`} alt="Img not found" height="190px" className={style.img} />
              :
              <img src={`${poke.sprites.other.home.front_default}`}  height="190px" className={style.img} />

            }
            {/* type y su imagen */}
            <span className={`${style.typetitle}  ${typesColors[2]}`}>Types</span>
            
            
            <div className={style.types}>
                    {
                        poke.types ? poke.types.map( el => {
                            return(
                              <>
                                
                                <img src={`./images/types/${el.type.name}.png`} alt="Types" height="80px" key={el.type.name}/>
                              </>
                            )
                        }
                        ) :
                        <span>Types not found</span>
                    }
                </div>                                

                <span className={`${style.aboutitle} `}>About</span>
              
                <div className={style.about}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <img src={'images/cards/weight.svg'} alt='Weight Icon'/>
                            <span className={style.pokweight}>{poke.weight / 10}kg</span>
                        </div>
                        <span className={style.weight}>Weight</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', paddingLeft:'24%'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <img src={'images/cards/height.svg'} alt='Height Icon'/>
                            <span className={style.pokheight}>{poke.height / 10}m</span>
                        </div>
                        <span className={style.height}>Height</span>    
                    </div>
                </div>
          
        </div>
      </Link>
  )
}

export default Card
