import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import styles from './styles/ColorBoxStyles'
import {withStyles} from "@material-ui/styles";
import {CopyToClipboard} from 'react-copy-to-clipboard';



class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            copied: false
        };
        this.changeCopyState=this.changeCopyState.bind(this);
    }
    
    changeCopyState() {
        this.setState({copied:true}, ()=> {
            setTimeout(() => {
                this.setState({copied:false})
            }, 1500);
        })
    }
    
    render() {
        const {paletteId, id,showingFullPalette,classes} = this.props;
        const {copied} = this.state;
        const isDarkColor= chroma(this.props.background).luminance() <= 0.08;
        const isLightColor= chroma(this.props.background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={this.props.background} onCopy={this.changeCopyState} >
            <div style={{background: this.props.background}} className={classes.ColorBox}>
            <div style={{background:this.props.background}} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}/>
            <div className={`${classes.copyMessage} ${copied && classes.showMessage}  `}>
            <h1>copied!</h1>
            <p className= {classes.copyText}>{this.props.background}</p>
            </div>
            <div className={classes.boxContent}>
            <span className={classes.colorName} >{this.props.name}</span>
            </div>
            <button className={classes.copyButton}>Copy!</button>
            {showingFullPalette && (
                <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                <span className={classes.seeMore} >More</span>    
                </Link>
                )}
                </div>
                </CopyToClipboard>
                )
            }
        }
        
        export default withStyles(styles)(ColorBox);