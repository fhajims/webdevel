const twentyBytes = crypto.getRandomValues(new Uint8Array(20));
console.log(twentyBytes)

console.log( "Note, the WebCrypto API produced 20 numbers with the PRNG (pseudo-random-number-generator): '" +  twentyBytes + '"' )

document
    .getElementById('out')
    .innerText = "The WebCrypto API produced twenty secure pseudo random numbers for you: '" + twentyBytes+"'."
