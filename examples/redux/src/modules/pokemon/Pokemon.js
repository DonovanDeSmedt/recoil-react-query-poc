import React from 'react';
import useAPI from '../../hooks/useAPI';
import { Spinner, ErrorHandler } from '../ui/index';

const Pokemon = ({ id, deletePokemon }) => {
  const [pokemon = {}, isLoading, error] = useAPI(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <ErrorHandler error={error} />
      {pokemon && (
        <>
          <span>
            my name is {pokemon.name} and my weight is {pokemon.weight}
          </span>
          <button
            onClick={() => {
              deletePokemon(id);
            }}
          >
            Delete!
          </button>
        </>
      )}
    </div>
  );
};

export default Pokemon;
