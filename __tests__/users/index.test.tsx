import { render, screen, fireEvent } from '@testing-library/react'
import Users from '../../src/pages/users'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { initialUsersData, pagination } from '../../mock/mock'
import { columns } from '@/components/table/UserTable'

jest.mock('next/router', () => require('next-router-mock'))

describe('Users page', () => {
    beforeEach(() => {
        render(<Users initialUsersData={initialUsersData} pagination={pagination} />,
            { wrapper: MemoryRouterProvider }
        )
    })
    describe('Table renders correctly', () => {
        it('correctly renders a table header', () => {
            const tableHeader = screen.getAllByRole('columnheader')
            expect(tableHeader).toHaveLength(columns.length)
        })

        it('correctly renders a table cells', () => {
            const tableCells = screen.getAllByRole('cell')
            expect(tableCells).toHaveLength(initialUsersData.length * columns.length)
        })

        it('correctly renders a table header with assigned values', () => {
            const tableHeader = screen.getAllByRole('columnheader')
            tableHeader.forEach((el, index) => {
                if (columns[index].label === 'Gender') {
                    expect(el).toHaveTextContent('All') //TODO: think about improvement
                } else
                    expect(el).toHaveTextContent(columns[index].label)
            })
        })

        it('correctly renders a table with assigned values', () => {
            const tableCell = screen.getByRole('cell', {
                name: initialUsersData[0].name
            })
            expect(tableCell).toBeInTheDocument()
            const link = tableCell.firstChild
            expect(link).toHaveTextContent(initialUsersData[0].name)
        })

        it('link is working correctly', () => {
            const link = screen.getByRole('link', {
                name: initialUsersData[0].name
            })
            fireEvent.click(link)
            expect(mockRouter.asPath).toEqual(`/edit/${initialUsersData[0].id}`)
        })
    })
    describe('Pagination renders and redirect correctly', () => {
        it('correctly renders number of pages', () => {
            const lastBtn = screen.getByText(pagination.pages)
            expect(lastBtn).toHaveTextContent(String(pagination.pages))
            fireEvent.click(lastBtn)
            expect(mockRouter.asPath).toEqual(`users/${pagination.pages}`)
        })
    })
})