import React, { Fragment } from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { Switch, Route, withRouter } from "react-router-dom";
import { logDOM } from "@testing-library/dom";

import { parseRoute, deepFlatten } from "./misc";
import {
    UpperNav,
    SideNav,
    routes,
    ContentWrapper,
    SideNavContent,
} from "./components";
// import { NotFound } from '../components'
import Base from "./Base";
import { Login } from "./components/auth";
import { LandingPage } from "./components/pages";
import { Footer } from "./components/commons";

export const RenderRoutes = (props) => {
    return (
        <Switch>
            {props.routes.map((route) => {
                return route.hasComponent != false && route.path ? (
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        fullWidth={route.fullWidth}
                        strict={route.strict}
                        render={(data) => {
                            let title = route.tabTitle || route.title;
                            document.title = title ? `${title}` : "" + "Yatra";
                            return (
                                <ContentWrapper
                                    {...props}
                                    {...data}
                                    routes={route.routes}
                                    component={route.component}
                                />
                            );
                        }}
                    />
                ) : null;
            })}
            {/* <Route path="*" render={() => <NotFound {...props} />} /> */}
        </Switch>
    );
};

let parsed = parseRoute([...routes]);
let staticRoutes = deepFlatten(parsed);

class App extends Base {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleHide() {
        document.getElementById("mainPusher").style.overflow = "visible";
        this.props.setGlobal("_sidebar", false);
    }

    handleShow() {
        document.getElementById("mainPusher").style.overflow = "hidden";
    }

    render() {
        const { _toasts, loggedIn } = this.props;

        return (
            <React.Fragment>
                <Sidebar.Pushable as={Segment}>
                    {loggedIn && (
                        <Sidebar
                            as={Menu}
                            animation="overlay"
                            inverted
                            vertical
                            visible={this.props._sidebar}
                            width="wide"
                            onShow={() => this.handleShow()}
                            onHide={() => this.handleHide()}
                            id="SideBarNav"
                        >
                            <SideNavContent
                                {...this.props}
                                {...this.state}
                                routes={routes}
                            />
                        </Sidebar>
                    )}
                    <Sidebar.Pusher
                        dimmed={this.props._sidebar}
                        id="mainPusher"
                    >
                        <div className="ui fluid container">
                            <UpperNav {...this.props} />

                            <div
                                className="ui equal width divided grid"
                                id="mainContainer"
                            >
                                {loggedIn && (
                                    <div
                                        className="three wide column"
                                        id="sideNav"
                                    >
                                        <SideNav
                                            {...this.props}
                                            {...this.state}
                                            routes={routes}
                                        />
                                    </div>
                                )}
                                <div className="column" id="mainContent">
                                    <RenderRoutes
                                        {...this.props}
                                        {...this.state}
                                        routes={staticRoutes}
                                    />
                                </div>
                            </div>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Footer />
            </React.Fragment>
        );
    }
}

export default App;
