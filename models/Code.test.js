import { expect } from 'chai'

describe('Code model', () => {
  it('should include the default action parameter when passed no parameters', () => {
    const code = {action: 'setHumidity'}
    expect(code).to.include({
      action: 'setHumidity',
    })
  })
})
