import React, { Component } from 'react'
import styles from './styles/MiniPaletteStyles'
import {withStyles} from "@material-ui/styles";
import DeleteIcom from '@material-ui/icons/Delete'

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.deletePalette=this.deletePalette.bind(this)
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id)
    }
    
    render() {
        const {classes,paletteName,emoji,colors} = this.props;
        const miniColorBoxes = colors.map(color => (
        <div 
        className={classes.miniColor}
        style={{backgroundColor: color.color }} 
        key={color.name} 
        ></div>
    ))
       return(
        <div className={classes.root} onClick={this.props.handleClick} >
         
            <DeleteIcom className={classes.deleteIcon} 
            style={{transition: 'all 500ms ease-in-out'}}
            onClick={this.deletePalette} />


            <div className={classes.color}>
              {miniColorBoxes}
            </div>    
                <h5 className={classes.title} >
                 {paletteName} <span className={classes.emoji} >{emoji}</span>
                </h5>
        </div>
    )
 }
}

export default withStyles(styles)(MiniPalette);