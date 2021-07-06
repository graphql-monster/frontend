import React, { useCallback } from "react"
import { Nav, NavDropdown } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
    const history = useHistory()

    const goTo = useCallback(() => {
        history.push(to)
    }, [history, to])

    return (<React.Fragment>
        <Nav.Link onClick={goTo}>{children}</Nav.Link>
    </React.Fragment>)
}
export default NavLink