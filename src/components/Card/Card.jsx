import React from 'react'
import style from '../Card/Card.module.css'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { typesColors } from './TypesColors';

const Card = ({poke}) => {     
  
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
              <img src={`./images/sprites/${poke.id}.gif`} alt="Img not found"  className={style.img} />
              :
              <img src={`${poke.sprites.other.home.front_default}`}   className={style.img} />

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
                    <div style={mediumAbout}>
                        <div style={infAbout}>
                            <img src={'images/cards/weight.svg'} alt='Weight Icon'/>
                            <span className={style.pokweight}>{poke.weight / 10}kg</span>
                        </div>
                        <span className={style.weight}>Weight</span>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', paddingLeft:'24%'}}>
                        <div style={infAbout}>
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
