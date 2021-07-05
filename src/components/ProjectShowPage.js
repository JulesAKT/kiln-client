import React, { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  List,
  Rating,
  Button,
  Divider,
  Image,
  Icon,
  Card,
  Header,
} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import _ from "lodash";
import ImageGallery from "react-image-gallery";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { editProject } from "../actions";
import useFirebaseKiln from "../hooks/useFirebaseKiln";
import { findSuitablePhoto } from "../helpers/photoHelpers";
import useFirebaseProject from "../hooks/useFirebaseProject";
import useFirebaseFirings from "../hooks/useFirebaseFirings";
import useFirebasePreferences from "../hooks/useFirebasePreferences";
import useFirebaseGlassData from "../hooks/useFirebaseGlassData";
import useFirebaseSegments from "../hooks/useFirebaseSegments";
import usePending from "../hooks/usePending";
import { glassImage } from "../helpers/logoHelpers";
import { getReactingMaterials } from "../helpers/glassHelpers";
import { convertLengthUnit } from "../helpers/unitHelpers";

import "react-image-gallery/styles/css/image-gallery.css";

import FiringCard from "./FiringCard";
import MaterialCard from "./MaterialCard";
import {
  makeScaryURLQuery,
  decodeScaryURLQueryParameter,
} from "../helpers/shareHelpers";

const getProjectLink = (project, firings, segments) => {
  const project_with_data = {
    project: project,
    firings: firings,
    segments: segments,
  };
  const query = makeScaryURLQuery(
    "https://kilnhelper.web.app/shared_project/",
    project_with_data
  );
  return query;
};

const ProjectShowPage = (props) => {
  const id = props.match.params.id;
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  let project, firings, segments, kiln;
  const firebase_project = useFirebaseProject(id);
  const firebase_kiln = useFirebaseKiln(firebase_project?.kiln);
  const all_firings = useFirebaseFirings();
  const all_segments = useFirebaseSegments();
  let shared_project_payload;
  //console.log(id);
  if (id) {
    firings = _.filter(
      all_firings,
      (firing) => (firing && firing.project_id) === id
    );
    segments = firings?.reduce(
      (acc, firing) =>
        acc.concat(
          _.filter(all_segments, (segment) => segment?.firing_id === firing.id)
        ),
      []
    );
    project = firebase_project;
    kiln = firebase_kiln;
  } else {
    console.log(props.location);
    [, shared_project_payload] =
      props.location.pathname.match(/shared_project\/(.*)/);
    //    shared_project_payload = props.match.params.payload;
    [project, firings, segments] = decodeScaryURLQueryParameter(
      shared_project_payload
    );
    kiln = {};
  }
  const readOnly = !id;

  const preferences = useFirebasePreferences();
  const glass_data = useFirebaseGlassData(project?.glass);
  const pending = usePending();
  const upload_pending = pending?.EDIT_PROJECT?.pending;

  const galleryRef = useRef();
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
    //console.log(accepted_files);
    let newProject = _.cloneDeep(project);
    // Ugly. But works. contact the list, but if there's nothing to concat TO... then just return the list.
    newProject.photos = newProject.photos
      ? newProject.photos.concat(
          accepted_files.map((p) => ({ photo: p, type: "After" }))
        )
      : accepted_files.map((p) => ({ photo: p, type: "After" }));
    //console.log(newProject);
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
  //console.log(project);
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
    //console.log(`Make Favourite: ${index}`);
    let newProject = _.cloneDeep(project);
    if (newProject.photos[index].isFavourite) {
      //console.log("Removing Favourite");
      newProject.photos[index].isFavourite = false;
    } else {
      //console.log("Adding Favourite");
      newProject.photos = newProject.photos.map((photo) => ({
        ...photo,
        isFavourite: false,
      }));
      //console.log(newProject.photos);
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

  const reacting_materials = getReactingMaterials(
    project.materials,
    glass_data
  );

  const number_of_glass_types =
    project.materials &&
    [...new Set(Object.values(project?.materials).map((m) => m.glass))].length;
  //console.log(`Number of glass types: ${number_of_glass_types}`);
  //console.log("REACTING MATERIALS");
  //console.log(reacting_materials);

  return (
    <div>
      Name: {project.name}
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
      {!readOnly && (
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
      )}
      <Divider />
      {materials_key_array && (
        <>
          <Header as="h3">Materials</Header>
          {number_of_glass_types > 1 && (
            <p>
              <b>
                Please note: KilnHelper cannot correctly determine reactions for
                projects that contain more than one glass manufacturer
              </b>
            </p>
          )}
          <Card.Group>
            {materials_key_array.map(
              (key) =>
                project.materials[key] && (
                  <MaterialCard
                    project={project}
                    {...project.materials[key]}
                    id={key}
                    reacting={typeof reacting_materials[key] !== "undefined"}
                    readOnly={readOnly}
                  />
                )
            )}
          </Card.Group>
        </>
      )}
      <div>
        {!readOnly && (
          <Link to={`/new_material/${id}/${material_new_order}`}>
            <Button primary>
              <Icon name="add" />
              Add Material
            </Button>
          </Link>
        )}
      </div>
      <Divider />
      <Header as="h3">Firings</Header>
      <List>
        {firings_array &&
          firings_array.map(
            (firing, index) =>
              firing &&
              (!readOnly ? (
                <Link to={`/firings/${firing.id}`} key={firing.id}>
                  <FiringCard {...firing} index={index} />
                </Link>
              ) : (
                <Link
                  to={`/shared_firing/${firing.id}?p=${shared_project_payload}`}
                  key={firing.id}
                >
                  <FiringCard {...firing} index={index} />
                </Link>
              ))
          )}
      </List>
      {!readOnly && (
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
      )}
      <Divider />
      {id && (
        <>
          <CopyToClipboard
            text={getProjectLink(project, firings, segments)}
            onCopy={() => setCopied(true)}
          >
            <Button>
              <Icon name="share" />
              Share Project Link (not yet completed)
            </Button>
          </CopyToClipboard>
          {copied && (
            <span style={{ color: "red" }}>Link Copied to Clipboard</span>
          )}

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
        </>
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
