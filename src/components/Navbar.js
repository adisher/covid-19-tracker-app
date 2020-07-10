import React from 'react';
import { makeStyles } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Card } from '@material-ui/core';

import PublicIcon from '@material-ui/icons/Public';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles({
  root: {
      position: 'relative',
      alignItems: 'center',
      padding: `20px 5px 15px`,
      boxShadow: "none",
      borderRadius: "5px 5px 0 0",
      marginLeft: "20%",
      marginRight: "20%",
      display: `flex`,
      justifyContent: `center`,
      backgroundColor: `mintcream`
  },
});

export default function Navbar({screenConfig}) {
  const classes = useStyles();
    console.log(screenConfig[0], "screen")
    
  return (
    <BottomNavigation
      value={screenConfig[0]}
      onChange={(event, newValue) => {
        screenConfig[1](newValue);
        // console.log(newValue, "new")
      }}
      showLabels
      className={classes.root}
      component={Card}
    >
      <BottomNavigationAction label="Global" icon={ <LanguageIcon/> } />
      <BottomNavigationAction label="Countries" icon={ <PublicIcon/> } />
      
    </BottomNavigation>
  );
}