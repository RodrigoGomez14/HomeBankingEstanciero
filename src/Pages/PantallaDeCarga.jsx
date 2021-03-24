import React from 'react'
import {makeStyles,CircularProgress,Grid} from '@material-ui/core'
import Layout from '../Pages/Layout'

const useStyles=makeStyles(theme=>({
    root:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:theme.palette.type==='dark'?theme.palette.secondary.main:theme.palette.primary.main,
        height:'100vh',
        widht:'100%'
    },
    title:{
        color:theme.palette.primary.contrastText,
    },
    grid:{
        heigth:'100%'
    }
}))
const PantallaDeCarga = loading =>{
    const classes = useStyles()
    return(
        <Layout loading={loading} showMenu={false} >
            <Grid container justify='center' alignItems='center' className={classes.grid}>
                <Grid item>
                    <CircularProgress/>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default PantallaDeCarga