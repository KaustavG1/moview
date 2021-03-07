import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './Navbar.css';
import Switch from "@material-ui/core/Switch";
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

function Navbar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDark, setIsDark] = useState(false);
    const [currentRes, setCurrentRes] = useState([]);

    /***Don' touch code***/
    const handleSwitchChange = () => {
     setIsDark(!isDark);
    };

    function setTheme() {
        if(isDark) {
            document.body.style.backgroundColor = '#383838';
            document.querySelector('.nav-bar').style.backgroundColor='#000000';
            document.querySelector('.logo').style.color='#ffffff';
        } else {
            document.body.style.backgroundColor = '#e5e5e5';
            document.querySelector('.nav-bar').style.backgroundColor='#ffffff';
            document.querySelector('.logo').style.color='#000000';
        }
    }

    useEffect(() => {
        setTheme();
    }, [isDark]);

    function handlePageReset() {
        props.history.push('/');
    }
    /***Till Here***/

    function handleSubmit(evt) {
        evt.preventDefault();
        props.passSearchTerm(searchTerm);
        props.history.push(`/`);
    }

    function onChange(evt) {
        setSearchTerm(evt.target.value);
    }

    const inputProps = {
      placeholder: "Type movie name",
      value: searchTerm.toString(),
      onChange: onChange
    };

    function getSuggestionValue(el) {
        return el.Title;
    }

    async function getSuggestions(value) {
        const inputValue = value;
        const response = await axios.get(`http://www.omdbapi.com/?s=${inputValue}&apikey=1ab924a0`);
        const suggestions = response.data;
        return suggestions;
    };

    function onSuggestionsFetchRequested({ value }) {
        getSuggestions(value).then((data) => {
            if (data.Error) {
                setCurrentRes([]);
            } else {
                setCurrentRes(data.Search);
            }
        });
    };    

    function onSuggestionsClearRequested() {
        setCurrentRes([]);
    }

    function renderSuggestion(el) {
      return <span className="name">{el.Title}</span>
    }

    function onSuggestionSelected(event, { suggestion }) {
        setSearchTerm("");
        const id = suggestion.imdbID;
        props.history.push(`/${id}`);
    }

    return (<nav className="nav-bar" >
      <span className="logo" onClick={handlePageReset}><h4>Moview</h4></span>
      <form onSubmit={handleSubmit}>
        <Autosuggest
            suggestions={currentRes}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />            
      </form>
      <Switch
            checked={isDark}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "secondary checkbox" }}
            className="theme-switch"
          />
      </nav>);
}

export default withRouter(Navbar);