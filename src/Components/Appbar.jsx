import React,{useState} from 'react'
import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem} from '@material-ui/core'
import {ArrowBack,MenuOutlined} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import ConfirmExit from '../Dialogs/ConfirmExit'
import firebase from 'firebase'
const useStyles = makeStyles(theme=>({
    title:{
        flexGrow:'1'
    },
    bar:{
        background:theme.palette.primary.dark
    }
}))
const Appbar = ({id,goBack,pinBanco,showMenu}) =>{
    const classes = useStyles()
    const [openDialog, setopenDialog] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [ocultarPin, setocultarPin] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        firebase.auth().signOut()
        setAnchorEl(null);
      };

    return(
        <AppBar position='static' className={classes.bar}>
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
                {showMenu!=false?
                <>
                    <IconButton onClick={handleClick}>
                        <MenuOutlined />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>SignOut</MenuItem>
                    </Menu>
                </>
                    :
                    null
                }
            </Toolbar>
        </AppBar>
    )
}

export default Appbar