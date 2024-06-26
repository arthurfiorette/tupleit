require('../register')

const { describe, it } = require('node:test')
const assert = require('node:assert')
const { TupleItError } = require('../index')

describe('Global prototype', async () => {
  it('should return a value when resolved', async () => {
    const testInput = 41
    const promise = Promise.resolve(testInput)

    const [err, data] = await promise.tuple()

    assert.strictEqual(err, null)
    assert.strictEqual(data, testInput)
  })

  it('should return an error when promise is rejected', async () => {
    const testErr = new Error('Test')
    const promise = Promise.reject(testErr)

    const [err, data] = await promise.tuple()

    assert.strictEqual(err, testErr)
    assert.strictEqual(data, undefined)
  })

  it('wraps non instances of Error into a TupleItError', async () => {
    const testErr = 'Test'
    const promise = Promise.reject(testErr)

    const [err, data] = await promise.tuple()

    assert.strictEqual(err instanceof TupleItError, true)
    //@ts-expect-error - this is a test
    assert.strictEqual(err.error, testErr)
    assert.strictEqual(data, undefined)
  })
})
