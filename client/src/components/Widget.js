import React from 'react';
import panelComponent from '../components/Panel'; 

class Widget extends React.Component {      
    render(){      
        return(
            <ul>
                <li>title 1</li>
                <li>title 2</li>
                <li>title 3</li>
            </ul>  
        )
    }        
}
   
export default panelComponent(Widget);
