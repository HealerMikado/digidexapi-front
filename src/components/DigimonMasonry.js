import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Masonry from 'react-masonry-css';
import axios from "axios";

class DigimonMasonry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            digimons: [],
            ws_url: process.env.REACT_APP_API_URL+"/digimon?page=",
            loading: false,
            page: 1,
            prevY: 0,
            breakpointColumnsObj : {
                default : 8,
                2100: 6,
                1380: 6,
                1140: 4,
                960:  3,
                720:  2,
                540:  2,
              }
        }
    }
    fetchMoreData = () => {
        this.setState({ loading: true });
        const url = this.state.ws_url + this.state.page;
        this.setState({ page: this.state.page + 1 });
        axios.get(url)
            .then(res => {
                this.setState({ digimons: this.state.digimons.concat(res.data['content']) });
                this.setState({ loading: false })
            });
    }

    componentDidMount() {
        this.fetchMoreData();
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && !this.state.loading) {
            this.fetchMoreData();
            this.setState({ prevY: y });

        }
        this.setState({ prevY: y });

    }
    render() {
        return (<>
            <Masonry
                breakpointCols={this.state.breakpointColumnsObj}
                id="masonry"
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                key="masonry">

                {this.state.digimons.map((digimon) => (
                    <Link to={`digimon/${digimon.id}`} style={{ textDecoration: 'none' }}>
                        <Digimon
                            name={digimon.name}
                            xantibody={digimon.xantibody}
                            release_date={digimon.release_date}
                            image_src={digimon.image_href} />
                    </Link>
                ))
                }
            </Masonry>

            <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
            >
                <span >Loading...</span>
            </div>
        </>
        )
    }
}


function Digimon({ name, xantibody, release_date, image_src }) {
    return (
        <Card  border={(xantibody ? 'alert' : 'primary')} key={name}>
            <Card.Img variant="top" src={image_src} />
            <Card.Header >{name.replace(/[()]/g, ' ')}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>xAntibody : {String(xantibody)}</ListGroup.Item>
                <ListGroup.Item>Release date : {release_date}</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default DigimonMasonry;