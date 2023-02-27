# Individual Project - pokedex_api

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

# Link del Proyecto - 
**[POKEDEX](https://pokedex-api-gabriel030.vercel.app/)**




## Objetivos del Proyecto

- Construir una App utlizando React y Node
- Afirmar y conectar conceptos aprendidos en curso de UTN
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


## Resultados
### Video presentacion del proyecto
[![Watch the video](https://raw.githubusercontent.com/Gabriel030/pokedex_api/main/pokedex-api-preview.jpg)](https://vimeo.com/730295951)

##Status
[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=gabriel030)](https://github.com/anuraghazra/github-readme-stats)

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Realizar un Juego


### Requerimientos mínimos:


#### Tecnologías necesarias:
- [X] React
- [X] Express

#### Frontend

Se debe desarrollar una aplicación de React que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con
- [X] Alguna imagen de fondo representativa al proyecto
- [X] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener
- [X] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [X] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /pokemons` y deberá mostrar su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [X] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente
- [X] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético
- [X] Paginado para ir buscando y mostrando los siguientes pokemons


__Ruta de detalle de Pokemon__: debe contener
- [X] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [X] Número de Pokemon (id)
- [X] Estadísticas (vida, fuerza, defensa, velocidad)
- [X] Altura y peso



#### Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

- [X] __GET /pokemons__:
  - Obtener un listado de los pokemons desde pokeapi.
  - Debe devolver solo los datos necesarios para la ruta principal
- [X] __GET /pokemons/{idPokemon}__:
  - Obtener el detalle de un pokemon en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de pokemon
  - Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi
