import React from 'react'
import "./skeleton.css"

export default function Skeleton(props) {
    const classes = `skeleton ${props.type}`
    return (
        <div className={classes}> </div>
    )
}
