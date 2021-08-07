import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Input, Space } from 'antd';

const baseUri = `http://www.omdbapi.com/?apikey=2f677b89&s=Batman&page=2`;
export default function App() {
  const words = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];
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
  const onSearch = value => console.log(value);

//anagrams
  useEffect(() => {
    axios.get(baseUri).then((response) => {
      setImodb(response.data.Search);
      console.log(response.data.Search);
    });
  }, []);
  if (!imodb) return null;
  
  const alphabetize = (word) => {
    if (!word) {
      return;
    }
    word = word.split("");
    word = word.sort();
    word = word.join("");
    return word;
  };
  const anagramGrouper = (words) => {
    const anagrams = {};
    words.forEach((word) => {
      const sortedWord = alphabetize(word);
      if (anagrams[sortedWord]) {
        return anagrams[sortedWord].push(word);
      }
      anagrams[sortedWord] = [word];
    });
    return anagrams;
  };
  const groupedAnagrams = anagramGrouper(words);
  const PrintAnagrams = () => {
    for (const sortedWord in groupedAnagrams) {
      console.log(groupedAnagrams[sortedWord].toString());
      return <p>{groupedAnagrams[sortedWord].toString()}</p>;
    }
  };
  

  return (
    <div className="App">
      <PrintAnagrams />
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
      />
    </Space>
      {imodb.map((data, id)=>{
        return (
          <>
        <div className="cardMovies" key={id}>
          <img onClick={showModal} src={data.Poster} />
          <div>
            <h5>{data.Title}</h5>
            <p>Movie type : {data.Type}</p>
            <p>Movie Year : {data.Year}</p>
            <p>Movie Id : {data.imdbID}</p>
            <button>Detail Movie</button>
          </div>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <img src={data.Poster} />
          </Modal>
        </div>
       </>
        )
      })}
    </div>
  );
}
