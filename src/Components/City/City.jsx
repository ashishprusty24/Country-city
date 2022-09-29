import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDataCities } from '../../Redux/Cities/action';
import { getDataCountries } from '../../Redux/Countries/action';

function City() {
  const {countries} = useSelector(store => store.countries);
  const {cities} = useSelector(store => store.cities);

  const [enteredCountry, setEnteredCountry] = React.useState('');
  const [enteredCity, setEnteredCity] = React.useState('');
  const [enteredPopulation, setEnteredPopulation] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDataCities());
    dispatch(getDataCountries());
  },[dispatch]);

  const handleAddCity = async(e) => {
    e.preventDefault();
    try {
      let check = cities.find(
        (city) => city.city === enteredCity && city.country === enteredCountry
      );
      if(check){
        alert('City already exists');
      }
      else if(enteredCity === '' || enteredCountry === '' || enteredPopulation === ''){
        alert('Please fill all fields');
      }
      else{
        await fetch('https://country-city-app-by-akash.herokuapp.com/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            country:enteredCountry,
            city:enteredCity,
            population:enteredPopulation
          })
        });
        dispatch(getDataCities());
        alert('City added');
        setEnteredCountry('');
        setEnteredCity('');
        setEnteredPopulation('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className='add-city-form' onSubmit={(e)=>{handleAddCity(e)}}>
        <select name="" id="country" value={enteredCountry} onChange={(e)=>{setEnteredCountry(e.target.value)}}>
          <option value="">Select Country</option>
          {countries?.map(country => (
            <option key={country.id} value={country.country}>{country.country}</option>
          ))}
        </select>
        <input type="text" id='city' placeholder='Enter City' value={enteredCity} onChange={(e)=>{setEnteredCity(e.target.value)}}/>
        <input type="number" id='population' placeholder='Enter Population' value={enteredPopulation} onChange={(e)=>{setEnteredPopulation(e.target.value)}}/>
        <input type='submit' value="ADD" />
      </form>
    </div>
  )
}

export default City