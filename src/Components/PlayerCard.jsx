import React from 'react'
import {Paper,CardContent,makeStyles, Typography,Avatar,Grid} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
    card:{
        
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}))
const PlayerCard = ({img,nombre,efectivo}) =>{
    const classes = useStyles()
    return(
        <Paper elevation={3} className={classes.paper}>
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                    <Avatar src={img} className={classes.large}/>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>
                        {nombre}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h3'>
                        $ {efectivo}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
export default PlayerCard