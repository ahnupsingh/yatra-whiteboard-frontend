import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { getUserProfile } from "./request";

import App from "./App";
import { Form, Modal, Button } from "semantic-ui-react";
import { BoardForm } from "./components/boards";
import { UpperNav } from "./components";
import { Login } from "./components/auth";
import { LandingPage } from "./components/pages";
import { ToastContainer, toast } from "react-toastify";

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    componentDidMount() {
        this.props.history.listen((location, action) => {
            this.setGlobal("_section", this.props.location.hash);

            console.log("location", location, action, this.props);
            if (location.pathname != this.props.location.pathname)
                this.setState({ _sidebar: false });
        });

        const user_details = JSON.parse(localStorage.getItem("_user-details"));
        if (user_details != undefined) {
            this.setState({
                _token: user_details.key,
            });

            getUserProfile().then((res) => {
                if (res.success) {
                    this.setState({
                        _user: res.data,
                    });
                }
            });
        }
    }

    initialState() {
        return {
            _user: {},
            _token: null,
            _sidebar: false,
            _section: "",
            _creatingBoard: false,
        };
    }

    setGlobal(key, val) {
        if (!key) throw "Can not set global state without key";
        this.setState({ [key]: val });
    }

    render() {
        const { _token } = this.state;
        var content = (
            <App
                {...this.props}
                {...this.state}
                setGlobal={(key, val) => this.setGlobal(key, val)}
                loggedIn={_token}
            />
        );
        if (!_token) {
            content = (
                <div className="">
                    <UpperNav
                        {...this.props}
                        setGlobal={(key, val) => this.setGlobal(key, val)}
                        loggedIn={_token}
                    />
                    <LandingPage
                        {...this.props}
                        {...this.state}
                        setGlobal={(key, val) => this.setGlobal(key, val)}
                        loggedIn={_token}
                    ></LandingPage>
                    {/* <Login
                        {...this.props}
                        {...this.state}
                        setGlobal={(key, val) => this.setGlobal(key, val)}
                        loggedIn={_token}
                    /> */}
                </div>
            );
        }

        return (
            <Fragment>
                {content}
                <ToastContainer
                    hideProgressBar={true}
                    closeButton={false}
                    draggablePercent={60}
                    position="bottom-right"
                />
            </Fragment>
        );
    }
}

export default withRouter(Root);
