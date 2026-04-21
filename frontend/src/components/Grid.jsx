import React, { useMemo, useState } from 'react'

import { Header } from "../components/Header"

// debería obtener los usuarios llamando a la API
const initialUsers = [
    { id: 1, user: "María" },
    { id: 2, user: "Pedro" },
    { id: 3, user: "Carlos" },
    { id: 4, user: "María" },
    { id: 5, user: "Pedro" },
    { id: 6, user: "Carlos" },
    { id: 7, user: "María" },
    { id: 8, user: "Pedro" },
    { id: 9, user: "Carlos" },
    { id: 10, user: "María" },
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
            date: new Intl.DateTimeFormat('es-UY', {
                weekday: 'short'
            }).format(date).toUpperCase().slice(0, 3),
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
            <Header />
            <section
                className='grid'
                style={{
                    gridTemplateColumns: `150px repeat(${days.length}, 1fr)`
                }}>

                { /* ESQUINA SUPERIOR IZQUIERDA [ USUARIO ] */}
                <div className='cellHeader userHeader corner'>USUARIO</div>

                {/* HEADER DE LAS COLUMNAS */}
                {
                    days.map(day => (
                        <div
                            key={day.id}
                            className={`cellHeader ${day.isWeekend ? 'weekend' : 'weekday'}`}
                        >
                            {day.isWeekend ? "" : `${day.date} ${day.label}`}
                        </div>
                    ))
                }
                {/* FILAS */}
                {initialUsers.map(user => (
                    <React.Fragment key={user.id}>
                        {/* USUARIOS */}
                        <div key={user.id} className='userCell'>
                            {user.user.toUpperCase()}
                        </div>
                        {
                            days.map(day => (
                                <div
                                    key={`${user.id}-${day.id}`}
                                    className={`cell ${day.isWeekend ? 'weekend' : 'weekday'}`}>
                                </div>
                            ))
                        }
                    </React.Fragment>
                ))}
            </section>
        </section>
    )
}