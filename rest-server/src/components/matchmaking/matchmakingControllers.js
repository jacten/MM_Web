import {
  fetchPendingMatchmakingQuery,
  updateMatchmakingQuery,
  inactivateMatchMakingQuery
} from './matchmakingQueries';

import { addOutcomeQuery } from '../outcomes/outcomesQueries';

import { addStageTwoQuery } from '../stageTwo/stageTwoQueries';

export const fetchPendingMatchmakingController = async (req, res) => {
  try {
    const { rows } = await fetchPendingMatchmakingQuery(req.params);
    console.log('Success with fetchPendingMatchmakingController: ', err);
    res.send(rows);
  } catch (err) {
    console.log('Error with fetchPendingMatchmakingController: ', err);
  }
};

// approve or disapprove a match  **WORK IN PROGRESS TALK TO JUSTIN**
// req.body { userId, matchId, decision }
export const updateMatchmakingController = async (req, res) => {
  try {
    const check = await addOutcomeQuery(req.body);
    if (check) {
      let increaseAmount;
      const { powerranking } = req.body;

      powerranking > 1000 ? (increaseAmount = '2') : (increaseAmount = '1');

      const { approvedcount, rejectedcount } = await updateMatchmakingQuery(
        req.body,
        increaseAmount
      );
      console.log('approved:', approvedcount, ' - rejected:', rejectedcount);
      if (approvedcount + rejectedcount > 15) {
        if (approvedcount - rejectedcount > 5) {
          await addStageTwoQuery(req.body);
          await inactivateMatchMakingQuery(req.body);
          console.log('Added to StageTwo');
        }
        if (rejectedcount - approvedcount > 5) {
          await inactivateMatchMakingQuery(req.body);
        }
      }
    }
    res.send();
  } catch (err) {
    console.log('Error with updateMatchmakingController: ', err);
  }
};
