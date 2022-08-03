//citation
//dervied from: https://stackoverflow.com/questions/64873956/converting-csv-tao-json-and-putting-json-into-html-table-with-js
const csvToJSON = (csvDataString) => {
    const rowsHeader1 = csvDataString.toString();
    // const rowsHeader1 = csvDataString;
    const rowsHeader = rowsHeader1.split('\r').join('').split('\n');
    const headers = rowsHeader[0].split(',');
    const content = rowsHeader.filter( (_,i) => i > 0 );
    const jsonFormatted = content.map(row => {
        const columns = row.split(',');
        return columns.reduce((p,c, i) => {
            p[headers[i]] = c;
            return p;
        }, {})
    })
    return jsonFormatted;
}

module.exports = {
    csvToJSON: csvToJSON,
};