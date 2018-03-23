import db from '../../config/database/index';

import {
  fetchStarredMatchesHelper,
  fetchUnstarredMatchesHelper,
  starSingleMatchHelper,
  unstarSingleMatchHelper,
  addOutcomesHelper,
  fetchOneOutcomesHelper
} from './outcomesSQLHelpers';

export const addOutcomeQuery = async ({ userId, matchId, starred, decision }) => {
  try {
    const check = await db.query(fetchOneOutcomesHelper(body));
    if (check.rows.length === 0) {
      const queryString = addOutcomesHelper();
      const { rows } = await db.query(queryString, [userId, matchId, starred, decision]);
      console.log('Success on addOutcomeQuery');
      return rows[0];
    } else {
      console.log('User already voted on this match!');
      return null;
    }
  } catch (err) {
    console.log('Error on addOutcomeQuery', err);
  }
};

export const fetchStarredMatchesQuery = async ({userId}) => {
  try {
    const queryString = fetchStarredMatchesHelper();
    const { rows } = await db.query(queryString, [userId]);
    console.log('Success on fetchStarredMatchesQuery');
    return rows;
  } catch (err) {
    console.log('Error on fetchStarredMatchesQuery', err);
  }
};

export const fetchUnstarredMatchesQuery = async ({userId}) => {
  try {
    const queryString = fetchUnstarredMatchesHelper();
    const { rows } = await db.query(queryString, [userId]);
    console.log('Success on fetchUnStarredMatchesQuery', rows);
    return rows;
  } catch (err) {
    console.log('Error on fetchUnstarredMatchesQuery', err);
  }
};

export const starSingleMatchQuery = async ({userId, matchId}) => {
  try {
<<<<<<< HEAD
    const { userId } = body;
    const { matchId } = body;
    const queryString = starSingleMatchHelper(userId, matchId);
    const data = await db.query(queryString);
    console.log('dataaaaa', data);
    console.log('Success on starSingleMatchQuery', data);
=======
    const queryString = starSingleMatchHelper();
    const data = await db.query(queryString, [matchId, userId]);
    console.log('Success on starSingleMatchQuery');
>>>>>>> cdda6f78569116d0857a5861dfec3a362c3b6040
    return data;
  } catch (err) {
    console.log('Error on starSingleMatchQuery', err);
  }
};

export const unstarSingleMatchQuery = async ({matchId, userId}) => {
  try {
    const queryString = unstarSingleMatchHelper();
    const data = await db.query(queryString, [matchId, userId]);
    console.log('Success on unstarSingleMatchQuery', data);
    return data;
  } catch (err) {
    console.log('Error on unstarSingleMatchQuery', err);
  }
};
