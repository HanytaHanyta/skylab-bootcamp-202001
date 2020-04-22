import React from 'react'

export default function ({ name, children }) {
    return <section>
        <div className="page">
            {children}
        </div>
    </section>
}