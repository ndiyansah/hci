import axios from "axios";
import { API_URL } from "../constants";

export const GET_POKELIST = `GET_POKELIST`;
export const GET_POKELIST_SUCCESS = `GET_POKELIST_SUCCESS`;

export const GET_POKEMON_DETAIL = `GET_POKEMON_DETAIL`;
export const GET_POKEMON_DETAIL_SUCCESS = `GET_POKEMON_DETAIL_SUCCESS`;

export const getPokemonList = (page = 1) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: GET_POKELIST
    });

    try {
      const offset = (page - 1) * 20;

      const response = await axios.get(`${API_URL}/pokemon`, {
        params: {
          offset,
          limit: 20
        }
      });

      const { data } = response;

      dispatch({
        type: GET_POKELIST_SUCCESS,
        payload: {
          total: data.count,
          hasNext: !!data.next,
          data: data.results
        }
      });
    } catch (e) {}
  });

export const getPokemon = (id, name) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: GET_POKEMON_DETAIL,
      payload: {
        id
      }
    });

    try {
      const response = await axios.get(`${API_URL}/pokemon/${name}/`);

      const { data } = response;

      dispatch({
        type: GET_POKEMON_DETAIL_SUCCESS,
        payload: {
          id,
          data
        }
      });
    } catch (e) {}
  });
