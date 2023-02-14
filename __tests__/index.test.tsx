import { render, screen, fireEvent } from '@testing-library/react'
import Home from "../src/pages"
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'))

describe('Home page', () => {
    beforeEach(() => {
        render(<Home />)
    })

    it('renders a heading', () => {
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
    })

    it('renders a button', () => {
        const btn = screen.getByRole('button', {
            name: /go to users/i
        })
        expect(btn).toBeInTheDocument()
    })

    it('button is working correctly and redirect', () => {
        const btn = screen.getByRole('button', {
            name: /go to users/i
        })
        fireEvent.click(btn)
        expect(mockRouter).toMatchObject({ pathname: '/users' })
    })
})