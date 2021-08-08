import '../App.css';
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Modal, Input, Space } from 'antd';
import { Link } from 'react-router-dom';

const baseUrl = `http://www.omdbapi.com/?apikey=2f677b89`;
const TOTAL_PAGES = 999;
export default function ListMovie() {
  const [imodb, setImodb] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
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
  
  const getMovies = async (value, page) => {
    setLoading(true);
    const searchUrl = baseUrl+"&s="+value+"&page="+page
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await axios.get(searchUrl)
    .then(resp => {
        setImodb(resp.data.Search)
        setLoading(false)
    });
}

const lastItemRef = useCallback(
  (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
              if (page < TOTAL_PAGES) {
                  getMovies("batman", page);
                  setPage((page) => page + 1);
              } else {
                  setHasMore(false);
              }
          }
      });
  
      if (node) observer.current.observe(node);
  },
  [loading, hasMore, page]
);

//getmovies
  useEffect(() => {
    // onSearch("batman", page);
    getMovies("batman", page);
    setPage((pages) => pages + 1);
  },[]);
  if (!imodb) return null;
 

  return (
    <div className="App">
      <Space direction="vertical">
        <Search
          placeholder="input title movie"
          enterButton="Search"
          size="large"
          onSearch={getMovies}
      />
    </Space>
      {imodb.map((data, id) =>
           id + 1 === data.length ? (
        <div reference={lastItemRef} className="cardMovies" key={id}>
          <img alt={`Poster ${id}`} onClick={showModal} src={data.Poster} />
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
            <img alt={`Poster ${id}`} src={data.Poster} />
          </Modal>
        </div>) : ( 
          <div className="cardMovies" key={id}>
          <img alt={`Poster ${id}`} onClick={showModal} src={data.Poster} />
          <div>
            <h3>{data.Title}</h3>
            <p>Movie type : {data.Type}</p>
            <p>Movie Year : {data.Year}</p>
            <p>Movie Id : {data.imdbID}</p>
            <Link to={`/detail-movie/${data.imdbID}`}>
                <button>Detail Movie</button>
            </Link>
          </div>
          <Modal title={data.Title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <img alt={`Poster ${id}`} src={data.Poster} />
          </Modal>
        </div>)
      )}
      {loading && <div className="text-center">loading data ...</div>}
    </div>
  );
}
