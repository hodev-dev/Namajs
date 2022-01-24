import { Widget, mount } from './lib/widget.js';
import './css/tailwind.css';
import AppState from './state/state.js';
import HotReload from './lib/HotReload';

let [state, setState, changes, watch] = AppState;

HotReload(state, module);

watch('page.data', () => { });

const Page = () => Widget({
	type: "DIV",
	state: AppState,
	props: () => ({
		id: "container",
		className: "w-full bg-gray-100 min-h-screen h-auto flex-col",
	}),
	child: ({ index, _state }) => [
		Widget({
			type: 'DIV',
			props: () => ({
				className: "flex flex-row w-ful h-16 bg-white shadow"
			}),
			child: ({ index, _state }) => [
				Widget({
					type: 'H1',
					props: () => ({
						className: "flex w-full w-8/12 h-16 all-center"
					}),
					watch: () => ['page.count'],
					child: ({ index }) => [_state.page.count]
				}),
				Widget({
					type: 'H1',
					props: () => ({
						className: "flex w-full w-4/12 h-16 all-center"
					}),
					events: () => ({
						click: ({ }) => setState((state) => state.page.count += 800)
					}),
					watch: () => ['page.count'],
					child: ({ index }) => [_state.page.count]
				})
			]
		}),
		Widget({
			type: 'DIV',
			props: () => ({
				className: 'w-8/12 h-6/12 border'
			}),
			child: ({ index, _state }) => [
				Widget({
					type: 'h1',
					props: () => ({}),
					child: ({ index }) => ["test"]
				})
			]
		})
	]
});

mount(Page, 'root');