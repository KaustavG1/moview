import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import './ListHolder.css';

function ListHolder(props) {
    const [searchData, setSearchData] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    async function hitAPIForSearch(query = "") {
        if(query !== "") {
            const response = await axios.get(`${props.apiURL}?s=${query}&apikey=${props.apiKey}`);
            setSearchData(response.data.Search);
            setDataReady(true);
        }
    }

    useEffect(() => hitAPIForSearch(props.searchTerm), [props.searchTerm]);

    function renderTile() {
        if(dataReady) {
            return searchData.map(item => {
                return <Tile key={item.imdbID} imgSrc={item.Poster} alt={item.Title} name={item.Title} id={item.imdbID} />
            });
        }
    }

    return (<div className="list-items">
        {renderTile()}
    </div>);
}

export default ListHolder;