const express = require ('express');
const app = express();
const path = require('path');
const cancionesRouter = require ('./routes/cancionesRouter')
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views',[
    path.join(__dirname,'views/main'),]);

app.use (express.json());
app.use (express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



app.use(cancionesRouter);


app.listen (3000, () => {
    console.log('servidor corriendo');
});

