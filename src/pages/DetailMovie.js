import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';

const baseUri = 'http://www.omdbapi.com/?apikey=2f677b89&i=';
const { Meta } = Card;

export default function DetailMovie() {
    const [movieDetail, setMovieDetail]= useState(null);
    let location = useLocation();
    let getIdFromPath = location.pathname.split("/").pop();
    const urlbyId = baseUri+getIdFromPath;
    console.log( location.pathname.split("/").pop(), 'loc' );

    useEffect(() => {
        axios.get(urlbyId).then((response) => {
          setMovieDetail(response.data);
          console.log(response.data);
        });
      }, [urlbyId]);
      if (!movieDetail) return null;

    return (
        <div>
             <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img alt="example" src={movieDetail.Poster} style={{ height: '50vh', width: '55vh', align: 'center' }}/>}
            >
                <Meta title={movieDetail.Title} description={movieDetail.Plot} />
                <br/>
                <p>Ratings {movieDetail.Ratings[0].Value}</p>
                <p>Release: {movieDetail.Released}</p>
                <p>Type: {movieDetail.Type}</p>
                <p>Genre: {movieDetail.Genre}</p>
                <p>Actors: {movieDetail.Actors}</p>
                <p>Production: {movieDetail.Production}</p>
                <p>Writer: {movieDetail.Writer}</p>
            </Card>
        </div>
    )
}