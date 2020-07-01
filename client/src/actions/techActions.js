import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_LOADING,
} from './types';

//Get Techs from server
export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('api/techs');
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response,
    });
  }
};
//Add Tech
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch('api/techs', {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err.response.statusText,
    });
  }
};

//Delete Tech
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`api/techs/${id}`, { method: 'DELETE' });
    dispatch({
      payload: id,
      type: DELETE_TECH,
    });
  } catch (err) {}
};

//Set Loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
