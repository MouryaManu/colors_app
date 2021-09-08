import sizes from "./sizes";
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
        },
        [sizes.down("lg")] : {
            width: '25%',
            height: '20%'
        },
        [sizes.down("md")] : {
            width: '50%',
            height: '10%'
        },
        [sizes.down("xs")] : {
            width: '100%',
            height: '5%'
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

export default styles;