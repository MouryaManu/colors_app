
export default {
    Navbar : {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    
    logo : {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        height: "100%",
        display: "flex",
        alignItems: "center",
        fontFamily: "Roboto",
        "& a" : {
            textDecoration: "none",
            color: "black"
            
        }
    },
    
    slider : {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        "& rc-slider-track" : {
            backgroundColor: "transparent"
        },
        "& rc-slider-rail" : {
            height: "8px"
        },
        "& .rc-slider-handle, .rc-slider-handle:active,. rc-slider-handle:focus, .rc-slider-handle:hover": {
            backgroundColor: "green",
            outline: "none green",
            border: "2px solid green",
            boxShadow: "none green",
            width: "13px green",
            height: "13px green",
            marginLeft: "-7px green",
            marginTop: "-3px green"
        }
    },
    selectContainer : {
        marginLeft: "auto",
        marginRight: "1rem"
    }
}