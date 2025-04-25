export const formatStatus = status => status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

export const formatDate = date => new Date(date).toLocaleDateString();
