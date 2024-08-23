const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errController = require('./controllers/error')
const sequelize = require('./util/database');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const dataRoutes = require('./routes/data');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(dataRoutes);

app.use(errController.get404);

const port = 4900;

sequelize.sync()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
})
.catch(err => {
    console.log(err);
});