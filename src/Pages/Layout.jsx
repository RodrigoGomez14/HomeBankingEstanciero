import React from 'react'
import Appbar from '../Components/Appbar'
import {Container,Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles({
    root:{
        height:'100vh',
        padding:0,
        display:'flex',
        flexDirection:'column'
    },
    body:{
        flexGrow:1,
        background:'#102027',
        borderRadius:0,
    }
})
const Layout = ({children}) =>{
    const classes = useStyles()
    return(
        <Container className={classes.root}>
            <Appbar/>
            <Paper elevation={3} className={classes.body}>
                {children}
            </Paper>
        </Container>
    )
}
export default Layout