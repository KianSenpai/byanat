import store from '../store'
import { mount } from 'cypress/react18'
import MapComponent from '../components/Map'
import { Provider } from 'react-redux'
import '../index.css'

describe('MapComponent', () => {
    beforeEach(() => {
        mount(
            <Provider store={store}>
                <MapComponent />
            </Provider>
        )
    })

    it('renders MapComponent', () => {
        cy.get('.mapboxgl-canvas').should('exist')
    })

    it('fetches GeoJSON data on map load', () => {
        cy.intercept(
            'GET',
            `https://api.mapbox.com/v4/kiaaawn.c8xnqxjp/tilequery/58.38,23.58.json*`
        ).as('fetchGeoJSON')

        cy.wait('@fetchGeoJSON').its('response.statusCode').should('eq', 200)
    })
})
