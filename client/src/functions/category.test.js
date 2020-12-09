const category = require("./category")

describe("category.getCategory", () => {
    test("0", async () => {
        await category.getCategory("")
    })

    test("1", async () => {
        await category.getCategory("path/to/file.ext")
    })

    test("2", async () => {
        await category.getCategory(".")
    })
})
