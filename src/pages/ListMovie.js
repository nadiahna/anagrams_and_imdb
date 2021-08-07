import '../App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Input, Space } from 'antd';
import { Link } from 'react-router-dom';

const baseUrl = `http://www.omdbapi.com/?apikey=2f677b89`;
export default function ListMovie() {
  const [imodb, setImodb] = useState(null);
  //modalposter
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

//search
  const { Search } = Input;
  const onSearch = (value, page) => {
    const searchUrl = baseUrl+"&s="+value+"&page="+page
    axios.get(searchUrl).then((response) => {
      setImodb(response.data.Search);
      console.log(response.data.Search);
    });
    console.log(value);
  }

//getmovies
  useEffect(() => {
    onSearch("batman", "1")
  }, []);
  if (!imodb) return null;
 

  return (
    <div className="App">
      <Space direction="vertical">
        <Search
          placeholder="input title movie"
          enterButton="Search"
          size="large"
          onSearch={onSearch}
      />
    </Space>
      {imodb.map((data, id)=>{
        return (
          <>
        <div className="cardMovies" key={id}>
          <img alt="poster" onClick={showModal} src={data.Poster} />
          <div>
            <h5>{data.Title}</h5>
            <p>Movie type : {data.Type}</p>
            <p>Movie Year : {data.Year}</p>
            <p>Movie Id : {data.imdbID}</p>
            <Link to={`/detail-movie/${data.imdbID}`}>
                <button>Detail Movie</button>
            </Link>
          </div>
          <Modal title={data.Title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <img alt="poster" src={data.Poster} />
          </Modal>
        </div>
       </>
        )
      })}
    </div>
  );
}
