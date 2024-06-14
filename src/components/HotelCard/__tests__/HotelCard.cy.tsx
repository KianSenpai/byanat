import HotelCard from '../index.tsx'
import '../../../index.css'

describe('Checking hotel card', () => {
    it('should show loading', () => {
        cy.mount(<HotelCard isLoading />)
        cy.get('.cy-hotelcard-loading').should('exist')
        cy.get('.cy-hotelcard-data').should('not.exist')
    })
    // it('should have title', () => {
    //     cy.mount(<HotelCard isLoading={false} />)
    // })
})
