import React, { Component } from 'react'
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
        const {copied} = this.state;
        return (
            <CopyToClipboard text={this.props.background} onCopy={this.changeCopyState} >
            <div style={{background: this.props.background}} className="ColorBox">
                <div style={{background:this.props.background}} className={`copy-overlay ${copied && "show"}`}/>
                <div className={`copy-msg ${copied && "show"}`}>
                     <h1>copied!</h1>
                     <p>{this.props.background}</p>
                 </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{this.props.name}</span>
                    </div>
                    <button className='copy-button'>Copy!</button>
                 </div>
                     <span className='more-button'>More</span>    
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;