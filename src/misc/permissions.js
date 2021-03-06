export const canAccess = (actions) => {
    const userDetails = JSON.parse(localStorage.getItem("_user-details")) || {};
    const permissions = userDetails.permissions || [];

    let predicate = (perm) => {
        return actions.some(
            (action) => perm[0] == action[0] && perm[1] == action[1]
        );
    };

    return permissions.some(predicate);
};
