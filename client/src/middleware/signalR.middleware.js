import { hubConnection } from 'signalr-no-jquery';
export function signalRStart(store, callback) {
    
    const connection = hubConnection('http://localhost:8087');
    const hubProxy = connection.createHubProxy('notificationHub');
    window.restaurant._hub = hubProxy;

    /*window.res._hub.client.firstClientFunction = (p1) => {
        store.dispatch({ type: "SERVER_CALLED_ME", a: p1 });
    }

    window.res._hub.client.secondClientFunction = (p1, p2) => {
        store.dispatch({ type: "SERVER_CALLED_ME_2", value: p1 + p2 });
    }*/
    window.restaurant._hub.on('hello', function(message) {
        console.log(message);
    });
    
    // function loadResource(){
    //     axios.get('/resources/app.json').then(function(response){
    //         _.assign(window.restaurant, {
    //             resuource: response.data
    //         });
    //         callback();
    //     }).catch(error => console.error('Error:', error));
    // }
    
    connection.start()//{ jsonp: true }
    .done(function(){ 
        console.log('Now connected, connection ID=' + connection.id);
        //window.res._hub.invoke("callMe", "what the problem").done(data => console.log("returned:", data));
        callback();
        // loadResource();
    })
    .fail(function(){ 
        console.log('Could not connect');
    });
}