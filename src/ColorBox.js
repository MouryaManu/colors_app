import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import {withStyles} from "@material-ui/styles";
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const styles = {
    ColorBox: {
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button": {
            opacity: 1
        }
    },
    copyText: {
        color: props =>
        chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
        color: props =>
        chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props =>
        chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: 0
    },
    boxContent: {
        position: "absolute",
        bottom: "0%",
        left: "0%",
        padding: "10px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        position: "fixed",
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "0%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "4rem",
        opacity: "0",
        transform: "scale(0.1)",
        color: "white",
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255,255,255,0.2)",
            width: "100%",
            textAlign: "center",
            padding: "1rem",
            marginBottom: "0",
            textTransform: "uppercase"
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showMessage: {
        opacity: "1",
        zIndex: "25",
        transform: "scale(1)",
        transition: "all 0.5s ease-in-out",
        transitionDelay: "0.3s",
    }
};

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