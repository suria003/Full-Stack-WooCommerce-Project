// Digit to letter mapping (1-9 → A-I)
const digitToLetter = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
  '6': 'F',
  '7': 'G',
  '8': 'H',
  '9': 'I'
};

// Convert letter to number (a=1, b=2, ..., z=26)
function letterToNumber(char) {
    const code = char.toLowerCase().charCodeAt(0);
    if (code >= 97 && code <= 122) {
        return code - 96;
    }
    return null;
}

// Generate custom session token from username
function sessionToken(username) {
    let token = '';

    for (let char of username) {
        const num = letterToNumber(char);
        if (!num) continue;

        for (let digit of num.toString()) {
            if (digitToLetter[digit]) {
                token += digitToLetter[digit];
            }
        }
    }

    return token;
}

module.exports = { sessionToken };