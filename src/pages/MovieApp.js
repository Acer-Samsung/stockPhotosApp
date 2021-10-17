import React, {useEffect, useState} from 'react';
import axios from "axios";

const MovieApp = () => {

    const ApiKey = process.env.REACT_APP_API_KEY;
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=car&page=222&per_page=30&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            
        })
    }, [ApiKey]);

    return (
        <div>
            {photos.map((item, index, array) => (
                <>

                    <div className="" style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                        <h3 style={{marginRight: "15px"}}>{index + 1}</h3>
                        {item.title.length > 0 ? item.title : "No title"}
                    </div>
                    <img
                        style={{width: "auto", height: 'auto'}}
                        src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                        alt="404! Error!" className=""/>
                </>


            ))}
        </div>

    );
};

export default MovieApp;