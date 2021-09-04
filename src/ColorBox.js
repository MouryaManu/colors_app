import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';
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
        const {paletteId, id,showLink} = this.props;
        const {copied} = this.state;
        const isDarkColor= chroma(this.props.background).luminance() <= 0.08;
        const isLightColor= chroma(this.props.background).luminance() >= 0.7;
        return (
            <CopyToClipboard text={this.props.background} onCopy={this.changeCopyState} >
            <div style={{background: this.props.background}} className="ColorBox">
                <div style={{background:this.props.background}} className={`copy-overlay ${copied && "show"}`}/>
                <div className={`copy-msg ${copied && "show"}  `}>
                     <h1>copied!</h1>
                     <p className= {isLightColor && 'dark-text'}>{this.props.background}</p>
                 </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor && "light-text"} >{this.props.name}</span>
                    </div>
                    <button className={`copy-button ${isLightColor && 'dark-text'}`} >Copy!</button>
                 </div>
                 {showLink && (
                 <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                     <span className={`more-button ${isLightColor && 'dark-text'}`} >More</span>    
                </Link>
                 )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;