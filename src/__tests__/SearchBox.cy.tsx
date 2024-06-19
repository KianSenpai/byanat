import { mount } from 'cypress/react18'
import store from '../store'
import { Provider } from 'react-redux'
import SearchBox from '../components/Header/SearchBox'
import '../index.css'

describe('SearchBox Component', () => {
    beforeEach(() => {
        mount(
            <Provider store={store}>
                <SearchBox />
            </Provider>
        )
    })

    it('renders SearchBox component', () => {
        cy.get('.cy-searchbox').should('be.visible')
    })

    it('selects a filter from the dropdown', () => {
        cy.get('.p-dropdown').click()
        cy.get('.p-dropdown-item').contains('Entire Home').click()
        cy.get('.p-dropdown-label').should('contain', 'Entire Home')
    })

    it('searches and selects a city', () => {
        cy.get('.p-autocomplete').type('Muscat')
        cy.get('.p-autocomplete-item').contains('Muscat').click()
        cy.get('.p-autocomplete-multiple-container').should('contain', 'Muscat')
    })

    it('clicks the search button', () => {
        cy.get('button[aria-label="Search"]').click()
    })
})
