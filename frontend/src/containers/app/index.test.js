import React from 'react'
import { render } from 'react-dom'
import App from '../app'
import { shallow } from 'enzyme'

describe('App component', () => {
  it('sums numbers', () => {
    expect(1 + 2).toEqual(3)
    expect(2 + 2).toEqual(4)
  })

  it('renders the App component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(App).exists())
  })
})
