const HotReload = (state, module) => {
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose((data) => {
            data.state = state;
        });
        if (module.hot.data) {
            return module.hot.data.state;
        } else {
            return state;
        }
    }
}

export default HotReload;