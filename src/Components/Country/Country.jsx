import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDataCountries } from '../../Redux/Countries/action';

function Country() {
    const {countries} = useSelector(store => store.countries);

  const [enteredCountry, setEnteredCountry] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDataCountries());
  },[dispatch]);

  const handleAddCountry = async(e) => {
    e.preventDefault();
    try {
      let check = countries.find(
        (country) => country.country === enteredCountry);
      if(check){
        alert('Country already exists');
      }
      else if(enteredCountry === ''){
        alert('Please fill input fields');
      }
      else{
        await fetch('https://country-city-app-by-akash.herokuapp.com/countries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            country:enteredCountry
          })
        });
        dispatch(getDataCountries());
        alert('Country added');
        setEnteredCountry('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className='add-city-form' onSubmit={(e)=>{handleAddCountry(e)}}>
        <input type="text" id='country' placeholder='Enter Country' value={enteredCountry} onChange={(e)=>{setEnteredCountry(e.target.value)}}/>
        <input type='submit' value="ADD" />
      </form>
    </div>
  )
}

export default Country