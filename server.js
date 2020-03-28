var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./view/swagger.json')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = process.env.port || 3030;

app.use('/', require('./controller/index'));
app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
   console.log('[Swagger] http://localhost:'+port+'/')
});
