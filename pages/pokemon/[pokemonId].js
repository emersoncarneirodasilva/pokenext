import styles from "../../styles/Pokemon.module.css";

import Image from "next/image";

export const getStaticPaths = async() => {    // Faz o mapeamnto geral
  const maxPokemons = 251;
  const api = "https://pokeapi.co/api/v2/pokemon/";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  // retorna o params
  const paths = data.results.map((pokemon, index) => {  // O results vem da api
    return {
      params: {pokemonId: (index + 1).toString()},  // (pokemonId) tem que ser igual ao nome do arquivo
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async(context) => {   // Faz o mapeamento individual
  const id = context.params.pokemonId;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await res.json();

  return {
    props: {pokemon: data},
  }
}

export default function Pokemon({pokemon}) {
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image 
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`} 
        width="200" height="200" alt={pokemon.name} 
      /> {/* As imagens foram pegas em outra pagina (em uma cdn) */}
      <div>
        <h3>Número:</h3>
        <p>#{pokemon.id}</p>
      </div>
      <div>
        <h3>Tipo:</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) => (
            <span key={index} className={`${styles.type} ${styles["type_" + item.type.name]}`}>{item.type.name}</span>
          ))}
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p> {/* (* 10) transformação de decímetro para centímetro */}
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p> {/* (/ 10) transformação para quilogramas */}
        </div>
      </div>
    </div>
  )
}