import React, { useState } from "react";
import "../../stylesheet/sites.css";
import { Grid, Image } from "semantic-ui-react";
import { Login } from "../auth";
// import school from "../../images/school.jpg";
// import text-editor from "../../images/text-editor.gif";

import { Button, Icon } from "semantic-ui-react";

export function LandingPage(props) {
  const [gettingStarted, setGettingStarted] = useState(false);
  return (
    <div>
      <div className="container-fluid ">
        <Grid divided={"vertically"}>
          <Grid.Row verticalAlign="middle" centered className="landing-section">
            <Grid.Column className="five wide computer sixteen wide mobile center aligned">
              <h1>Online Teaching</h1>
              <h2> made easy</h2>
              <Button
                animated="fade"
                id="#get-started-button"
                size="massive"
                color="violet"
                onClick={() => setGettingStarted(true)}
              >
                <Button.Content visible>Get Started</Button.Content>
                <Button.Content hidden>Login</Button.Content>
              </Button>
              {gettingStarted && <Login {...props}></Login>}
            </Grid.Column>
            <Grid.Column width={11}>
              <Image fluid src="../../images/school.jpg" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={11} className="landing-section">
              <Image fluid src="../../images/school.jpg" />

              {/* <iframe
                width="1280"
                height="720"
                src="https://www.youtube.com/embed/FLESHMJ-bI0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> */}
              {/* <Image fluid src="../../images/school.jpg" /> */}
            </Grid.Column>
            <Grid.Column
              width={5}
              verticalAlign="middle"
              centered
              className="center aligned"
            >
              <h1>Show and Edit texts</h1>
              <h2>with ease</h2>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign="middle" centered className="landing-section">
            <Grid.Column className="five wide computer sixteen wide mobile center aligned">
              <h1>Customizable</h1>
              <h2> Canvas</h2>
            </Grid.Column>
            <Grid.Column width={11}>
              <Image fluid src="../../images/school.jpg" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row verticalAlign="middle" centered className="landing-section">
            <Button
              animated="fade"
              id="#get-started-button"
              size="large"
              color="violet"
            >
              <Button.Content visible>Get Started</Button.Content>
              <Button.Content hidden>Create a board</Button.Content>
            </Button>
          </Grid.Row>
          {/* 
          <Grid.Row>
            <Grid.Column width={11}>
              <Image fluid src="../../images/text-editor.png" />
            </Grid.Column>
            <Grid.Column
              width={5}
              verticalAlign="middle"
              centered
              className="center aligned"
            >
              <h1>Show and Edit texts with ease</h1>
            </Grid.Column>
          </Grid.Row> */}
        </Grid>
        {/* <img alt="timer" src={require("../../images/school.jpg")} /> */}
      </div>
    </div>
  );
}
