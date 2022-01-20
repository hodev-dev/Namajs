import { div, h1, mount } from './lib/Compose.js';
import './css/tailwind.css';
import List from './pages/List.js';
import _state from './state/state.js';

let [state, setState, changes] = _state;

if (module && module.hot) {
	module.hot.accept();
	module.hot.dispose((data) => {
		data.state = state;
	});
	if (module.hot.data) {
		state = module.hot.data.state;
	}
}

const Page = () => div({
	props: () => ({
		id: "container",
		className: "flex flex-wrap flex-col bg-white text-blueGray-500 min-h-screen h-auto w-full text-6xl content-start",
	}),
	childWatch: () => ['page.data'],
	click: ({ target }) => target.classList.add('bg-blue-400'),
	child: ({ index, }) => state.page.data.map((item, row) => {
		return List({ item })
	})
});

mount(Page, 'root');

