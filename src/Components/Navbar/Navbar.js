import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
    const [searchTerm, setSearchTerm] = useState("");


    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.passSearchTerm(searchTerm);
    }

    function handlePageReset() {
        props.history.push('/');
    }

    return (<div>
        <h4 onClick={handlePageReset}>Moview</h4>
        <form onSubmit={handleSubmit}>
            <input name="search" onChange={handleChange} value={searchTerm} placeholder="Search for a movie" />
            <button>Submit</button>
        </form>
    </div>);
}

export default withRouter(Navbar);