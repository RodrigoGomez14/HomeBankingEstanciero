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
const ConfirmExit = ({open,handleClose,goBack}) =>{
    const classes = useStyles()
    return(
        <Dialog open={open} onclose={handleClose}>
            <DialogTitle>Salir</DialogTitle>
            <DialogContent className={classes.content}>
                <Typography>
                    Luego puede volver a ingresar con el ID
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={()=>{goBack()}} color="primary">
                    Salir
                </Button>
                </DialogActions>
        </Dialog>
    )
}

export default ConfirmExit