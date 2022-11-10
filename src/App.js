function App() {
    const input = [1, 2, 3, 4, 5, 6]
    let output = []
    let hehe = []
    for (let i = 0; i <= input.length; i++) {
        if (i % 2 == 0) {
            hehe = []
            hehe.push(input[i])
            console.log(hehe)
        } else {
            hehe.push(input[i])
            console.log(hehe)
            output.push(hehe)
        }
        // if (i == input.length) break
    }
    console.log(output)
    return output
}

export default App
