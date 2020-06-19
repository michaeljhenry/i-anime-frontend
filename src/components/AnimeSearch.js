import React, {useState} from 'react';

const AnimeSearch = (props) => {
    const baseUrl = 'https://api.jikan.moe/v3';

    const [anime, setAnime] = useState('')
    const getValue = (e) => {
      e.preventDefault();
      console.log(anime);
      request();
      
    }
    const request = async () => {
      
      const response = await fetch(`${baseUrl}/search/anime?q=${anime}&page=1&order_by=start_date&type=tv`)
      .then(res => res.json())
      
      props.getInfo(response);
      //console.log(response.results[0]);
      // .then(res => res.json())
      // .then(data => console.log(data.results[0].synopsis))
      // .catch(err => console.log.warn(err.message));
      }

    return (
        <form onSubmit = {getValue}>
        <input type = 'text' onChange = {e => setAnime(e.target.value)}></input>
        <button disabled = {!anime}type = 'submit'>Submit</button>
        </form>
    );
}

export default AnimeSearch;