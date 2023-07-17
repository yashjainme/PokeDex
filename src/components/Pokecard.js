
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
const Pokecard = ({ pokemon, loading }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const promises = pokemon.map(async (item) => {
          const response = await fetch(item.species.url);
          const data = await response.json();
          const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
          const descriptionText = englishEntry.flavor_text;
          return descriptionText;
          
        });
    
        const descriptions = await Promise.all(promises);
        setDescription(descriptions);
        
      } catch (error) {
        console.error('Error fetching descriptions:', error);
      }
    };

    if (pokemon.length > 0) {
      fetchDescription();
    }
  }, [pokemon]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        pokemon.map((item, index) => (
          <div
            className="card my-3 p-1 "
            style={{
              width: "22rem",
              background: "linear-gradient(to right, rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100))",
              color: "#ffffff",
            }}
            key={item.id}
          >
            <img
              src={
                item.sprites.other["official-artwork"].front_default
                  ? item.sprites.other["official-artwork"].front_default
                  : "https://cdn131.picsart.com/309058283249211.png"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title" style={{fontSize: "2rem", background: "linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))", padding: "4px", borderRadius: "15px"}}>
                {item.id}. {capitalize(item.name)}
              </h5>
              <p style={{background: "linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))", padding: "4px", borderRadius: "15px", marginTop: "20px"}} className="card-text">{description[index] ? description[index] : "Right Now No Description Available"}</p>
            </div>
            <ul className="list-group list-group-flush">
              
                {/* {item.stats.map((poke, index)=>{
                  return (
                    <>
                     <li className="list-group-item" style={{background: "linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))", margin: "4px", borderRadius: "15px", color: "#ffffff", border: "none" }} key={`${poke.stat.name}-${index}`}>
                
                      {capitalize( poke.stat.name)} : {poke.base_stat}
              </li>
                    </>
                  )
                })} */}
                {item.stats.map((poke, index) => (
  <li
    className="list-group-item"
    style={{
      background: "linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))",
      margin: "4px",
      borderRadius: "15px",
      color: "#ffffff",
      border: "none"
    }}
    key={`${poke.stat.name}-${index}`}
  >
    {capitalize(poke.stat.name)}: {poke.base_stat}
  </li>
))}
                
              <li className="list-group-item" style={{ background: "linear-gradient(to right, rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193))", margin: "4px", borderRadius: "15px", color: "#ffffff", border: "none" }}>
                Weight: {item.weight}
              </li>
              
             
            </ul>
       
          </div>
        ))
      )}
    </>
  );
};

export default Pokecard;