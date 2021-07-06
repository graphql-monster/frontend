import React, { useCallback } from "react"
import { NavDropdown } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export const NavDropdownItem: React.FC<{ to: string }> = ({ to, children }) => {
    const history = useHistory()

    const goTo = useCallback(() => {
        history.push(to)
    }, [history, to])

    return (<React.Fragment>
        <NavDropdown.Item onClick={goTo}>{children}</NavDropdown.Item>
    </React.Fragment>)
}
export default NavDropdownItem