import React,{useState} from 'react'
import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem} from '@material-ui/core'
import {ArrowBack,MenuOutlined} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import ConfirmExit from '../Dialogs/ConfirmExit'
const useStyles = makeStyles({
    title:{
        flexGrow:'1'
    }
})
const Appbar = ({id,goBack,pinBanco}) =>{
    const classes = useStyles()
    const [openDialog, setopenDialog] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [ocultarPin, setocultarPin] = useState(true);

    return(
        <AppBar position='static'>
            <ConfirmExit open={openDialog} handleClose={()=>{setopenDialog(false)}} goBack={()=>{goBack()}}/>
            <Toolbar>
                {id?
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=>{setopenDialog(true)}}>
                        <ArrowBack />
                    </IconButton>
                    :
                    null
                }
                <Typography variant="h6" className={classes.title}>
                    {id?
                        `Sala ${id} / Pin Banco ${pinBanco}`
                        :
                        'HomeBanking Estanciero'
                    }
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar