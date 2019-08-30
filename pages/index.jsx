/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */

import Head from 'next/head';
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
  у: 'oo',
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
  й: 'i',
  ө: 'o',
  ү: 'u',
};


function toLatin(str) {
  return str.split('').map((i) => TRANSLIT[i] || i).join('');
}

function formatNote(note) {
  return note
    .replace(/;/ig, '')
    .replace(/&quot;/ig, '"');
}

function Home({ word }) {
  return (
    <div className="b-home">
      <Head>
        <title>Укмуш</title>
      </Head>

      <div className="b-home__container">
        <div className="b-home__name">
          <div className="b-home__name-main">{word.name}</div>
          <div className="b-home__name-sub">{toLatin(word.name)}</div>
        </div>
        <div className="b-home__notes">
          {word.notes.map((note, i) => (
            <div key={i} className="b-home_note">{formatNote(note)}</div>
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
