import React from 'react'
import { Badge } from 'react-bootstrap'


export const Logo = () => (
    <div id="logo">
        <a href="/">
        <img alt="" src="/logoPQL2.png" />
        <Badge className="beta-badge" variant="danger">beta</Badge>
        </a>
        
    </div>
)

export default Logo