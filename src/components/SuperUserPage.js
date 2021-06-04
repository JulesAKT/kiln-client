import React, { useContext, useState } from "react";
import { Header, Accordion, Icon, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import useFirebaseUserData from "../hooks/useFirebaseUserData";
import useFirebaseUsers from "../hooks/useFirebaseUsers";
import useFakeUID from "../hooks/useFakeUID";
import DatabaseIntegrity from "./DatabaseIntegrity";

import { AuthContext, superUserUID } from "../helpers/Auth";
import { editFakeUID } from "../actions";

const SuperUserPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const userData = useFirebaseUserData();
  const users = useFirebaseUsers();
  const fakeUID = useFakeUID();
  //console.log(userData && Object.keys(userData));

  let user_array =
    users &&
    Object.keys(users).map((key) => ({
      ...users[key],
      id: key,

      num_kilns:
        userData[key] &&
        userData[key].kilns &&
        Object.keys(userData[key].kilns).length,
      num_projects:
        userData[key] &&
        userData[key].projects &&
        Object.keys(userData[key].projects).length,
    }));

  const totals = user_array?.reduce(
    (acc, user) => ({
      users: acc.users + 1,
      kilns: acc.kilns + (user.num_kilns ? user.num_kilns : 0),
      projects: acc.projects + (user.num_projects ? user.num_projects : 0),
    }),
    { users: 0, projects: 0, kilns: 0 }
  );

  const user_columns = [
    {
      name: "Photo",
      selector: "photoURL",
      sortable: false,
      cell: (row) => <Image src={row.photoURL} avatar />,
    },
    {
      name: "UID",
      selector: "UID",
      sortable: true,
      cell: (row) => <div>{row.uid}</div>,
    },

    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <div>{row.name}</div>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      cell: (row) => <div>{row.email}</div>,
    },
    {
      name: "# Kilns",
      selector: "num_kilns",
      sortable: true,
      sortFunction: (a, b) =>
        (a.num_kilns ? a.num_kilns : 0) - (b.num_kilns ? b.num_kilns : 0),

      cell: (row) => <div>{row.num_kilns}</div>,
    },
    {
      name: "# Projects",
      selector: "num_projects",
      sortable: true,
      sortFunction: (a, b) =>
        (a.num_projects ? a.num_projects : 0) -
        (b.num_projects ? b.num_projects : 0),
      cell: (row) => <div>{row.num_projects}</div>,
    },
  ];

  const handleAccordion = (e, { index }) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  if (!currentUser || currentUser.uid !== superUserUID) {
    return <div>Access Denied</div>;
  }
  return (
    <div>
      <Header as="h1">Super User</Header>
      {fakeUID && (
        <div>
          You are current impersonating a user.
          <div onClick={() => dispatch(editFakeUID(null))}>
            STOP IMPERSONATING
          </div>
        </div>
      )}
      <Accordion>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Statistics
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          Users: {totals?.users}
          <br />
          Kilns: {totals?.kilns}
          <br />
          Projects: {totals?.projects}
          <br />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Show Users
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <DataTable
            title="Users"
            columns={user_columns}
            data={user_array}
            defaultSortField="name"
            onRowClicked={(row) => {
              console.log(`Impersonating: ${row.id}`);
              dispatch(editFakeUID(row.id));
            }}
          />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleAccordion}
        >
          <Icon name="dropdown" />
          Show Database Integrity
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <DatabaseIntegrity />
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default SuperUserPage;
