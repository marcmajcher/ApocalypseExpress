import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './booyah.scss';

function Booyah() {
  const [boo, setBoo] = useState('loading');

  async function loadBoo() {
    const res = await axios('http://localhost:3000/api/booyah');
    setBoo(res.data.response);
  }
  useEffect(() => {
    loadBoo();
  }, []);

  return <div className="booyah">{boo}</div>;
}

export default Booyah;
