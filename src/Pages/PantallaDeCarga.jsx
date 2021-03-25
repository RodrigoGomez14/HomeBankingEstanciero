import React from 'react'
import {makeStyles,CircularProgress,Grid,Typography} from '@material-ui/core'
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
        height:'100%',
    },
    text:{
        color:theme.palette.primary.contrastText
    }
}))
const PantallaDeCarga = loading =>{
    const classes = useStyles()
    return(
        <Layout loading={loading} showMenu={false} >
            <Grid container justify='center' alignItems='center' direction='column' className={classes.grid}>
                <Grid item >
                    <CircularProgress color='secondary'/>
                </Grid>
                <Grid item>
                    <Typography variant='overline' className={classes.text}>Cargando</Typography>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default PantallaDeCarga