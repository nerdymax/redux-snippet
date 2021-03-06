import { bind } from 'redux-effects'

import { ActionTypes } from 'ActionTypes'
import { createEntity, deleteEntity, searchEntities } from 'utils/entityReadWrite'
import history from 'utils/history'
import asyncAction from 'utils/asyncAction'

export function fetchSchedules (data) {
  return asyncAction(ActionTypes.FETCH_SCHEDULES, (cb, dispatch, getState) => {
    dispatch(searchEntities('/callReminders/getSchedules', data, cb))
  })
}

export function schedulePatient (data) {
  return asyncAction(ActionTypes.SCHEDULE_PATIENT, { data }, (cb, dispatch, getState) => {

    function afterSave (err, payload) {
      cb(err, payload)
    }

    dispatch(createEntity('/callReminders/upsertSchedule', data, afterSave))
  })
}

export function deleteSchedule (scheduleId, userId) {
  return asyncAction(ActionTypes.DELETE_SCHEDULE, (cb, dispatch, getState) => {
    dispatch(deleteEntity(`/callReminders/${scheduleId}/deleteSchedule`, { userId }, cb))
  })
}
