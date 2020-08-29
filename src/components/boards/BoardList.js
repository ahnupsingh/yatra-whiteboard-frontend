import React, { Component } from "react";
import {
    Segment,
    Container,
    Button,
    List,
    Form,
    Image,
    Menu,
    Input,
    Header,
    Grid,
    Label,
    Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllBoards } from "../../request";
import { SearchBar, Can, FilterForm } from "../commons";
import { withLoading, withEmptyValue, withPagination } from "../hoc";
import { toast } from "react-toastify";
import { compose } from "recompose";
import _ from "lodash";
import moment from "moment";

const Listing = ({ values = [] }) => {
    debugger;
    return (
        <List divided verticalAlign="middle" className="listings">
            {values.map((board) => (
                <List.Item className="item">
                    <List.Content floated="right"></List.Content>
                    <Image
                        avatar
                        src={
                            board.picture
                                ? board.picture
                                : "https://img.favpng.com/19/13/22/drawing-board-computer-file-png-favpng-Nb6TuEqFtzBQbhBsmpUvEne9h.jpg"
                        }
                    />
                    <List.Content>
                        <div>
                            <Link
                                to={{
                                    pathname: `/board/${board.idx}`,
                                    state: {
                                        profile: board,
                                    },
                                }}
                            >
                                <h3 className="ui teal header">
                                    {board.title || "No Name"}
                                </h3>
                            </Link>
                        </div>
                        <div>
                            <small className="ui grey">
                                {moment().format("DD-MMM-YYYY")}
                            </small>
                        </div>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
};

export class BoardList extends Component {
    state = {
        activeItem: "All",
        fetching: false,
        boards: [],
        params: {},
        filter: false,
    };

    componentDidMount() {
        this.fetchDetails();
    }

    fetchDetails = (params) => {
        this.setState({
            fetching: true,
        });
        getAllBoards(params).then((response) => {
            this.setState({
                fetching: false,
            });
            if (response.success) {
                this.setState({
                    boards: response.data,
                });
            } else {
                toast(response.data.detail, { type: "error" });
            }
        });
    };

    setParams = (params) => {
        this.setState({
            params: Object.assign({}, { ...this.state.params, ...params }),
        });
    };

    searchBoard = _.debounce(() => this.fetchDetails(this.state.params), 2000);

    render() {
        const ListWithPagination = compose(
            withPagination,
            withEmptyValue
        )(Listing);
        const {
            activeItem,
            searching,
            boards,
            currentPage,
            totalPages,
            params,
            filter,
            roles,
            fetching,
        } = this.state;

        const filterFields = [];

        if (boards.length == 0) {
            return (
                <Segment fluid placeholder>
                    <div className="ui icon header">
                        <i className="file alternate outline icon"></i>
                        <div
                            className="ui large primary button"
                            onClick={() =>
                                this.props.setGlobal("_creatingBoard", true)
                            }
                        >
                            Create new
                        </div>
                    </div>
                </Segment>
            );
        }

        return (
            <Container>
                <Grid verticalAlign="middle">
                    <Grid.Column floated="left" width={8}>
                        <h2> My Boards </h2>
                    </Grid.Column>
                    <Grid.Column
                        floated="right"
                        width={8}
                        textAlign="right"
                    ></Grid.Column>
                </Grid>
                <Menu pointing>
                    {/* <Menu.Item
                        onClick={() =>
                            this.setState({
                                filter: !filter,
                            })
                        }
                    >
                        <div>
                            <i className="sliders horizontal link icon" />{" "}
                            Filter
                        </div>
                    </Menu.Item> */}
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input
                                icon="search"
                                placeholder="Search..."
                                onChange={(e, data) => {
                                    const params = { search: data.value };
                                    this.searchBoard();
                                }}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <div
                    className="ui fluid card"
                    style={{ display: filter ? null : "none" }}
                >
                    <div className="content">
                        <FilterForm
                            fields={filterFields}
                            onSubmit={async (values) => {
                                this.setState({
                                    filter: !filter,
                                });
                                this.fetchDetails(values);
                            }}
                        />
                    </div>
                </div>

                <Segment loading={fetching} placeholder={fetching}>
                    <ListWithPagination
                        values={boards}
                        activePage={1}
                        onPageChange={(values) => {
                            this.fetchDetails(values);
                        }}
                        totalPages={1}
                    />
                </Segment>
            </Container>
        );
    }
}
