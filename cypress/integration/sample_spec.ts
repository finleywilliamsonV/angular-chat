describe('My First Passing Test', () => {
    it(`Doesn't do much!`, () => {
        expect(true).to.equal(true)
    })
})

describe('My First Failing Test', () => {
    it(`Doesn't do much!`, () => {
        expect(true).to.equal(false)
    })
})
