const errorHandler = (err, req, res) => {
    res.status(400).send('something went wrong');
}

export default errorHandler;