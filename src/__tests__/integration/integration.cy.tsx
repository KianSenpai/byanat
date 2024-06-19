import { Provider } from 'react-redux'
import { mount } from 'cypress/react18'
import store from '../../store'
import SearchBox from '../../components/Header/SearchBox'
import MapComponent from '../../components/Map'
import Results from '../../components/Results'
import '../index.css'

describe('Search Box, Map, and Results Integration', () => {
    beforeEach(() => {
        cy.viewport(1000, 800)
        mount(
            <Provider store={store}>
                <SearchBox />
                <MapComponent />
                <Results />
            </Provider>
        )
    })

    it('renders the search box with dropdown and autocomplete', () => {
        cy.get('.cy-searchbox').should('exist')
        cy.get('.p-dropdown').should('exist')
        cy.get('.p-autocomplete').should('exist')
        cy.get('.p-button').should('exist')
    })

    it('selects a filter from the dropdown', () => {
        cy.get('.p-dropdown').click()
        cy.get('.p-dropdown-item').contains('Entire Home').click()
        cy.get('.p-dropdown-label').should('contain', 'Entire Home')
    })

    it('searches and selects a city from autocomplete', () => {
        cy.get('.p-autocomplete input').type('Dub')
        cy.get('.p-autocomplete-panel').contains('Dubai').click()
        cy.get('.p-autocomplete-multiple-container')
            .contains('Dubai')
            .should('exist')
    })

    it('clicks the search button and displays map and results', () => {
        cy.get('.p-autocomplete input').type('Dub')
        cy.get('.p-autocomplete-panel').contains('Dubai').click()
        cy.get('.p-button').click()

        cy.get('.cy-map').should('exist')

        cy.get('.flex-col').contains('Results in Dubai').should('exist')
    })

    it('filters results based on selected filter and city', () => {
        cy.get('.p-autocomplete input').type('Dub')
        cy.get('.p-autocomplete-panel').contains('Dubai').click()
        cy.get('.p-dropdown').click()
        cy.get('.p-dropdown-item').contains('Entire Home').click()
        cy.get('.p-button').click()

        cy.get('.flex-col')
            .contains('Results in Dubai')
            .parent()
            .find('.cy-hotelcard')
            .each(($card) => {
                cy.wrap($card).contains('Entire Home').should('exist')
            })
    })
})
