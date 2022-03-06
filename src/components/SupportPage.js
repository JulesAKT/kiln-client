import React, { useState } from "react";
import { Header, Accordion, Icon } from "semantic-ui-react";

const PrivacyPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleAccordion = (e, { index }) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <>
      <strong>Support Information</strong>
      <p>
        If you've got any problems using this app, or any feedback of any sort,
        then please drop me a note. I can be reached at{" "}
        <a href="mailto:kilnhelper@ourhouse.org.uk">
          kilnhelper@ourhouse.org.uk
        </a>
        . Thank you!
      </p>
      <p>In addition, here are some FAQ type questions below:</p>
      <Accordion>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Why do I need to create a user to use this app?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          Part of the requirement for the app is to store your project
          information, and to allow it to be accessed from multiple devices. To
          do this, we store data on a cloud service, and to ensure that only you
          can access it, we make you log in to retrieve it. If you're an apple
          user, and you're concerned about the privacy implications, etc, then
          feel free to use the 'Sign in with Apple' options, and select 'Hide My
          Email'. If you do this, then I'll know nothing more about you than a
          randomly generated email address.
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Where is my data stored?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          KilnHelper uses Firebase to provide it's back-end platform. Firebase
          is now owned by Google, and their systems are operated inside Google
          Cloud Platform datacentres. The actual data for your projects, kilns,
          firings, etc, are stored in a Firebase realtime database, and your
          photos are stored in a GCP cloud storage bucket. Both of these
          resources are located within the US.
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          How do I get rid of all of my data?
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          Just drop me a note to 'kilnhelper@ourhouse.org.uk', and I'll make
          sure it's all got shot of. Sorry things didn't work out ;)
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default PrivacyPage;
