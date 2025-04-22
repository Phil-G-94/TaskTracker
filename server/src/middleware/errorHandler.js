export const errorHandler = (err, req, res, next) => {
    console.error("ERROR", err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};
