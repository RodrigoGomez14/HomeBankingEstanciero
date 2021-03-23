import React from 'react'
import {makeStyles,CircularProgress} from '@material-ui/core'
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
    }
}))
const PantallaDeCarga = ()=>{
    const classes = useStyles()
    return(
        <Layout>
            <CircularProgress/>
        </Layout>
    )
}
export default PantallaDeCarga