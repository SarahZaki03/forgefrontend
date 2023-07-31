import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="light-shadow rounded d-flex justify-content-between align-items-center p-4">
      <div className="d-flex">
        <div className="d-flex flex-column r-m-2">
          <label className="text-muted my-2">Land Length</label>
          <InputGroup>
            <InputGroup.Text>In Km</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex flex-column r-m-2">
          <label className="text-muted my-2">Location From Center</label>
          <InputGroup>
            <InputGroup.Text>In Km</InputGroup.Text>
            <Form.Control aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex flex-column r-m-2">
          <label className="text-muted my-2">Land Type</label>
          <Form.Select aria-label="Land Type">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
      <Button
        sx={{ letterSpacing: 1, pt: 1, pl: 2 }}
        size="small"
        variant="contained"
      >
        Search <SearchIcon sx={{ ml: 1 }} />
      </Button>
    </div>
  );
};

export default SearchBar;
