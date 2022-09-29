import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCountry,
  getDataCities,
  sortByPopulation,
} from "../../Redux/Cities/action";
import { getDataCountries } from "../../Redux/Countries/action";
import TransitionsModal from "../EditModal/EditModal";

function Home() {
  const dispatch = useDispatch();
  const { cities } = useSelector((store) => store.cities);
  const { countries } = useSelector((store) => store.countries);
  const [enteredCountry, setEnteredCountry] = React.useState("");
  React.useEffect(() => {
    dispatch(getDataCities());
    dispatch(getDataCountries());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://country-city-app-by-akash.herokuapp.com/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(getDataCities());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{margin:"auto", display:'flex', justifyContent:"space-evenly", marginTop:'20px'}}>
        <select style={{padding:"5px"}}
          name="sort"
          id="sort"
          onChange={(e) => {
            dispatch(sortByPopulation(e.target.value, enteredCountry));
          }}
        >
          <option value="">Sort By Population</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select
          name=""
          id="country"
          value={enteredCountry}
          onChange={(e) => {
            setEnteredCountry(e.target.value);
            dispatch(filterByCountry(e.target.value));
          }}
        >
          <option value="">Select Country</option>
          {countries?.map((country) => (
            <option key={country.id} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>City</th>
            <th>Population</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, i) => (
            <tr key={city.id}>
              <td>{i + 1}</td>
              <td>{city.country}</td>
              <td>{city.city}</td>
              <td>{city.population}</td>
              <td>
                <TransitionsModal item={city}/>
              </td>
              <td>
                <Button
                  onClick={() => {
                    handleDelete(city.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
