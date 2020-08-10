import React, {useState} from 'react';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from './Loader';
import ErrorModal from './ErrorModal';

const AnimeSearch = (props) => {
    const baseUrl = 'https://api.jikan.moe/v3';
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [anime, setAnime] = useState('')
    const getValue = (e) => {
      e.preventDefault();
      //console.log(anime);
      request();
      
    }
    const request = async () => {
      
        const response = await sendRequest(`${baseUrl}/search/anime?q=${anime}`);

      // const response = await sendRequest(`${baseUrl}/search/anime?q=${anime}&page=1&type=tv&order_by=state_date`); // THIS ADDS A FILTER



      
      // await fetch(`${baseUrl}/search/anime?q=${anime}&page=1&type=tv`)
      // .then(res => res.json())
      
      props.getInfo(response);
      ////console.log(response.results[0]);
      // .then(res => res.json())
      // .then(data => //console.log(data.results[0].synopsis))
      // .catch(err => //console.log.warn(err.message));
      }

    return (
      <React.Fragment>
        {error && <ErrorModal error={error.message} show = {!!error} onCancel = {clearError} />}
          {isLoading && <LoadingSpinner/>}
          {!isLoading &&
          <form className = 'anime-form__query' onSubmit = {getValue}>
            <input type = 'text' onChange = {e => setAnime(e.target.value)} placeholder = 'Enter an anime title' />
            <button disabled = {!anime}type = 'submit'><h3>Search Anime</h3></button>
          </form>
          }
        </React.Fragment>
    );
}

export default AnimeSearch;