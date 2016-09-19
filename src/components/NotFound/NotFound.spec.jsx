import React from 'react'
import { NotFound } from './'
import expect from 'expect'
import { shallow } from 'enzyme'

const renderNotFound = () => {
  const wrapper = shallow(<NotFound />)

  return { wrapper }
}

describe('Component: NotFound', () => {
  it('renders a div with a className of not-found', () => {
    const { wrapper } = renderNotFound()

    expect(wrapper.find('.not-found')).toExist()
  })
})
