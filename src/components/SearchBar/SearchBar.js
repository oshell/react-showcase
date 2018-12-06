import React from 'react';
import * as style from '../../constants/style';
import Input from '../../container/SearchBar/Input';
import Dropdown from '../../container/SearchBar/Dropdown';
import Button from '../../container/SearchBar/Button';

const SearchBar = () => {
  return(
    <div style={style.css.searchBar.wrapper}>
      <Input />
      <Dropdown />
      <Button />
    </div>
  );
}

export default SearchBar;
