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
    input:{
        width:'100%'
    },
    grid:{
        height:'100%'
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
        <Layout history={props.history} showMenu={false}>
            <Grid container  className={classes.grid}>
                <Grid container item justify='center' alignItems='center'> 
                    <Grid item xs={10}>
                        <TextField variant='outlined' className={classes.input} value={email} onChange={e=>{setemail(e.target.value)}} type='email' >E-mail</TextField>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField variant='outlined' className={classes.input} value={password} onChange={e=>{setpassword(e.target.value)}} type='password' >Contraseña</TextField>
                    </Grid>
                    <Grid container item xs={12} justify='center'>
                        <Grid item>
                            <Button variant='outlined' onClick={()=>{ingresarConEmailYPassword()}}>Ingresar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item> 
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </Grid>
                <Grid container item>
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
        </Layout>
    )
}

export default SignInPage