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
const DialogTransferencia = ({open,handleClose,jugadores,id,remitente}) =>{
    const classes = useStyles()
    const [destinatario,setdestinatario]=useState('')
    const [cantidad,setcantidad]=useState(undefined)
    const handleChange = (e,value) =>{
        setdestinatario(value)
    }
    const transferir = () =>{
        let aux = jugadores

        Object.keys(jugadores).map((id,i)=>{
            console.log(jugadores[id])
            if(jugadores[id].nombre===destinatario){
                console.log(aux[id].efectivo)
                console.log(cantidad)
                jugadores[id].efectivo=jugadores[id].efectivo+parseInt(cantidad)
            }
            if(jugadores[id].nombre===remitente){
                jugadores[id].efectivo=jugadores[id].efectivo-cantidad
            }
        })
        console.log(jugadores)
        firebase.database().ref().child(id).update({
            jugadores:jugadores
        })
        cerrarDialog()
    }
    const cerrarDialog=()=>{
        setdestinatario('')
        setcantidad(undefined)
        handleClose()
    }
    return(
        <Dialog open={open} onclose={handleClose}>
            <DialogTitle>Transferencia</DialogTitle>
            <DialogContent>
                <ToggleButtonGroup exclusive value={destinatario} onChange={handleChange}>
                    {
                    jugadores?
                    Object.keys(jugadores).map(id=>
                        (jugadores[id].nombre!=remitente?
                            <ToggleButton value={jugadores[id].nombre}>{jugadores[id].nombre}</ToggleButton>
                            :null
                        )
                    )
                    :
                    null
                    }
                </ToggleButtonGroup>
                <TextField label='Cantidad' value={cantidad} type='number' onChange={e=>{setcantidad(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{handleClose()}} color="primary">
                    Salir
                </Button>
                <Button variant='contained'onClick={()=>{transferir()}} color="primary" disabled={destinatario&&cantidad?false:true}>
                    Transferir
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogTransferencia