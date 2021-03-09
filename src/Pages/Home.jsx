import React, {useState} from 'react'
import {Paper,Button,Grid, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Layout from '../Pages/Layout'
import NuevaMesa from '../Dialogs/NuevaMesa'
const useStyles = makeStyles({
    title:{
        color:'white',
        textAlign:'center'
    },
    paper:{
        background:'#008ba3',
        display:'flex',
        justifyContent:'center',
    },
    grid:{
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})
const Home = () =>{
    const classes = useStyles()
    const [openNuevaMesa,setOpenNuevaMesa] = useState(false)
    const openDialog = type =>{
        console.log(type)
        switch (type) {
            case 'Nueva Mesa':
                setOpenNuevaMesa(true)
                break;
            default:
                break;
        }
    }

    const closeDialog= type =>{
        switch (type) {
            case 'Nueva Mesa':
                console.log('open')
                setOpenNuevaMesa(false)
                break;
            default:
                break;
        }
    }
    return(
        <Layout>
            <Grid container className={classes.grid}>
                <NuevaMesa open={openNuevaMesa} handleClose={()=>{closeDialog('Nueva Mesa')}}/>
                <Grid item direction='column' spacing={5}>
                    <Button variant='contained' onClick={()=>{openDialog('Nueva Mesa')}}>Crear Mesa</Button>
                    <TextField id="outlined-basic" label="ID" variant="outlined" />
                    <Button variant='contained'>Ingresar</Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Home