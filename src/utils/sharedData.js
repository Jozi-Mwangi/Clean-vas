let cleanResults = {}

function setCleanResults (results){
    cleanResults = results;
}

function getCleanResults(){
    return cleanResults
}

module.exports = {setCleanResults, getCleanResults}