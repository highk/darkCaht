import React, { useEffect, useCallback, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import * as S from "./style";

const gf = new GiphyFetch("L8MHTdBKWtWtorIHUsOPrigjpQ96nF6P");
const search = (keyword: string) => (offset: number) =>
  gf.search(keyword, {
    sort: "relevant",
    lang: "es",
    limit: 10,
    offset,
  });

const trd = (offset: number) => gf.trending({ offset, limit: 10 });

const Giphy: React.FC<{ input: string; handleGif: Function }> = ({
  input,
  handleGif,
}) => {
  const keyword = input.slice(5);

  const [state, setState] = useState<"trd" | "search">("trd");

  useEffect(() => {
    setState(keyword === "" ? "trd" : "search");
  }, [keyword]);

  const onGifClick = (gif: any, e: any) => {
    handleGif(gif.images.downsized.url);
    e.preventDefault();
  };

  const Grids: React.FC = () => (
    <Grid
      onGifClick={onGifClick}
      width={window.innerWidth < 800 ? window.innerWidth - 50 : 800}
      columns={2}
      fetchGifs={state === "trd" ? trd : search(keyword)}
    />
  );

  return (
    <S.GiphyWrapper>
      <Grids />
    </S.GiphyWrapper>
  );
};

export default Giphy;
