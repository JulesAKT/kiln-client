import React, { useContext, useState } from "react";
import { Button, Container, Header, Modal } from "semantic-ui-react";
import { AuthContext } from "../helpers/Auth";
import { deleteUser } from "../actions";
import { useDispatch } from "react-redux";
import { Field } from "redux-form";

const UserDeletePage = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const providerId = auth?.currentUser?.providerData?.[0]?.providerId;
  const email = auth?.currentUser?.providerData?.[0]?.uid;
  const [modalDeleteAlert, showModalDeleteAlert] = useState(false);
  const [entered_password, setEnteredPassword] = useState("");

  return (
    <>
      <Container text={true}>
        <Header as="h1">User Deletion</Header>
        Deleting your user will remove all your projects, photos, firings,
        kilns, inventory, and any other information we hold on you.
        <p />
        If you signed in with Apple or Google, it won't delete your apple or
        Google ID, merely the information that kilnhelper holds about you.
        <p />
        This action cannot be undone, so please only use it if you really mean
        it. I genuinely won't be able to get your data back if you do.
        <p />
        {providerId === "password" ? (
          <>
            In order to guard against abuse, you will be required to enter your
            password again before deleting your users.
            <p />
            <Modal
              onClose={() => showModalDeleteAlert(false)}
              onOpen={() => showModalDeleteAlert(true)}
              open={modalDeleteAlert}
              trigger={<Button>Delete User</Button>}
            >
              <Modal.Header>Delete User?</Modal.Header>
              <Modal.Content>
                This can't be undone. Please enter your password to continue.
                <p />
                &nbsp;
                <p />
                Password:{" "}
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="black"
                  onClick={() => showModalDeleteAlert(false)}
                >
                  Cancel
                </Button>
                <Button
                  negative
                  onClick={() => {
                    console.log("Deleting User");
                    showModalDeleteAlert(false);
                    dispatch(deleteUser(providerId, email, entered_password));
                  }}
                >
                  Delete User data
                </Button>
              </Modal.Actions>
            </Modal>
          </>
        ) : (
          <Modal
            onClose={() => showModalDeleteAlert(false)}
            onOpen={() => showModalDeleteAlert(true)}
            open={modalDeleteAlert}
            trigger={<Button>Delete User</Button>}
          >
            <Modal.Header>Delete User?</Modal.Header>
            <Modal.Content>
              This can't be undone.
              <p />
              &nbsp;
              <p />
              Please note - you may be required to re-authenticate yourself
              before your deletion request can be processed.
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => showModalDeleteAlert(false)}>
                Cancel
              </Button>
              <Button
                negative
                onClick={() => {
                  console.log("Deleting User");
                  dispatch(deleteUser(providerId));
                }}
              >
                Delete User data
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default UserDeletePage;
