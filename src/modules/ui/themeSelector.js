import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../../state/atoms/theme.atom';

export const ThemeSelector = props => {
  const [currentTheme, setTheme] = useRecoilState(themeState);
  const themeOptions = ['light', 'dark'];
  const handleChangeTheme = e => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {themeOptions.map(theme => (
        <div key={theme}>
          <input
            onChange={handleChangeTheme}
            type="radio"
            checked={theme === currentTheme}
            id={theme}
            name="gender"
            value={theme}
          />
          <label>{theme}</label>
        </div>
      ))}
    </div>
  );
};
