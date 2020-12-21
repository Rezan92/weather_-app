import React from "react";
import { MdSearch, MdClear } from "react-icons/md";

const SearchForm = ({ cityName, handleSubmit, setCityName }) => {
  return (
    <div className="form-control">
      <MdSearch className="search-icon" />
      {cityName && (
        <MdClear
          className="search-clear-icon"
          onClick={() => setCityName("")}
        />
      )}
      <input
        className="city-input"
        type="text"
        placeholder="Search City"
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
      />
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={cityName.trim() === "" ? true : false}
        style={{ cursor: cityName.trim() === "" ? "not-allowed" : "pointer" }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
