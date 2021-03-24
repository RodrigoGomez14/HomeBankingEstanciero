import React, {useState,useEffect} from 'react'
import {Paper,Button,Grid, TextField, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Layout from '../Pages/Layout'
import DialogFullRoom from '../Dialogs/DialogFullRoom'
import firebase from 'firebase'
import DialogTransferencia from '../Dialogs/DialogTransferencia'
import {connect} from 'react-redux'
import PlayerCard from '../Components/PlayerCard'

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
        height:'calc(100vh - 56px)',
    },
    grid:{
        margin:0
    }
})
const Mesa = (props) =>{
    const classes = useStyles()
    const [loading,setloading] = useState(true)
    const [dialogFullRoom,setdialogFullRoom] = useState(false)
    const [dialogTransferencia,setdialogTransferencia] = useState(false)
    const [jugadores,setjugadores] = useState([])
    const [pinBanco,setpinBanco] = useState(undefined)

    const goBack= async() =>{
        let aux = jugadores
        let jugadoresPerdidos =[]
        aux.map((jugador,i)=>{
            if(jugador.nombre===props.location.nombre){
                jugadoresPerdidos.push({nombre:jugador.nombre,efectivo:jugador.efectivo})
                aux[i].nombre='-'
                aux[i].efectivo=0
            }
        })
        await firebase.database().ref().child(props.location.id).update({
            jugadoresPerdidos:jugadoresPerdidos,
            jugadores:aux
        })
        props.history.goBack()
    }
    useEffect(() => {
        if(!props.location.id){
            props.history.goBack()
        }
        else{
            const fetchData= async () =>{
                await firebase.database().ref(props.location.id).child('jugadores').on('value',(snapshot)=>{
                    setjugadores(snapshot.val())
                })
                obtenerPinBanco()
                setloading(false)
            }
            fetchData()
        }
    }, [])
    const obtenerPinBanco = async () =>{
        await firebase.database().ref(props.location.id).child('pinBanco').on('value',(snapshot)=>{
            setpinBanco(snapshot.val())
        })
    }
    return(
        <Layout id={props.location.id} goBack={goBack} pinBanco={pinBanco}>
            <Paper elevation={3} className={classes.paper}>
                {loading?
                    <>
                        <h1>Cargando...</h1>
                        <DialogFullRoom open={dialogFullRoom} handleClose={()=>{setdialogFullRoom(false)}} goBack={()=>{props.history.goBack()}}/>
                    </>
                    :
                    <Grid container className={classes.grid}>
                        <Grid item xs={12}>
                            {jugadores?
                                <PlayerCard nombre={props.user.displayName} efectivo={jugadores[props.user.uid].efectivo}/>
                                :
                                null
                            }
                        </Grid>
                        <DialogTransferencia open={dialogTransferencia} handleClose={()=>{setdialogTransferencia(false)}} jugadores={jugadores} id={props.location.id} remitente={props.user.displayName}/>
                        {
                            jugadores?
                                Object.keys(jugadores).map((id,i)=>(
                                    <>
                                        {
                                            id!=props.user.uid?
                                                <Grid item xs={12}>
                                                    <PlayerCard nombre={jugadores[id].nombre} efectivo={jugadores[id].efectivo}/>
                                                </Grid>
                                                :
                                                null
                                        }
                                    </>
                                ))
                                :
                                null
                        }
                        <Grid item xs={12} alignItems='center'>
                            <Button variant='contained' onClick={()=>{setdialogTransferencia(true)}} color="primary">
                                Transferir
                            </Button>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Layout>
    )
}

const mapStateToProps = state =>{
    return{
        user:state.user,
    }
}
export default connect(mapStateToProps,null)(Mesa)