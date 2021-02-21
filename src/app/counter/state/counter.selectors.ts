import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './couner.state';

export const COUNTER_STATE_NAME = 'counter';
export const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const getCounter = createSelector(getCounterState, (state) => {
    return state.counter;
});

export const getChannelName = createSelector(getCounterState, (state) => {
    return state.channelName;
});