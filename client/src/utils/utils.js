export const formatStatus = status => status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

export const formatDate = date => new Date(date).toLocaleDateString();

export const formatErrors = errors =>
    errors.reduce((acc, error) => {
        if (error.path) {
            acc[error.path] = error.msg;
        } else {
            acc.general = (acc.general || []).concat(error.msg);
        }
        return acc;
    }, {});
