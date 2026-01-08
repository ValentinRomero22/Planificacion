import { useMemo, useState } from 'react'

// debería obtener los usuarios llamando a la API
const initialUsers = [
    { id: 1, user: "María" },
    { id: 2, user: "Pedro" },
    { id: 3, user: "Carlos" }
]

const createDays = (startDate, amount) => {
    const days = []

    for (let i = 0; i < amount; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)

        const dayNumber = date.getDay()
        const isWeekend = dayNumber === 0 || dayNumber === 6

        days.push({
            id: i,
            date,
            label: date.toLocaleDateString('es-UY', {
                day: '2-digit',
                month: '2-digit'
            }),
            isWeekend,
            isRealDay: true
        })
    }

    return days
}

export const Grid = () => {
    const days = createDays(new Date(2026, 0, 1), 30)

    return (
        <section className='gridContainer'>
            <section
                className='grid'
                style={{
                    gridTemplateColumns: `150px repeat(${days.length}, 1fr)`
                }}>
                {/* HEADER DE LAS COLUMNAS */}
                <div className='cellHeader userHeader'>USUARIO</div>

                {
                    days.map(day => (
                        <div
                            key={day.id}
                            className={`cellHeader ${day.isWeekend ? 'weekend' : 'weekday'}`}
                        >
                            {day.isWeekend ? "" : day.label}
                        </div>
                    ))
                }
                {/* FILAS */}
                {initialUsers.map(user => (
                    <>
                        {/* SEPARADOR */}
                        <div key={user.id} className='separatorCell'>
                            ---
                        </div>
                        {
                            days.map(day => (
                                <div
                                    key={`${user.id}-${day.id}`}
                                    className='separatorCell'>
                                </div>
                            ))
                        }
                        
                        {/* USUARIOS */}
                        <div key={user.id} className='userCell'>
                            {user.user}
                        </div>
                        {
                            days.map(day => (
                                <div
                                    key={`${user.id}-${day.id}`}
                                    className={`cell ${day.isWeekend ? 'weekend' : 'weekday'}`}>
                                </div>
                            ))
                        }
                    </>
                ))}
            </section>
        </section>
    )
}