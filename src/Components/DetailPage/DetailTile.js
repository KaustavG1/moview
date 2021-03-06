import React, { useEffect, useState } from 'react';
import './DetailTile.css';
import axios from 'axios';

function DetailTile(props) {
    const [movieData, setMovieData] = useState({});

    async function hitAPIForID() {
        const response = await axios.get(`${props.apiURL}?i=${props.match.params.movieID}&apikey=${props.apiKey}`);
        setMovieData(response.data);
    }
    
    useEffect(() => hitAPIForID(), [movieData]);

    return (<div>
        <h1>Detail Page</h1>
        <img src={movieData.Poster} alt={movieData.Title} />
        <h1>{`${movieData.Title} (${movieData.Year})`}</h1>
        <h2>{`IMDB Rating: ${movieData.imdbRating}`}</h2>
        <h2>{`Runtime: ${movieData.Runtime}`}</h2>
        <h2>{`Genre: ${movieData.Genre}`}</h2>
        <h2>{`Director: ${movieData.Director}`}</h2>
        <h2>{`Country: ${movieData.Country}`}</h2>
        <p>{movieData.Plot}</p>
        {/* <button>View Similar</button> */}
    </div>);
}

export default DetailTile;