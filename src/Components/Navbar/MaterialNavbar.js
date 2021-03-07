import React from "react";
import './MaterialNavbar.css';
import Switch from "@material-ui/core/Switch";

export default function MaterialNavbar() {
  const [state, setState] = React.useState(true);

  const handleChange = () => {
    setState(!state);
  };

  return (<nav className="nav-bar">
      <span className="logo"><h4>Moview</h4></span>
      <input placeholder="Search movie name..." className="search-field" />
      <Switch
            checked={state.checkedA}
            onChange={handleChange}
            inputProps={{ "aria-label": "secondary checkbox" }}
            className="theme-switch"
          />
    </nav>);
}
