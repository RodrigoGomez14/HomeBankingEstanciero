import React from 'react'

const Jugadores =(props)=>{
    return(
        <>
            {props.jugadores.map((jugador,i)=>(
                <Grid item xs={12} key={i}>
                    <Typography>{jugador.nombre}</Typography>
                    <Typography>$ {jugador.efectivo}</Typography>
                </Grid>
            ))}
        </>
    )
}
export default Jugadores