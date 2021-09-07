import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles'



const styles= {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg" : {
            color: 'white',
            transform: "scale(1.5)"
        }
    },
    boxContent : {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: "absolute",
        bottom: "0px",
        left: "0px",
        padding: "10px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px"
    },
    
    deleteIcon: {
        color: 'rgba(0,0,0,0.5)',
        transition: "all 0.3s ease-in-out",
        
    }

}

function DraggableColorBox(props) {
   const {classes} = props;
    return (
        <div className={classes.root} style={{ backgroundColor: props.color}}>
         <div className={classes.boxContent}>
            <span>
                {props.name}
            </span>
            <DeleteIcon className={classes.deleteIcon} />
         </div>
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);