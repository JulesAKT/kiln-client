import React from "react";
import { Card, Image, Grid, Feed, Icon, Container } from "semantic-ui-react";

const AboutPage = () => (
  <>
    <div align="center">
      <img
        src={require("../assets/kilnhelper_feature_graphic.png").default}
        alt="KilnHelper"
      />
    </div>
    <h1 align="center">An app for Fused Glass Artists.</h1>
    <div align="center">
      <a href="https://apps.apple.com/gb/app/kiln-helper/id1506041444">
        <img
          src={require("../assets/app_store_download.svg").default}
          alt="Download on the App Store"
          height={50}
        />
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.mrtickle.kiln&utm_source=kiln-web&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
        <img
          src={require("../assets/google-play-badge-cropped.png").default}
          alt="Get it on Google Play"
          height={50}
          style={{ marginLeft: "10px" }}
        />
      </a>
    </div>

    <Card.Group centered style={{ paddingTop: 20 }}>
      <Card
        image={require("../assets/screenshot_project_show.png").default}
        header="Projects"
        description="Keep track of projects"
      />
      <Card
        image={require("../assets/screenshot_firing_show.png").default}
        header="Firings"
        description="Record Firings, and see firing graphs"
      />
      <Card
        image={require("../assets/screenshot_material_list.png").default}
        header="Materials"
        description="Record used Materials and check for Reactions"
      />
    </Card.Group>
    <Container content>
      <h1 align="center">Features</h1>
      <Grid container columns={2}>
        <Grid.Column>
          <Grid.Row>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <Image
                    avatar
                    src={require("../assets/bullseye.jpg").default}
                  />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    Bullseye Glass Database with Reactions
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Image
                    avatar
                    src={require("../assets/spectrum.jpg").default}
                  />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    Spectrum/Oceanside Glass Database with Reactions
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label>
                  <Icon name="print" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>Print Projects</Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Icon name="sun" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>Light or Dark Mode</Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <Icon name="cloud" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    Cloud Back-End - access your projects from anywhere
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Icon name="external share" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    Export Firings for Import to Nabertherm Kilns
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Icon name="magnify" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    Live Monitoring of supported smart Kiln Controllers
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Container>
  </>
);

export default AboutPage;
