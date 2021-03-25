import React from 'react'
import Appbar from '../Components/Appbar'
import {Container,Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
const useStyles = makeStyles(theme=>({
    root:{
    },
    body:{
        flexGrow:1,
        background:'#102027',
        borderRadius:0,
    },
    paper:{
        background:theme.palette.primary.main,
        height: 'calc(100vh - 56px)'
    },
    loading:{
        background:theme.palette.primary.main,
        height: '100vh'
    }
}))
const Layout = ({children,id,goBack,pinBanco,loading,showMenu}) =>{
    const classes = useStyles()
    return(
        <Grid className={classes.root}>
            {loading?
                null
                :
                <Appbar id={id} goBack={goBack} pinBanco={pinBanco} showMenu={showMenu}/>
            }
                <div className={loading?classes.loading:classes.paper}>
                    {children}
                </div>
        </Grid>
    )
}
export default Layout