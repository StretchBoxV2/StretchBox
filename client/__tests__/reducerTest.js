import store from '../store';
import stretchesReducer, {
  setCurrentRegion,
} from '../reducers/stretchesReducer';

describe('Stretches reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      currentRegion: '',
      numberOfStretches: 1,
      loadingStretch: false,
      stretches: [],
    };
  });
  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(stretchesReducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(stretchesReducer(state, action)).toBe(state);
    });
  });

  describe('setCurrentRegion', () => {
    const action = {
      payload: 'New York',
    };
    console.log(action.payload);
    it('sets the current region to the provided payload', () => {
      const { currentRegion } = stretchesReducer(
        state,
        setCurrentRegion(action.payload)
      );
      console.log(currentRegion);
      expect(currentRegion).toEqual(action.payload);
    });
  });
});
