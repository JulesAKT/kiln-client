import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "semantic-ui-react";
import _ from "lodash";
import { deleteFileFromURI, editProject } from "../actions";
import Modal from "../Modal";
import history from "../history";
import useFirebaseProject from "../hooks/useFirebaseProject";
import { correctlySizedPhoto } from "../helpers/photoHelpers";

const PhotoDeletePage = (props) => {
  const project = useFirebaseProject(props.match.params.id);
  const index = props.match.params.index;

  const dispatch = useDispatch();

  const actions = () => (
    <React.Fragment>
      <Button
        negative
        onClick={() => {
          console.log(`Delete! ${index}`);
          let newProject = _.cloneDeep(project);
          //console.log(newProject.photos);
          newProject.photos.splice(index, 1);
          console.log("Trying to delete stored photo:");
          //console.log(project.photos[index]);
          const photo = project.photos[index];
          if (photo?.photo) {
            deleteFileFromURI(photo.photo);
          }
          if (photo?.photo256?.uri) {
            deleteFileFromURI(photo.photo256.uri);
          }
          if (photo?.photo1024?.uri) {
            deleteFileFromURI(photo.photo1024.uri);
          }

          console.log("About to commit");
          //console.log(newProject.photos);
          dispatch(editProject(project.id, newProject));
        }}
      >
        Delete
      </Button>
      <Button onClick={() => history.goBack()}>Cancel</Button>
    </React.Fragment>
  );

  const renderContent = () => {
    if (!project || !project.photos[index]) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <Card>
          <img src={correctlySizedPhoto(project.photos[index]).uri} alt="" />
          <Card.Header>Type:{project.photos[index].type}</Card.Header>
        </Card>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Delete Photo?"
      content={renderContent()}
      actions={actions()}
      onDismiss={() => history.goBack()}
    />
  );
};

export default PhotoDeletePage;
