import React, { Component } from 'react'
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import styles from './styles/PaleteStyles'
import {withStyles} from "@material-ui/styles";




class SingleColorPalette extends Component {
    constructor(props) {
    super(props);
    this.state={
        format: "hex"
    }
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.changeFormat=this.changeFormat.bind(this);
    }
 
    gatherShades(palette, colorToFilterBy) {
        let shades=[];
        let allColors= palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({
            format: val
        })
    }


    render() {
        const {classes} = this.props;
        const {format}= this.state;
        const {paletteName, emoji,id} = this.props.palette;
        const colorBoxes= this._shades.map(color => (
          <ColorBox 
          key={color.name}
          background={color[format]}
          name={color.name}
          showingFullPalette={false}
          />
        ))
        return (
            <div className={`SingleColorPalette ${classes.Palette} `}   >
                <Navbar  
                handleChange={this.changeFormat} 
                showingAllColors= {false}
                />
                <div className={classes.PaletteColors} >
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back!!</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}  />    
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);