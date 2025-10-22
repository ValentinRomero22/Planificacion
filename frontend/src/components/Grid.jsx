import { useMemo, useState } from 'react'
import { DataGrid } from 'react-data-grid'
import 'react-data-grid/lib/styles.css'

// debería obtener los usuarios llamando a la API
const initialUsers = [
    { id: 1, user: "María" },
    { id: 2, user: "Pedro" },
    { id: 3, user: "Carlos" }
]

const createDates = (start, amount = 5) => {
    const dates = []
    const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE']
    const base = new Date(start)

    let weeklyCounter = 0

    for (let i = 0; i < amount; i++) {
        const date = new Date(base)

        date.setDate(base.getDate() + i)

        const nameDay = days[date.getDay()]
        const formatDate = `${nameDay} ${date.toLocaleDateString('es-UY', {
            day: '2-digit',
            month: '2-digit'
        })}`

        if (['LUN', 'MAR', 'MIE', 'JUE', 'VIE'].includes(nameDay)) {
            dates.push({ key: `fecha_${i}`, name: formatDate })
            weeklyCounter++

            if (nameDay === 'VIE') {
                dates.push({
                    key: `separator_${weeklyCounter}`,
                    name: '',
                    isSeparator: true
                })
            }
        }
    }

    return dates
}

export const Grid = () => {
    const [rows, setRows] = useState(initialUsers)

    const startDate = new Date(2025, 9, 22)
    const dateColumns = useMemo(() => createDates(startDate, 15), [])

    const columns = useMemo(() => {
        return [
            { key: 'user', name: 'USUARIO', frozen: true, width: 150 },
            ...dateColumns.map(col => ({
                ...col,
                width: col.isSeparator ? '5px' : '180px',
                renderCell: col.isSeparator
                    ? () => (
                        <div
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                height: '100%'
                            }}
                        />
                    ) : undefined
            }))
        ]
    }, [dateColumns])

    const orderedRows = useMemo(() =>
        [...rows].sort((a, b) => a.user.localeCompare(b.user)), [rows]
    )

    const onRowsReorder = (sourceIndex, targetIndex) => {
        const newRows = [...rows]
        const [moved] = newRows.splice(sourceIndex[0], 1)
        newRows.splice(targetIndex, 0, moved)
        setRows(newRows)
    }

    return (
        <section className='gridContainer'>
            <DataGrid
                className='grid'
                columns={columns}
                rows={orderedRows}
                onRowsReorder={onRowsReorder}
            />
        </section>
    )
}