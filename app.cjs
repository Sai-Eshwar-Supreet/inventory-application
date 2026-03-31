const express = require('express');
const path = require('path');
const indexRouter = require('./routes/indexRouter.cjs');

const app = express();

// ==================== SETUP ===================
app.set('views', path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ==================== ROUTING ===================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);

app.use((req, res) => {
    res.status(404).render('errorPage', {errMessage: 'Path does not exist'});
});

// ==================== ERROR HANDLING ===================

app.use((err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }

    console.error(err);
    res.status(err.status || 500).render('errorPage', {errMessage: err.message || 'Something seems to be broken!'});
});

// ==================== LISTEN TO REQUESTS ===================
const PORT = process.env.PORT || 8080;
app.listen(PORT, err => {
    if(err) throw err;
    console.log(`Listening to port ${PORT}`);
});