import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Home } from '../../containers'
import { Home } from './'
import expect from 'expect'
import { shallow } from 'enzyme'

const renderHomeContainer = () => {
  const mockStore = configureMockStore(),
        store = mockStore({
          employee: {}
        }),
        wrapper = shallow(<Provider store={store}><Home /></Provider>)

  return { wrapper }
}

describe('Container: Home', () => {
  it('renders a div with a className of home', () => {
    const { wrapper } = renderHomeContainer()

    expect(wrapper.find('.home')).toExist()
  })
})
