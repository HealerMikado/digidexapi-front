import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Masonry from 'react-masonry-css';
import axios from "axios";

const breakpointColumnsObj = {
    default: 8,
    2100: 6,
    1380: 6,
    1140: 4,
    960: 3,
    720: 2,
    540: 2,
}

function DigimonMasonry() {
    const [digimons, setDigimons] = useState([]);
    const [ws_url] = useState(process.env.REACT_APP_API_URL + "/digimon?page_size=30&page=");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)
    const ref = useRef();
    const [searchParams] = useSearchParams();
    const digimonSearch = searchParams.get("name");


    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                console.log(loading)
                if (first.isIntersecting) {
                    setPage((no) => no + 1);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5
            })
    );

    const callDigimon = () => {
        if (page === 0) {
            return  
        }
        setLoading(true);
        let url = ws_url + page;
        console.log(digimonSearch)
        if (digimonSearch != null && digimonSearch!=="") {
            url+=`&name_contains=${digimonSearch}`
        }
        console.log(url)

        axios.get(url)
            .then(res => {
                let all = new Set([...digimons, ...res.data.content]);
                setDigimons([...all]);

            });
        setLoading(false);

    };

    useEffect(() => {
        callDigimon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {

        const currentObserver = observer.current;
        if (ref.current) {
            currentObserver.observe(ref.current);
        }
        setLoading(false);

    }, []);
    return (<>
        <Masonry
            breakpointCols={breakpointColumnsObj}
            id="masonry"
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            key="masonry">

            {digimons.map((digimon) => (
                <Digimon
                    key={digimon.name}
                    id={digimon.id}
                    name={digimon.name}
                    xantibody={digimon.xantibody}
                    release_date={digimon.release_date}
                    image_src={digimon.image_href} />
            ))
            }
        </Masonry>

        <div ref={ref}>
            <span >Loading...</span>
        </div>
    </>
    )
}


function Digimon({ id, name, xantibody, release_date, image_src }) {
    return (
        <Link to={`digimon/${id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ marginTop: '1rem', }} border={(xantibody ? 'alert' : 'primary')}>
                <Card.Img variant="top" src={image_src} />
                <Card.Header >{name.replace(/[()]/g, ' ')}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>xAntibody : {String(xantibody)}</ListGroup.Item>
                    <ListGroup.Item>Release date : {release_date}</ListGroup.Item>
                </ListGroup>
            </Card>
        </Link>

    )
}

export default DigimonMasonry;