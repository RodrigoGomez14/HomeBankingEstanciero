import React, {useState} from 'react'
import {Paper,Button,Grid, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Layout from '../Pages/Layout'
import NuevaMesa from '../Dialogs/NuevaMesa'
import { Link } from 'react-router-dom'
const useStyles = makeStyles({
    title:{
        color:'white',
        textAlign:'center'
    },
    paper:{
        background:'#008ba3',
        display:'flex',
        justifyContent:'center',
        borderRadius:0,
        height:'calc(100vh - 56px)'
    },
    grid:{
        margin:0
    }
})
const Home = (props) =>{
    const classes = useStyles()
    const [openNuevaMesa,setOpenNuevaMesa] = useState(false)
    const [showInput,setShowInput] = useState(false)
    const [id,setid] = useState('')
    const [nombre,setnombre] = useState('')
    const openDialog = type =>{
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
                setOpenNuevaMesa(false)
                break;
            default:
                break;
        }
    }
    return(
        <Layout history={props.history}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container  direction='column' justify='center' alignItems='center' spacing={3} className={classes.grid}>
                    <NuevaMesa open={openNuevaMesa} handleClose={()=>{closeDialog('Nueva Mesa')}} history={props.history}/>
                    <Grid item>
                        <Button variant='contained' onClick={()=>{openDialog('Nueva Mesa')}}>Crear Mesa</Button>
                    </Grid>
                    <Grid item >
                        <Button variant='contained' onClick={()=>{setShowInput(true)}}>Ingresar con ID</Button>
                    </Grid>
                    {showInput?
                    <>
                        <Grid item >
                            <TextField id="outlined-basic" label="Nombre" type='text' variant="outlined" value={nombre} onChange={e=>{setnombre(e.target.value)}} />
                        </Grid>
                        <Grid item >
                            <TextField id="outlined-basic" label="ID" type='number' variant="outlined" value={id} onChange={e=>{setid(e.target.value)}} />
                        </Grid>
                        <Grid item>
                            <Link to={{pathname:'/Mesa',id:id,nombre:nombre}} >
                                <Button variant='outlined' disabled={nombre&&id? false:true}>Ingresar!</Button>
                            </Link>
                        </Grid>
                    </>
                        :
                        null
                    }
                </Grid>
            </Paper>
        </Layout>
    )
}

export default Home