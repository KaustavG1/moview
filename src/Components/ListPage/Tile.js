import React from 'react';
import './Tile.css';
import { withRouter } from 'react-router-dom';

function Tile(props) {
    const { imgSrc, name, id } = props;
    // console.log(props);

    function handleClick() {
        props.history.push(`/${id}`);
    }

    return (<div onClick={handleClick}>
        <img src={imgSrc} alt={name} />
        <p>{name}</p>
    </div>);
}

// export default withRouter(Tile);
export default withRouter(Tile);