import React from 'react';

const panelComponent = (PanelComponent) =>{
    class Panel extends React.Component {
        render(){      
          return(
            <div className="panel">
                <div>title</div>
                <div className="panel-child">
                    <PanelComponent />
                </div>
            </div>  
            )
        }        
    }
    return Panel;
}
export default panelComponent;
