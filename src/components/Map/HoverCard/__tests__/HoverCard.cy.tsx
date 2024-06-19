import { mount } from 'cypress/react18'
import HoverCard from '../index.tsx'
import hotel from '../../../../assets/hotel.jpeg'

describe('HoverCard Component', () => {
    it('renders loading state correctly', () => {
        mount(<HoverCard isLoading={true} />)
        cy.get('.cy-loading').should('exist')
    })

    it('renders with provided props', () => {
        const image = hotel
        const bedroom = 2
        const bathroom = 1
        const price = 100

        mount(
            <HoverCard
                isLoading={false}
                image={image}
                bedroom={bedroom}
                bathroom={bathroom}
                price={price}
            />
        )

        cy.get('img').should('have.attr', 'src', image)
        cy.contains('$100').should('exist')
        cy.contains('2 beds |').should('exist')
        cy.contains('1 bath').should('exist')
    })

    it('renders with default image when image prop is not provided', () => {
        const bedroom = 2
        const bathroom = 1
        const price = 100

        mount(
            <HoverCard
                isLoading={false}
                bedroom={bedroom}
                bathroom={bathroom}
                price={price}
            />
        )

        cy.get('img').should('have.attr', 'src').should('include', 'hotel.jpeg')
        cy.contains('$100').should('exist')
        cy.contains('2 beds |').should('exist')
        cy.contains('1 bath').should('exist')
    })

    it('renders without bedroom and bathroom if not provided', () => {
        const price = 100

        mount(<HoverCard isLoading={false} price={price} />)

        cy.contains('$100').should('exist')
        cy.contains('beds |').should('not.exist')
        cy.contains('bath').should('not.exist')
    })
})
