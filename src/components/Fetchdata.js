

import React, { useState, useEffect } from 'react';
import Pokecard from './Pokecard';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const Fetchdata = () => {
 
  const [pokeCount, setPokeCount] = useState();
  const [pokeData, setPokeData] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [totalResults, setTotalResults] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.count)
    setPokeCount(data.count);
    getPokemon(data.results);
    // fetchMoreData()
    setNextUrl(data.next);
    setTotalResults(data.results.length);
    // console.log(pokeData.length);
  };

  const getPokemon = async (response) => {
    const tempData = [];
    for (const item of response) {
      const result = await fetch(item.url);
      const data = await result.json();
      tempData.push(data);
      
    }
    // console.log(tempData);
    setPokeData(tempData);
    setIsDataFetched(true);
    setLoading(false);
    // console.log(pokeData.length)
  };

  const fetchMoreData = async () => {
    const tempData = [];
    if (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      for (const item of data.results) {
        const result = await fetch(item.url);
        const nextdata = await result.json();
        tempData.push(nextdata);
       
      }
      setNextUrl(data.next);
    }
    setPokeData(prevData => [...prevData, ...tempData]);
    setIsDataFetched(true);
    setLoading(false);
  };

  
  // console.log(pokeData)
  
  useEffect(() => {
    pokeFun();
  }, [url]);
 

  return (
    <>
      <InfiniteScroll
        dataLength={pokeData.length}
        next={fetchMoreData}
        hasMore={pokeData.length !== pokeCount}
        loader={<Spinner />}
        
      >
        <div className="container d-flex flex-wrap justify-content-around">
          {isDataFetched ? <Pokecard pokemon={pokeData} loading={loading} /> : null}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Fetchdata;