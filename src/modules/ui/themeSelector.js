import React, { useState } from 'react';

export const ThemeSelector = props => {
  const themeOptions = ['light', 'dark'];
  const handleChangeTheme = e => {
    const selectedTheme = e.target.value;
    // TODO: store theme in global state
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {themeOptions.map(theme => (
        <div key={theme}>
          <input
            onChange={handleChangeTheme}
            type="radio"
            id={theme}
            name="gender"
            value={theme}
          />
          <label for={theme}>{theme}</label>
        </div>
      ))}
    </div>
  );
};
