import store from '../store';

const state = store.getState();

const showInfo = () => {
    store.dispach({openInfo: !state.openInfo})
   
}

export default showInfo;