import { div, h1 } from '../lib/Compose.js';
import _state from '../state/state.js';

const [state, setState] = _state;

const SubList = () => {

    return div({
        props: () => ({
            textContent: state.page.count
        }),
        propsWatch: () => ['page.count'],
        child: () => []
    })
}

export default SubList;
