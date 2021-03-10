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
        aux.map((jugador,i)=>{
            if(jugador.nombre===destinatario){
                console.log(aux[i].efectivo)
                console.log(cantidad)
                aux[i].efectivo=aux[i].efectivo+parseInt(cantidad)
            }
            if(jugador.nombre===remitente){
                aux[i].efectivo=aux[i].efectivo-cantidad
            }
        })
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
                    {jugadores.map(jugador=>
                        (jugador.nombre!=remitente?
                            <>
                                {console.log(jugador.nombre,remitente)}
                                <ToggleButton value={jugador.nombre}>{jugador.nombre}</ToggleButton>
                            </>
                            :null
                        )
                    )}
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