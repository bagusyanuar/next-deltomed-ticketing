export const sort = (state, { paylaod }) => {
    state.data = paylaod
}

export const reset = (state, { payload }) => {
    if (payload !== undefined && Array.isArray(payload)) {
        payload.forEach(v => {
            state[v['state']] = v['value']
        });
    }
}