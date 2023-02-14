import { render, screen, fireEvent } from '@testing-library/react'
import UserPage from '../../src/pages/edit/[id]'
import mockRouter from 'next-router-mock'
import { updateUser } from '@/utils/api'
import { initialUsersData } from '../../mock/mock'

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('@/utils/api', () => ({
    updateUser: jest.fn(),
}))

describe('Users page', () => {
    const [user] = initialUsersData

    beforeEach(() => {
        render(<UserPage user={user} />

        )
    })
    describe('Page should render correctly', () => {

        it('Nodes should render correctly', () => {
            const heading = screen.getByRole('heading')
            const inputs = screen.getAllByRole('textbox')
            const btns = screen.getAllByRole('button')

            expect(heading).toBeInTheDocument()
            expect(inputs).toHaveLength(2)
            expect(btns).toHaveLength(4)
        })

        it('User`s data should render correctly', () => {
            const name = screen.getByRole('textbox', { name: /name/i })
            const email = screen.getByRole('textbox', { name: /e mail/i })
            const gender = screen.getByRole('button', { name: /female/i })
            const status = screen.getByRole('button', { name: /active/i })
            expect(name).toHaveDisplayValue(user.name)
            expect(email).toHaveDisplayValue(user.email)
            expect(gender).toHaveTextContent(user.gender)
            expect(status).toHaveTextContent(user.status)

        })
    })

    describe('values should changed', () => {
        it('should change values text input values', () => {
            const name = screen.getByRole('textbox', { name: /name/i })
            fireEvent.change(name, { target: { value: 'Jon Doe' } })
            expect(name).toHaveDisplayValue('Jon Doe')
        })
    })
})