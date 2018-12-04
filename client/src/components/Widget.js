import React from 'react';

class Widget extends React.Component {      
    render(){      
        return(
            <div className="panel">
                <div>title</div>
                <div className="panel-child">
                    <ul>
                        <li>title 1</li>
                        <li>title 2</li>
                        <li>title 3</li>
                    </ul>
                </div>
            </div> 
              
        )
    }        
}
   
export default Widget;
