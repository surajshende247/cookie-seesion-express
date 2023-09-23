
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(session({
  name: 'biscuit',
  secret: 'secret', // keep this string in env file
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json({message: 'Cookie Seesion Demo'});
});

app.get('/set', (req, res) => {
  req.session.name = 'John Doe';
  res.json({message: 'Session set'});
});

app.get('/get', (req, res) => {
  res.json({
    name: req.session.name,
    id: req.session.id
  });
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  if(username === 'suraj' && password === 'oreo'){
    req.session.loggedIn = true;
    res.json({message: 'Login success'});
  }else{
    res.json({message: 'Invalid credentials'});
  }
});

app.get('/dashboard', (req, res) => {
  console.log(req.session);
  if(req.session.loggedIn){
    res.json({message: 'This is dashboard'});
  }else{
    res.json({message: 'You need to login first'});
  }
});

app.listen(PORT, () =>{
  console.log(`Server running on port: ${PORT}`)
});
