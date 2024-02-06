function wagnerFischer(s1, s2) {
    let s1Length = s1.length;
    let s2Lenght = s2.length;

    if (s1Length > s2Lenght){
        s1 = s2;
        s2 = s1;

        s1Length = s2Lenght;
        s2Lenght = s1Length;
    }
    let currentRow = s1Length+1;
    let previousRow = null;
    
    for (let i=0; i<=s2Lenght+1; i++ ) {
        previousRow = currentRow;
        currentRow = s2Lenght[i] + s2Lenght[0]*s1Length;
        for (let j=0; j<=s1Length+1; j++){
            const add = previousRow[j] + 1;
            const del = currentRow[j-1] + 1;
            const substitute = previousRow[j-1];
            if (s1[j-1] !== s2[i-1]){
                substitute += 1;
            }
            currentRow[j] = Math.min(add, del, substitute);
        }
    }

    return currentRow[s1Length]
    
};

function spellCheck (word, dictionary) {
    const suggestions = [];

    for (let correctWord in dictionary){
        const distance = wagnerFischer(word, correctWord);
        suggestions.push(correctWord, distance)
    }

    suggestions.sort((a,b)=> a-b);
    return suggestions.slice(0, 10)
}