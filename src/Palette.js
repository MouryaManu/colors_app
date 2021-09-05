import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar';
import {withStyles} from "@material-ui/styles";
import './Palette.css';


const styles= {
    
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors : {
        height: "90%"
    },
    PaletteFooter : {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold",
        "& span": {
            fontSize: "1.5rem",
            margin: "1rem"
        }
    }
}

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state={
            level: 500,
            format: "hex"
        }
        this.levelChange=this.levelChange.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }
    
    levelChange(level) {
        this.setState({level});
    }
    
    changeFormat(val) {
        this.setState({
            format: val
        })
    }
    
    
    
    render() {
        const {colors, paletteName,emoji,id} = this.props.palette;
        const {format} = this.state;
        const {classes} = this.props;
        const colorBoxes = colors[this.state.level].map(color => (
            <ColorBox background={color[format]} 
            name={color.name} 
            key={color.id} 
            id={color.id} 
            paletteId={id}
            moreUrl={`/palette/${id}/${color.id}`}
            showLink
            showingFullPalette
            />
            ))
            return (
                <div className= {classes.Palette}>
                <Navbar level={this.state.level} 
                levelChange={this.levelChange}
                handleChange={this.changeFormat} 
                showingAllColors
                />
                <div className= {classes.PaletteColors}>
                {colorBoxes}
                </div>
                <footer className={classes.PaletteFooter}>
                {paletteName}
                <span className='emoji'>
                {emoji}
                </span>
                </footer>
                </div>
                )
            }
        }
        
        export default withStyles(styles)(Palette);