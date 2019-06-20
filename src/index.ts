import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import models from './models';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use((req, res, next) => {
    req.contex = {
        models,
        me: models.users[1],
    };
    next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/session', routes.session);

const port = process.env['PORT'];
app.listen(port, () =>
    console.log('Example app listening on port', port),
);

console.log('Hello Node.js project.');
