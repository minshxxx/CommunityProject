const app = require('./app.js');
const schedule = require('./schedule')

const port = 3000;

schedule();

app.listen( port, function(){
    console.log('Express listening on port', port);
});