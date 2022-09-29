import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { getDataCities } from '../../Redux/Cities/action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [enteredCity, setEnteredCity] = React.useState(item.city);
  const [enteredPopulation, setEnteredPopulation] = React.useState(item.population);
    const [enteredCountry, setEnteredCountry] = React.useState(item.country);
    let dispatch = useDispatch();

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
        if(enteredCity === '' || enteredCountry === '' || enteredPopulation === ''){
            alert('Please fill all fields');
            return;
        }
        await fetch(`https://country-city-app-by-akash.herokuapp.com/cities/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country:enteredCountry,
                city:enteredCity,
                population:enteredPopulation
            })
        });
        alert('City updated');
        dispatch(getDataCities());
        setOpen(false);
        setEnteredCountry('');
        setEnteredCity('');
        setEnteredPopulation('');
        

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} style={{textAlign:"center"}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit City
            </Typography>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}> */}
            <Box style={{display:"flex", flexDirection:'column', gap:"5px"}}>
            <TextField id="standard-basic" label="Country" variant="standard" value={enteredCountry} onChange={(e)=>{setEnteredCountry(e.target.value)}}/>
            <TextField id="standard-basic" label="City" variant="standard" value={enteredCity} onChange={(e)=>{setEnteredCity(e.target.value)}}/>
            <TextField id="standard-basic" label="Population" variant="standard" value={enteredPopulation} onChange={(e)=>{setEnteredPopulation(e.target.value)}}/>
            </Box>
              <Button onClick={(e)=>{handleUpdate(e)}} style={{margin:"auto"}}>Update</Button>
            {/* </Typography> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
