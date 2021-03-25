import React, {useState} from 'react'
import {Paper,Button,Grid, TextField,Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Layout from '../Pages/Layout'
import NuevaMesa from '../Dialogs/NuevaMesa'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import PlayerCard from '../Components/PlayerCard'
import firebase from 'firebase'
const useStyles = makeStyles(theme=>({
    paper:{
        background:'#008ba3',
        display:'flex',
        justifyContent:'center',
        borderRadius:0,
        height:'calc(100vh - 56px)'
    },
}))
const Home = (props) =>{
    const classes = useStyles()
    const [openNuevaMesa,setOpenNuevaMesa] = useState(false)
    const [showInput,setShowInput] = useState(false)
    const [id,setid] = useState('')
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
    const generarID = () =>{
        const id = Math.random()*10000
        return Math.trunc(id)
    }
    const crearSala= async (max) =>{
        const id = generarID()
        await firebase.database().ref().child(id).update({
            max:max,
            pinBanco:generarID(),
            jugadores:{
                [`${props.user.uid}`]:{efectivo:30000, nombre:props.user.displayName}
            }
        })
        props.history.push({pathname:'/Mesa',id:id})
    }
    const entrarASala = async () =>{
        let max = 0
        let length = 0
        let jugadores = {}
        await firebase.database().ref().child(id).child('max').once('value',(snapshot)=>{
            max=snapshot.val()
        })
        await firebase.database().ref().child(id).child('jugadores').once('value',(snapshot)=>{
            jugadores = snapshot.val()
        })
        if(Object.keys(jugadores).length<max){
            await firebase.database().ref().child(id).update({
                jugadores:{
                    ...jugadores,
                    [`${props.user.uid}`]:{efectivo:30000, nombre:props.user.displayName}
                }
            })
            props.history.push({pathname:'/Mesa',id:id})
        }
    }
    return(
        <Layout history={props.history}>
            {console.log(props.user)}
            <NuevaMesa open={openNuevaMesa} handleClose={()=>{closeDialog('Nueva Mesa')}} crearSala={crearSala} />
            <Grid container className={classes.grid}>
                <Grid container item>
                    <Grid item xs={12}>
                        <PlayerCard img={props.user.photoURL} nombre={props.user.displayName} />
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={()=>{openDialog('Nueva Mesa')}}>Crear Mesa</Button>
                </Grid>
                <Grid item >
                    <Button variant='contained' onClick={()=>{setShowInput(true)}}>Ingresar con ID</Button>
                </Grid>
                {showInput?
                <form>
                    <Grid item >
                        <TextField autoFocus id="outlined-basic" label="ID" type='number' variant="outlined" value={id} onChange={e=>{setid(e.target.value)}} />
                    </Grid>
                    <Grid item>
                        <Button onClick={()=>{entrarASala()}} variant='outlined' disabled={id? false:true}>Ingresar!</Button>
                    </Grid>
                </form>
                    :
                    null
                }
            </Grid>
        </Layout>
    )
}
const mapStateToProps = state =>{
    return{
        user:state.user,
    }
}
export default connect(mapStateToProps,null)(Home)