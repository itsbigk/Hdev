import React from 'react'
import Home from './Home'
import expect from 'expect.js'
import TestUtils from 'react-addons-test-utils'

const { describe, it } = global

function renderHome(props = {}) {
  const renderer = TestUtils.createRenderer()

  renderer.render(<Home {...props} />)

  return renderer.getRenderOutput()
}

describe('Conponent: Home', () => {
  it('renders a div with a className of home', () => {
    const { props, type } = renderHome()

    expect(props.className).to.contain('home')
    expect(type).to.equal('div')
  })
})
