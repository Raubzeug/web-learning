import React from 'react';
import './search.less'

const Search = () => (
    <div className="search">
        <form action="#" method="get">
            <input className="search__input" type="text" name="q" placeholder="Search" />
            <button className="search__button" type="submit">GO</button>
        </form>
    </div>
)

export default Search