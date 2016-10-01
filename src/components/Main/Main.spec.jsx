import React from 'react'
import { Main } from './'
import expect from 'expect'
import { shallow } from 'enzyme'

const renderMain = () => {
  const wrapper = shallow(<Main />)
  return { wrapper }
}

describe('Component: Main', () => {
  it('renders a div with a className of main', () => {
    const { wrapper } = renderMain()

    expect(wrapper.find('.main').length).toEqual(1)
  })
})
