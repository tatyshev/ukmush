/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import fetch from 'isomorphic-unfetch';
import 'normalize.css';
import './index.css';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://ookmush.now.sh/';

const TRANSLIT = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'j',
  з: 'z',
  и: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  ң: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  э: 'e',
  ю: 'u',
  я: 'ya',
};


function toLatin(str) {
  return str.split('').map((i) => TRANSLIT[i] || i).join('');
}

function Home({ word }) {
  return (
    <div className="b-home">
      <div className="b-home__container">
        <div className="b-home__name">
          <div className="b-home__name-main">{word.name}</div>
          <div className="b-home__name-sub">{toLatin(word.name)}</div>
        </div>
        <div className="b-home__notes">
          {word.notes.map((note, i) => (
            <div key={i} className="b-home_note">{note}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = async function getInitialProps() {
  const response = await fetch(`${API_URL}/api/words`);
  const result = await response.json();

  return result;
};

export default Home;
