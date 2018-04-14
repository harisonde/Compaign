const next = require('next');
const { createServer }  = require('http');

const app = next({
  dev: process.env.NODE_ENV !== 'PRODUCTION'
});

const routes = require('./routes');

const handler = routes.getRequestHandler(app);

app.prepare().then(() =>{
  createServer(handler).listen(3000, (error) => {
    if (error) throw error;
    console.log('Ready on localHost: 3000');
  })

});
