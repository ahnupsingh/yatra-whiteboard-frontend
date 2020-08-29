import { clearLocalStorage } from "../../misc";

export const ResetLocal = (props) => {
    clearLocalStorage();
    window.location.href = "/";
    return null;
};
