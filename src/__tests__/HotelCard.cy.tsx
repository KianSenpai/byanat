import HotelCard from '../components/Results/HotelCard'
import '../index.css'
import { mount } from 'cypress/react18'

const title = 'Kian Hotel'
const rating = 4.7
const price = '1000'
const type = 'Entire Home'

describe('Checking hotel card', () => {
    it('should show loading', () => {
        mount(<HotelCard isLoading />)
        cy.get('.cy-hotelcard-loading').should('exist')
        cy.get('.cy-hotelcard-data').should('not.exist')
    })
    it('should have title, rating, price, type', () => {
        mount(
            <HotelCard
                isLoading={false}
                title={title}
                rating={rating}
                area={price}
                type={type}
            />
        )
        cy.get('.cy-hotelcard-loading').should('not.exist')
        cy.get('.cy-hotelcard-data').should('exist')
        cy.contains(title)
        cy.contains(rating)
        cy.contains(price)
        cy.contains(type)
    })
    context('grammar', () => {
        it('should use single words', () => {
            mount(
                <HotelCard
                    isLoading={false}
                    guest={1}
                    bedroom={1}
                    bathroom={1}
                />
            )
            cy.get('.cy-hotelcard-loading').should('not.exist')
            cy.get('.cy-hotelcard-data').should('exist')
            cy.contains('guest')
            cy.contains('bedroom')
            cy.contains('bathroom')
        })
        it('should use plural words', () => {
            mount(
                <HotelCard
                    isLoading={false}
                    guest={2}
                    bedroom={2}
                    bathroom={2}
                />
            )
            cy.get('.cy-hotelcard-loading').should('not.exist')
            cy.get('.cy-hotelcard-data').should('exist')
            cy.contains('guests')
            cy.contains('bedrooms')
            cy.contains('bathrooms')
        })
    })
})
