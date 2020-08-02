const app = require('express')();
import bodyParser from 'body-parser';
import consolidate from 'consolidate';
import { renderReactApp } from './ssr';

// use Twigjs with consolidate extension template engine
app.engine('html', consolidate.twig);

// set .html as the default extension
app.set('view engine', 'html');

// set view folder
app.set('views', '/var/www/html/src/server/views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// register routes
app.get('*', renderReactApp);

// listen for incoming requests
app.listen(1216, () => console.log(`Node app listening at port 1216`));