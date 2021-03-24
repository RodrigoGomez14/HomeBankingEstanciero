import React,{useState} from 'react'
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField, Typography} from '@material-ui/core'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import firebase from 'firebase'
import {Link, Redirect} from 'react-router-dom'
const useStyles = makeStyles({
    content:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space',
        alignItems:'center'
    }
})
const NuevaMesa = ({open,handleClose,crearSala}) =>{
    const classes = useStyles()
    const [jugadores,setJugadores] = useState('')
    const handlechange = (event, value) => {
        setJugadores(value)
    };
    const handleClick = () =>{
        crearSala(jugadores)
        handleClose()
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                    <Button onClick={()=>{handleClick()}} color="primary" disabled={jugadores? false:true}>
                        Crear sala
                    </Button>
                </DialogActions>
        </Dialog>
    )
}

export default NuevaMesa