import React,{useState} from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField, Typography} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import firebase from 'firebase'
const useStyles = makeStyles({
    content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space',
        alignItems:'center'
    }
})
const NuevaMesa = ({open,handleClose}) =>{
    const classes = useStyles()
    const [jugadores,setJugadores] = useState('')
    const [nombre,setnombre] = useState('')
    const handlechange = (event, value) => {
        setJugadores(value)
    };
    const generarID = () =>{
        const id = Math.random()*10000
        return Math.trunc(id)
    }
    const crearSala= async ()=>{
        await firebase.database().ref().child(generarID()).update({
            max:jugadores,
            [`${nombre}`]:30000
        })
    }
    return(
        <Dialog open={open} onclose={handleClose}>
            <DialogTitle>Crear nueva mesa</DialogTitle>
            <DialogContent className={classes.content}>
                <Typography>
                    Cantidad de jugadores
                </Typography>
                <ToggleButtonGroup exclusive value={jugadores} onChange={handlechange}>
                    <ToggleButton value='2'>2</ToggleButton>
                    <ToggleButton value='3'>3</ToggleButton>
                    <ToggleButton value='4'>4</ToggleButton>
                    <ToggleButton value='5'>5</ToggleButton>
                    <ToggleButton value='6'>6</ToggleButton>
                </ToggleButtonGroup>
                <TextField label='Nombre' value={nombre} onChange={e=>{setnombre(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={()=>{crearSala()}} color="primary" disabled={nombre&&jugadores? false:true}>
                    Crear sala
                </Button>
                </DialogActions>
        </Dialog>
    )
}

export default NuevaMesa