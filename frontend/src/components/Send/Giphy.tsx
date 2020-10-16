import React, { forwardRef, useContext } from "react";
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
  SearchContextManager, // the context manager, includes the Context.Provider
  SuggestionBar, // an optional UI component that displays trending searches and channel / username results
} from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import * as S from "./style";

const { REACT_APP_NOT_GIPHY_API_KEY }: any = process.env;

const SearchExperience = forwardRef(({ handleGif }: any) => (
  <S.GiphyWrapper>
    <SearchContextManager apiKey={REACT_APP_NOT_GIPHY_API_KEY}>
      <SearchBar placeholder="" clear />
      <Components handleGif={handleGif} />
    </SearchContextManager>
  </S.GiphyWrapper>
));

const Components = ({ handleGif }: any) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  return (
    <>
      {/* <SuggestionBar /> */}
      <Grid
        key={searchKey}
        columns={3}
        width={window.innerWidth > 800 ? 780 : window.innerWidth - 40}
        fetchGifs={fetchGifs}
        onGifClick={(gif, e) => {
          e.preventDefault();
          console.log(gif);
          handleGif(gif.images.downsized_medium.url);
        }}
      />
    </>
  );
};

export default SearchExperience;
