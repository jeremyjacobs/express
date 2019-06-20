import * as express from 'express';

import * as cors from 'cors';

import * as uuidv4 from 'uuid/v4';

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

app.get('/users', (req, res) => {
    return res.send(`Received a GET HTTP method`);
});

app.get('/users', (req, res) => {
    return res.send(Object.values(req.contex.models.users));
});

app.get('/users/:userId', (req, res) => {
    return res.send([req.params.userId]);
});

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/messages', (req,res) => {
    return res.send(Object.values(req.context.models.messages))
});

app.get('/messages/:messageId', (req, res) =>{
    return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.context.me.id,
    };
    
    req.context.models.messages[id] = message;

    return res.send(message);
});

app.post('/users', (req, res) => {
    return res.send(`Received a POST HTTP method`);
});

app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.contextmodels.messages = otherMessages;

    return res.send(message);
});

const port = process.env['PORT'];
app.listen(port, () =>
    console.log('Example app listening on port', port),
);

console.log('Hello Node.js project.');
