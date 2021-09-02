import React from 'react'
import {withStyles} from "@material-ui/styles";

const styles = {
    main: {
        backgroundColor : "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "green"
    }
};

function MiniPalette(props) {
    const {classes} = props;
    return(
        <div className={classes.main} >
            <h1> Mini Palete</h1>
            <section className={classes.secondary} > 
                <h1>Mini Palette inside Section</h1>
            </section>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);