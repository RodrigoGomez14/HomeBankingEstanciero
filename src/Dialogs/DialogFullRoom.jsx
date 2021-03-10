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
const DialogFullRoom = ({open,handleClose,goBack}) =>{
    const classes = useStyles()
    return(
        <Dialog open={open} onclose={handleClose}>
            <DialogTitle>La Sala Esta LLena</DialogTitle>
            <DialogActions>
                <Button onClick={()=>{goBack()}} color="primary">
                    Salir
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogFullRoom