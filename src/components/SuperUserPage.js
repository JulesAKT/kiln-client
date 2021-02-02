import React, { useContext, useState } from "react";
import { Header, Accordion, Icon, Image } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import useFirebaseUserData from "../hooks/useFirebaseUserData";
import useFirebaseUsers from "../hooks/useFirebaseUsers";
import useFakeUID from "../hooks/useFakeUID";
import { AuthContext, superUserUID, getDisplayName } from "../helpers/Auth";
import { editFakeUID } from "../actions";

const SuperUserPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const userData = useFirebaseUserData();
  const users = useFirebaseUsers();
  const fakeUID = useFakeUID();
  console.log(userData && Object.keys(userData));
  const userData_array =
    userData &&
    Object.keys(userData).map((key) => ({
      ...userData[key],
      id: key,
      name: users && users[key] ? getDisplayName(users[key]) : `(${key})`,
      email: users && users[key] && users[key].email,
      photoURL: users && users[key] && users[key].photoURL,
      num_kilns:
        userData[key] &&
        userData[key].kilns &&
        Object.keys(userData[key].kilns).length,
      num_projects:
        userData[key] &&
        userData[key].projects &&
        Object.keys(userData[key].projects).length,
    }));

  const userData_columns = [
    {
      name: "Photo",
      selector: "photoURL",
      sortable: false,
      cell: (row) => <Image src={row.photoURL} avatar />,
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
      cell: (row) => <div>{row.num_kilns}</div>,
    },
    {
      name: "# Projects",
      selector: "num_projects",
      sortable: true,
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
          Show User Data
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <DataTable
            title="User Data"
            columns={userData_columns}
            data={userData_array}
            defaultSortField="name"
            onRowClicked={(row) => {
              console.log(`Impersonating: ${row.id}`);
              dispatch(editFakeUID(row.id));
            }}
          />
        </Accordion.Content>
      </Accordion>
    </div>
  );
};

export default SuperUserPage;
