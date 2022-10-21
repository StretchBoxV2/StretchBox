import store from '../store';
import stretchesReducer, {
  setCurrentRegion,
  setNumberOfStretches,
  setStretches,
  setLoadingStretch,
  clearStretches,
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
    it('sets the current region to the provided payload', () => {
      const { currentRegion } = stretchesReducer(
        state,
        setCurrentRegion(action.payload)
      );
      expect(currentRegion).toEqual(action.payload);
    });
  });

  describe('setNumberOfStretches', () => {
    const action = {
      payload: 3,
    };
    it('sets number of stretches to the payload', () => {
      const { numberOfStretches } = stretchesReducer(
        state,
        setNumberOfStretches(action.payload)
      );
      expect(numberOfStretches).toEqual(action.payload);
    });
  });

  describe('setLoadingStretch', () => {
    const action = {
      payload: true,
    };
    it('sets loading to provided payload', () => {
      const { loadingStretch } = stretchesReducer(
        state,
        setLoadingStretch(action.payload)
      );
      expect(loadingStretch).toEqual(action.payload);
    });
  });

  describe('setStretches', () => {
    const payload1 = [
      {
        name: 'Arm Circles',
        muscle: 'Shoulders',
        instructions: 'Spin your arms',
      },
    ];
    const payload2 = [
      {
        name: 'Leg Circles',
        muscle: 'Legs',
        instructions: 'Spin your legs',
      },
    ];
    let newState;
    it('adds a first stretch to an otherwise empty array', () => {
      newState = stretchesReducer(state, setStretches(payload1));
      expect(newState.stretches).toEqual([...payload1]);
    });
    it('appends stretches to the array', () => {
      const { stretches } = stretchesReducer(newState, setStretches(payload2));
      expect(stretches).toEqual([...payload1, ...payload2]);
    });
  });

  describe('clearStretches', () => {
    it('sets stretches to be an empty array', () => {
      const { stretches } = stretchesReducer(state, clearStretches());
      expect(stretches.length).toEqual(0);
      expect(Array.isArray(stretches)).toBe(true);
    });
  });
});
