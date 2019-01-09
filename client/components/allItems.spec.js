/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
// import enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllItems} from './AllItems'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllItems', () => {
  const fakeItem = [
    {
      id: 1,
      imageUrl: 'https://place-hold.it/300',
      name: 'Uno',
      price: 10.28
    }
  ]

  const fakeItems = [
    {
      id: 1,
      imageUrl: 'https://place-hold.it/300',
      name: 'Uno',
      price: 10.28
    },
    {
      id: 2,
      imageUrl: 'https://place-hold.it/300',
      name: 'Avalon',
      price: 19.99
    },
    {
      id: 3,
      imageUrl: 'https://place-hold.it/300',
      name: 'Risk',
      price: 19.97
    }
  ]

  beforeEach(() => {
    let wrapper = shallow(<AllItems allItems={fakeItem} />)
    // let wrapper = mount(<AllItems allItems={fakeItems} />)
  })

  // it('renders the item name in an h3', () => {
  //   console.log(wrapper)
  //   // expect(wrapper.find('ul')).to.have.length(1)
  //   expect(allItems.find('game').to.have.lengthOf(3)
  //   // expect(wrapper[0].find('h3').text()).to.be.equal('Uno')
  // })
})
