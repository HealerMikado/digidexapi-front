import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import DigimonMasonry from './components/DigimonMasonry';
import TitleBar from './components/TitleBar';
import DigimonDetail from './components/DigimonDetails';

class App extends Component {
    render() {
        return (
            <Container>
                <TitleBar/>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<DigimonMasonry />} />
                        <Route path="/digimon/:id" element={<DigimonDetail />} />
                    </Routes>
                </Router>   
            </Container>
        )
    }   
}



export default App;