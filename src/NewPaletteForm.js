import React, { useEffect } from 'react'
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors'



export default function NewPaletteForm(props,{maxColors=20} ) {
        
       
   
        const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(true);
        const [colors,setColors]= React.useState(seedColors[0].colors);
        const[newColorName, setnewColorName]= React.useState('')
        const isPaletteFull= colors.length >= maxColors;
        
        const handleDrawerOpen = () => {
           setOpen(true);
        };
       
        
        const handleDrawerClose = () => {
            setOpen(false);
        };


      

        const addNewColor=(newColor)=> {
            setColors([...colors, newColor])
            setnewColorName('');
        } 

       

        const handleSubmit=(newPalette)=> {
            newPalette.id= newPalette.paletteName.toLowerCase().replace(/ /g,'-')
            newPalette.colors= colors;
            props.savePalette(newPalette);
            props.history.push('/');
        }

       

        const deleteColor=(colorName)=> {
            let filteredColors= colors.filter(color => color.name!== colorName);
            
            setColors([...filteredColors]);
        }

        const onSortEnd=({oldIndex, newIndex}) => {
               setColors((colors) => 
                   arrayMove(colors, oldIndex, newIndex)
               )
        }

        const clearColors=() => {
            setColors([]);
        }

        const addRandomColor=() => {
             const allColors= props.palettes.map(p => p.colors).flat();
             let rand;
             let randColor;
             let isDuplicateColor= true;
             while(isDuplicateColor) {
                 rand= Math.floor(Math.random() * allColors.length);
                 randColor= allColors[rand];
                 isDuplicateColor= colors.some(color => color.name === randColor.name)

             }
             setColors([...colors, randColor]);
        }
        



   
       return (
         <div className={classes.root}>
             <PaletteFormNav open={open}  palettes={props.palettes} handleSubmit={handleSubmit}
             handleDrawerOpen={handleDrawerOpen} />
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
        <Typography variant="h4" gutterBottom>Design your Palette</Typography>
        <div className={classes.buttons}>
        <Button variant='contained' color='secondary' onClick={addRandomColor} disabled={isPaletteFull} className={classes.button} >Random Color</Button>
        <Button variant='contained' color='primary' onClick={clearColors} className={classes.button} >Clear Palette</Button>
        </div>
         <ColorPickerForm isPaletteFull={isPaletteFull} 
         addNewColor={addNewColor} colors={colors} />
         </div>
        </Drawer>
        
        <main
        className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}
        >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors}
         deleteColor={deleteColor}
         axis='xy'
         onSortEnd={onSortEnd}
         distance={20} />
        </main>
        </div>
        );
}