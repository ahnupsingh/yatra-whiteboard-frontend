import {
    api_get,
    api_post,
    api_put,
    api_patch,
    api_delete,
    request,
    makeUrl,
} from "./api";

export function getAllBoards(params) {
    return api_get({
        url: "BOARD",
        params: params,
    })();
}

export function getMyBoards() {
    return api_get({
        url: "MY_BOARD",
    })();
}

export function getBoardDetails(idx) {
    return api_get({
        url: "BOARD_DETAIL",
        idx: idx,
    })();
}

export function updateBoard(idx, values) {
    return api_patch({
        url: "BOARD_DETAIL",
        idx: idx,
        data: values,
    })();
}

export function createBoard(values) {
    return api_post({
        url: "BOARD_CREATE",
        data: values,
    })();
}

export function deleteBoard(idx) {
    return api_delete({
        url: "BOARD_DETAIL",
        idx: idx,
    })();
}
