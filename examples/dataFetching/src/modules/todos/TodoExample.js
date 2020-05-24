import React from 'react';
import ExecuteImmediately from './ExecuteImmediately';
import ExecuteLater from './ExecuteLater';

const TodoExample = () => {
  return (
    <>
      <h1>Example 1: execute immediately:</h1>
      <h3>Execute an api call as soon as the component is mounted</h3>
      <div style={{ maxHeight: '30vh', overflow: 'scroll' }}>
        <ExecuteImmediately />
      </div>
      <h1>Example 2: execute later (use a function to fetch):</h1>
      <h3>Execute an api call whenever you want</h3>
      <div style={{ maxHeight: '30vh', overflow: 'scroll' }}>
        <ExecuteLater />
      </div>
    </>
  );
};

export default TodoExample;
