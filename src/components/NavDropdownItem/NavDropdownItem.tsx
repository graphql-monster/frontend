import React, { useCallback } from "react"
import { NavDropdown } from "react-bootstrap"
import { useHistory } from "react-router-dom"

interface NavDropdownItemProps {
    to: string
    children?: React.ReactNode
}

function NavDropdownItem({ to, children }: NavDropdownItemProps) {
    const history = useHistory()

    const goTo = useCallback(() => {
        history.push(to)
    }, [history, to])

    return (<React.Fragment>
        <NavDropdown.Item onClick={goTo}>{children}</NavDropdown.Item>
    </React.Fragment>)
}
export default NavDropdownItem