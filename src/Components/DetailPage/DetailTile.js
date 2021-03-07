import React, { useEffect, useState } from 'react';
import './DetailTile.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function DetailTile(props) {
    const [movieData, setMovieData] = useState({});
    const [dataReady, setDataReady] = useState(false);

    async function hitAPIForID() {
        console.log(props.match.params.movieID);
        const response = await axios.get(`${props.apiURL}?i=${props.match.params.movieID}&apikey=${props.apiKey}`);
        setMovieData(response.data);
        setDataReady(true);
    }
    
    useEffect(() => hitAPIForID(), []);

    function renderDetails() {
        if(!dataReady) {
            return (<h1 className="loading">Loading...</h1>);
        } else {
            return (<div className="details-card">
            <img src={movieData.Poster} alt={movieData.Title} className="detail-img" />
            <div className="detail-desc">
                <div className="title">{`${movieData.Title} (${movieData.Year})`}</div>
                <div className="desc">{`IMDB Rating: ${movieData.imdbRating}`}</div>
                <div className="desc">{`Runtime: ${movieData.Runtime}`}</div>
                <div className="desc">{`Genre: ${movieData.Genre}`}</div>
                <div className="desc">{`Director: ${movieData.Director}`}</div>
                <div className="desc">{`Country: ${movieData.Country}`}</div>
                <p>{movieData.Plot}</p>
            </div>
        </div>);
        }
    }

    return (<div>
        {renderDetails()}
        <Button variant="contained" size="large" color="#ffffff">View Similar</Button>
    </div>);
}

export default DetailTile;