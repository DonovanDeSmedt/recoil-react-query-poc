import React, { useState } from 'react';
import Pokemon from './Pokemon';
import ErrorBoundary from '../ui/error-boundary';

const Pokedex = () => {
  const [value, setValue] = useState('');
  const [pokemons, setPokemons] = useState(['ditto', 'diglet', 'mew']);

  const searchPokemon = () => {
    setPokemons([...pokemons, value]);
    setValue('');
  };

  const deletePokemon = id => {
    setPokemons(pokemons.filter(p => p !== id));
  };

  return (
    <>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={searchPokemon}>SEARCH MY POKEMON!</button>
      <ErrorBoundary>
        {pokemons.map(p => (
          <Pokemon id={p} key={p} deletePokemon={deletePokemon} />
        ))}
      </ErrorBoundary>
    </>
  );
};

export default Pokedex;
