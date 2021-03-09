import React from 'react'
import {AppBar,Toolbar,Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles({
    title:{
        flexGrow:'1'
    }
})
const Appbar = () =>{
    const classes = useStyles()
    return(
        <AppBar position='static'>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    HomeBanking Estanciero
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar