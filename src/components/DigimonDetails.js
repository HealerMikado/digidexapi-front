import React from "react";
import {
    useParams,
} from "react-router-dom";
import axios from "axios";


function DigimonDetail({ id_digimon }) {
    const [digimon, setDigimon] = React.useState(null);
    const { id } = useParams();
    React.useEffect(() => {
        const url = process.env.REACT_APP_API_URL +"/digimon/"+ id;
        axios.get(url).then((response) => {
            setDigimon(response.data);
        });
    });
    if (!digimon) return null;
    return (
        <>
            <h2>{digimon.name}</h2>
            <img src={digimon.image_href} alt={digimon.name} />
            <p>Release date : {digimon.release_date}</p>
            <h3>Description</h3>
            <ul>
                {digimon.descriptions.map((description, i) => (
                    <li key={`description_${i}`}>
                        <p>{description.language}</p>
                        <p>{description.origin}</p>
                        <p>{description.description}</p></li>
                ))
                }
            </ul>
            <h3>Level</h3>
            <ul>
                {digimon.levels.map((level, i) => (
                    <li key={`level_${i}`}>{level.name}</li>
                ))
                }
            </ul>
            <h3>Fields</h3>
            <ul>
                {digimon.fields.map((field, i) => (
                    <li key={`field_${i}`}>{field.name}</li>
                ))
                }
            </ul>
            <h3>Attributes</h3>
            <ul>
                {digimon.attributes.map((attribute, i) => (
                    <li key={`attribute_${i}`}>{attribute.name}</li>
                ))
                }
            </ul>
            <h3>Skills</h3>
            <ul>
                {digimon.skills.map((skill, i) => (
                    <li key={`skill_${i}`}>
                        <p>{skill.name}</p>
                        <p>{skill.description}</p></li>
                ))
                }
            </ul>
            <h3>Digivolution</h3>
            <h4>Digivolved from</h4>
            <ul>
                {digimon.digivolved_from.map((digmon, i) => (
                    <li key={`digivolved_${i}`}>
                        <p>{digmon.name}
                            {digmon.condition !== "" ? ` (${digmon.condition})` : ''}
                        </p>
                    </li>
                ))
                }
            </ul>
            <h4>Digivolve to</h4>
            <ul>
                {digimon.digivolve_to.map((digmon, i) => (
                    <li key={`digivolve${i}`}>
                    <p>{digmon.name}
                        {digmon.condition !== "" ? ` (${digmon.condition})` : ''}
                    </p>
                </li>
                ))
                }
            </ul>
        </>

    )
}

export default DigimonDetail;