import { Button, Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import hi from '../assets/peace.png';
import '../App.css';

export default function Anagram() {
    const words = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];
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
      console.log(groupedAnagrams, 'anagrams');
      const PrintAnagrams = () => {
        for (const sortedWord in groupedAnagrams) {
          console.log(groupedAnagrams[sortedWord].toString());
          return <p>{groupedAnagrams[sortedWord].toString()}</p>;
        }
      };
    return(
        <div className="anagram">
            <Avatar size={100} src={hi}/>
            <br/><br/>
            <div>Hiii, My Name is Nadiah Nahdah Anisah.</div>
            <p>Thank you for reviewed my profile before. This is the result of your test you give it to me. <br/>
            You can check the result of anagram in console of this page and you can see the list of IMDB by clicking button below.</p>
            <Link to='/list-movie'>
                <Button>See IMDB List</Button>
            </Link>
        </div>
    )
}