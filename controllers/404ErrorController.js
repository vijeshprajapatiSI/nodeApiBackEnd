const getErrorStatus = (req, res) => {
    return res.status(404).send("Resources not found for the given url")
}
export {getErrorStatus}