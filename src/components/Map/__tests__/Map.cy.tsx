import store from '../../../store'
import { mount } from 'cypress/react18'
import MapComponent from '../index.tsx'
import { Provider } from 'react-redux'

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

    // it('sets initial map center to Muscat', () => {
    //     cy.window().then((win) => {
    //         const mapCenter = win.mapRef.getCenter()
    //         expect(mapCenter.lng).to.equal(58.38)
    //         expect(mapCenter.lat).to.equal(23.58)
    //     })
    // })
    //
    // it('updates map center when city changes', () => {
    //     mockCityState('Dubai')
    //     cy.window().then((win) => {
    //         const mapCenter = win.mapRef.getCenter()
    //         expect(mapCenter.lng).to.equal(55.27)
    //         expect(mapCenter.lat).to.equal(25.2)
    //     })
    //
    //     mockCityState('Tehran')
    //     cy.window().then((win) => {
    //         const mapCenter = win.mapRef.getCenter()
    //         expect(mapCenter.lng).to.equal(51.37)
    //         expect(mapCenter.lat).to.equal(35.74)
    //     })
    // })

    it('fetches GeoJSON data on map load', () => {
        cy.intercept(
            'GET',
            `https://api.mapbox.com/v4/kiaaawn.c8xnqxjp/tilequery/58.38,23.58.json*`
        ).as('fetchGeoJSON')

        cy.wait('@fetchGeoJSON').its('response.statusCode').should('eq', 200)
    })
})
