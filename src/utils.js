export function getURLParams(location) {
    let match,
        urlParams = {},
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) {
            return decodeURIComponent(s.replace(pl, ' '));
        },
        query = location.search.substring(1);

    while ((match = search.exec(query)))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}
