import React, { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { List, Rating, Button, Divider, Image, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import _ from "lodash";
import ImageGallery from "react-image-gallery";

import { editProject } from "../actions";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import { findSuitablePhoto } from "../helpers/photoHelpers";
import useFirebaseProject from "../hooks/useFirebaseProject";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import usePending from "../hooks/usePending";
import { glassImage } from "../helpers/logoHelpers";
import { convertLengthUnit } from "../helpers/unitHelpers";

import "react-image-gallery/styles/css/image-gallery.css";

import FiringCard from "./FiringCard";
import MaterialCard from "./MaterialCard";

const ProjectShowPage = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const project = useFirebaseProject(id);
  const kiln = useFirebaseKiln(project && project.kiln);
  const preferences = useFirebasePreferences();
  const pending = usePending();
  const upload_pending = pending?.EDIT_PROJECT?.pending;
  const all_firings = useFirebaseFirings();
  const galleryRef = useRef();
  const firings = _.filter(
    all_firings,
    (firing) => (firing && firing.project_id) === id
  );

  let firings_array;
  if (firings) {
    firings_array = Object.values(firings).sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });
  }
  let materials_key_array;
  if (project?.materials) {
    materials_key_array = Object.keys(project.materials).sort((a, b) => {
      return project.materials[a].order > project.materials[b].order ? 1 : -1;
    });
  }

  const onDrop = useCallback((accepted_files) => {
    console.log(accepted_files);
    let newProject = _.cloneDeep(project);
    newProject.photos = newProject.photos.concat(
      accepted_files.map((p) => ({ photo: p, type: "After" }))
    );
    console.log(newProject);
    dispatch(editProject(project.id, newProject, true));
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  if (!kiln || !project) {
    return <div>Loading...</div>;
  }
  const length_unit = project.length_unit || "mm";
  const desired_unit = (preferences && preferences.length_unit) || "mm";
  const width = convertLengthUnit(length_unit, desired_unit, project.width);
  const depth = convertLengthUnit(length_unit, desired_unit, project.depth);
  const thickness = convertLengthUnit(
    length_unit,
    desired_unit,
    project.thickness
  );
  //console.log(firings_array);
  console.log(project);
  const gallery_photos =
    project.photos &&
    project.photos.map((photo, index) => ({
      thumbnail: findSuitablePhoto(photo, "small").uri,
      original: findSuitablePhoto(photo, "medium").uri,
      fullscreen: findSuitablePhoto(photo, "large").uri,
      index: index,
      isFavourite: photo.isFavourite,
    }));

  const favouriteClicked = (index) => {
    console.log(`Make Favourite: ${index}`);
    let newProject = _.cloneDeep(project);
    if (newProject.photos[index].isFavourite) {
      console.log("Removing Favourite");
      newProject.photos[index].isFavourite = false;
    } else {
      console.log("Adding Favourite");
      newProject.photos = newProject.photos.map((photo) => ({
        ...photo,
        isFavourite: false,
      }));
      console.log(newProject.photos);
      newProject.photos[index].isFavourite = true;
    }

    dispatch(editProject(project.id, newProject, true));
  };
  const newOrder = Math.max(...firings_array.map((s) => s.order || 0), 0) + 1;
  const material_new_order = materials_key_array
    ? Math.max(
        ...materials_key_array.map((s) => project.materials[s].order || 0),
        0
      ) + 1
    : 0;

  return (
    <div>
      {project.photo && <Image avatar src={project.photo} size="medium" />}
      <div>
        Kiln:<span>{kiln.name}</span>
        <span>
          <Image avatar src={glassImage(project.glass)} />
        </span>
      </div>
      <div>
        <span>
          <Icon name="move" />
        </span>
        <span>{`${width}x${depth}x${thickness}(${desired_unit})`}</span>
      </div>
      <div>
        Rating:
        <Rating maxRating={5} rating={project.stars} disabled={true} />
      </div>
      {project.notes && <div>Notes: {project.notes}</div>}
      <div>
        <Link to={`/projects/edit/${id}`}>
          <Button primary>
            <Icon name="edit" />
            Edit Project
          </Button>
        </Link>
        <Link to={`/projects/delete/${id}`}>
          <Button negative>
            <Icon name="trash" />
            Delete Project
          </Button>
        </Link>
      </div>
      <Divider />
      {materials_key_array && (
        <List>
          <List.Header>Materials</List.Header>
          {materials_key_array.map(
            (key) =>
              project.materials[key] && (
                <MaterialCard
                  project={project}
                  {...project.materials[key]}
                  id={key}
                />
              )
          )}
        </List>
      )}
      <div>
        <Link to={`/new_material/${id}/${material_new_order}`}>
          <Button primary>
            <Icon name="add" />
            Add Material
          </Button>
        </Link>
      </div>

      <Divider />

      <List>
        <List.Header>Firings</List.Header>
        {firings_array &&
          firings_array.map(
            (firing, index) =>
              firing && (
                <Link to={`/firings/${firing.id}`} key={firing.id}>
                  <FiringCard {...firing} index={index} />
                </Link>
              )
          )}
      </List>
      <div>
        <Link to={`/new_firing/${id}/${newOrder}`}>
          <Button primary>
            <Icon name="add" />
            Add Firing
          </Button>
        </Link>
        <Link to={`/new_favourite_firing/${id}`}>
          <Button primary>
            <Icon name="star" />
            Add Favourite
          </Button>
        </Link>
      </div>
      <Divider />
      {upload_pending ? (
        <p>
          <Button>Uploading...</Button>
        </p>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Button>Drop Photo Here</Button>
          ) : (
            <Button style={{ marginBottom: "10px" }}>
              <Icon name="photo" />
              Add Photo
            </Button>
          )}
        </div>
      )}
      {gallery_photos && (
        <ImageGallery
          items={gallery_photos}
          renderCustomControls={() => (
            <>
              <Link
                to={`/projects/delete_photo/${id}/${galleryRef?.current?.getCurrentIndex()}`}
              >
                <Icon
                  size="large"
                  name="trash"
                  type="material"
                  className="image-gallery-icon"
                  style={{ right: 20, top: 10 }}
                  onClick={() => {
                    console.log(galleryRef.current.getCurrentIndex());
                  }}
                />
              </Link>
              {galleryRef && galleryRef.current && (
                <>
                  <Icon
                    size="large"
                    name={
                      project.photos[galleryRef.current.getCurrentIndex()]
                        .isFavourite
                        ? "star"
                        : "star outline"
                    }
                    onClick={() =>
                      favouriteClicked(galleryRef?.current?.getCurrentIndex())
                    }
                    className="image-gallery-icon"
                    style={{ left: 20, top: 10 }}
                  />

                  <div
                    className="image-gallery-icon"
                    style={{
                      top: "90%",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "20pt",
                      pointerEvents: "none", // Stop hover, and a bunch of other stuff I don't care about.
                    }}
                  >
                    {project.photos[galleryRef.current.getCurrentIndex()].type}
                  </div>
                </>
              )}
            </>
          )}
          showBullets={true}
          ref={galleryRef}
        />
      )}
    </div>
  );
};

export default ProjectShowPage;

/*      {Array.isArray(project.photos) &&
        project.photos.map((photo) => (
          <div key={photo.photo}>
            <Image src={findSuitablePhoto(photo, "small").uri} />
          </div>
        ))} */
