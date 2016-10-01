import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Home } from '../../containers'
import expect from 'expect'
import { mount } from 'enzyme'

const renderHome = () => {
  const mockStore = configureMockStore(),
        store = mockStore({
          employee: {}
        }),
        wrapper = mount(<Provider store={store}><Home /></Provider>) // mount container components. not shallow

  return { wrapper }
}

describe('Container/Component: Home', () => {
  it('renders a div with a className of home', () => {
    const { wrapper } = renderHome()

    expect(wrapper.find('.home').length).toEqual(1)
  })
})
