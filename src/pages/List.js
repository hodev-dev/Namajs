import { div, h1 } from '../lib/Compose.js';
import SubList from './SuList.js';
import _state from '../state/state.js';

const [state, setState] = _state;

const List = ({ item }) => {

    return div({
        props: () => ({
            id: item.id,
            className: "w-full h-16 bg-red-600 border flex all-center mt-2 cursor-pointer select-none",
            textContent: item.name
        }),
        test: () => 0,
        click: ({ target }) => {
            setState((state) => {
                state.page.data.push({ id: 9, name: "500" });
                // state.page.count = 800;
            });
        },
        child: ({ index }) => [
            SubList()
        ]
    })
}

export default List;

