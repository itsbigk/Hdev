import React from 'react'
import { Profile } from './'
import expect from 'expect'
import { shallow } from 'enzyme'

const renderProfile = () => {
  const wrapper = shallow(<Profile />)

  return { wrapper }
}

describe('Component: Profile', () => {
  it('renders a div with a className of profile', () => {
    const { wrapper } = renderProfile()

    expect(wrapper.find('.profile').length).toEqual(1)
  })
})
