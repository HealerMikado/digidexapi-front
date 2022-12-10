import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function TitleBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img
                    src="./images/digidex.png"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Digimons</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}

                    </Nav>

                    <Nav className="pull-right">
                        <Form className="d-flex" method='get' action='\search'>
                        {/* <input type="text" name="name" /> */}
                            <Form.Control
                                type="search"
                                placeholder="Name"
                                className="me-2"
                                aria-label="Search"
                                name="name"
                            />
                            <Button variant="outline-secondary" type="submit"><Search /></Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TitleBar;