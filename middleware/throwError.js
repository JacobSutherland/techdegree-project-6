// //General error handler middleware
const throwError = ((err, req, res, next) => {
    res.status = err.status || 500;
    res.message = err.message || 'Something Went Wrong';
    if(res.status === 404){
        res.render('page-not-found', { err: err });
        console.log(err.status, err.message);
    } else {
        res.render('error', { err: err });
        console.log(err.status, err.message);
    }
});

module.exports = throwError;