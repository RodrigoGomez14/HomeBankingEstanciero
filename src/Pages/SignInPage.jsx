import React, {useState} from 'react'
import {Paper,Button,Grid, TextField, Typography, IconButton,Divider} from '@material-ui/core'
import {Apple} from '@material-ui/icons'
import {makeStyles} from '@material-ui/styles'
import Layout from '../Pages/Layout'
import NuevaMesa from '../Dialogs/NuevaMesa'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
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
    input:{
        width:'100%'
    },
    grid:{
        margin:0
    }
})
const SignInPage = (props) =>{
    const classes = useStyles()
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const ingresarConEmailYPassword = () =>{
        console.log(email,password)
    }
    const signIn = () =>{
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(result=>{
            const user = result.user
            const credential = result.credential
            console.log(user,credential)
        })
        //firebase.auth().signInWithPopup()
    }
    return(
        <Layout history={props.history}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container  direction='column' justify='center'  spacing={6} className={classes.grid}>
                    <Grid item container spacing={2} justify='center' direction='column'> 
                        <Grid item xs={12}>
                            <TextField variant='outlined' className={classes.input} value={email} onChange={e=>{setemail(e.target.value)}} type='email' >E-mail</TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='outlined' className={classes.input} value={password} onChange={e=>{setpassword(e.target.value)}} type='password' >Contraseña</TextField>
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Button variant='outlined' onClick={()=>{ingresarConEmailYPassword()}}>Ingresar</Button>
                        </Grid>
                    </Grid>
                    <Grid item container> 
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems='center' direction='column' spacing={2}>
                        <Grid item >
                            <Typography variant='small'> O ingresa con </Typography>
                        </Grid>
                        <Grid container item xs={12} justify='center' spacing={3}>
                            <Grid item>
                                <Button variant='contained' onClick={()=>{signIn()}}>Google</Button>
                            </Grid>
                            <Grid item>
                                <IconButton><Apple/></IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Layout>
    )
}

export default SignInPage