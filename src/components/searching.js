export function initSearching(searchField) {
    return (query, state, action) => {
        return state[searchField.name]
            ? Object.assign({}, query, { search: state[searchField.name].trim() })
            : query;
    }
}