import React, { useEffect, useState } from "react";
import useFirebaseUserData from "../hooks/useFirebaseUserData";
import { Button, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import {
  deleteSegment,
  deleteFiring,
  getFileListing,
  deleteFile,
} from "../actions";
import _, { isFunction } from "lodash";

const DatabaseIntegrity = () => {
  const findDuffItemsInUser = (user, data) => {
    let duff_items = [];
    //console.log(user);
    // console.log(data);
    if (data.firings) {
      for (const [id, firing] of Object.entries(data.firings)) {
        if (data.projects && !data.projects[firing.project_id]) {
          console.log(
            `Found orphaned firing in: ${user} - ${firing.firing_id}`
          );
          duff_items.push({
            message: `Missing Project ID for: ${user}/firings/${id} - Project ID is: ${firing.project_id}`,
            object_type: "FIRING",
            object_reference: id,
          });
        }
      }
    }
    if (data.segments) {
      for (const [id, segment] of Object.entries(data.segments)) {
        if (data.firings && !data.firings[segment.firing_id]) {
          console.log(`Found orphaned segment in: ${user} - ${segment.id}`);
          duff_items.push({
            message: `Missing Firing ID for: ${user}/segments/${id}`,
            object_type: "SEGMENT",
            object_reference: id,
          });
        }
      }
    }
    if (data.projects) {
      for (const [id, project] of Object.entries(data.projects)) {
        if (project.photo) {
          console.log(`Found old-style photo in: ${user} - ${id}`);
          duff_items.push({
            message: `Found old-style photo in: ${user}/projects/${id}`,
            object_type: "PHOTO",
            object_reference: id,
          });
        }
        if (project.photos) {
          project.photos.forEach((photo, index) => {
            //console.log(photo.photo);
            if (photo.photo.substring(0, 4) === "file") {
              duff_items.push({
                message: `Photo has a file:// URL in ${user}/projects/${id}/photos[${index}]`,
                object_type: "PHOTO",
                object_reference: id,
              });
            }
            if (!photo.photo1024) {
              duff_items.push({
                message: `Photo lacks photo1024 field in ${user}/projects/${id}/photos[${index}]`,
                object_type: "PHOTO",
                object_reference: id + `${index}:1024`,
              });
            }
            if (!photo.photo256) {
              duff_items.push({
                message: `Photo lacks photo256 field in ${user}/projects/${id}/photos[${index}]`,
                object_type: "PHOTO",
                object_reference: id + `${index}:256`,
              });
            }
          });
        }
      }
    }

    return { user_id: user, problems: duff_items };
  };

  const URImatch = (userDataUri, file) => {
    //console.log(`Comparing: ${userDataUri} with ${file}`);
    const decodedURI = decodeURIComponent(userDataUri);
    // Horrid debug limiting
    /*     if (file.includes("UQdh6kahbpWQMfCuM7JoLeXs21c2")) {
      console.log(`DecodedURI: ${decodedURI} (${userDataUri}), file: ${file}`);
      const result = decodedURI.includes(file);
      console.log(`Result:${result}`);
    } */
    const result = decodedURI.includes(file);
    //console.log(`Result:${result}`);

    return result;
  };
  const URIWithinUserData = (user_record, file) => {
    let found = false;
    if (user_record.projects) {
      Object.values(user_record.projects).some((project) => {
        if (project.photo && URImatch(project.photo, file)) {
          found = true;
          return true;
        }
        if (project.photos) {
          project.photos.some((photo) => {
            if (URImatch(photo.photo, file)) {
              found = true;
              return true;
            }
            if (photo.photo1024 && URImatch(photo.photo1024.uri, file)) {
              found = true;
              return true;
            }
            if (photo.photo256 && URImatch(photo.photo256.uri, file)) {
              found = true;
              return true;
            }
          });
        }
      });
    }
    //console.log(`Couldn't find: ${file}`);
    return found;
  };
  const findOrphanedFilesInStorage = (path, all_files) => {
    const relevantUserData = userData[path];
    let relevantFiles = [...all_files[path]];
    console.log("Checking: ");
    console.log(relevantFiles);
    console.log("Against:");
    console.log(relevantUserData);
    const stillRelevantFiles = relevantFiles.filter((file) => {
      const found = URIWithinUserData(relevantUserData, file);
      console.log(found);
      if (found) {
        console.log(`Deselecting: ${file}`);
      }
      return !found;
    });
    //console.log(`findOrphanedFiles - remaining:`);
    //console.log(relevantFiles);
    return stillRelevantFiles;
  };
  const findStorageProblemInPrefix = (path, all_files) => {
    let duff_items = [];

    const prefix_user = path;
    // Horrid debug stuff to limit the amount of work being done
    /*    if (path !== "IGps1V6PNFPLmFKG98jTGTLTtZ32") {
      return { prefix: path, problems: [] };
    } */
    console.log(`Prefix User: ${prefix_user}`);
    if (!userData[prefix_user]) {
      console.log(`Can't find userData for ${prefix_user}`);
      duff_items.push({
        message: `Can't find userData for ${prefix_user}`,
        object_type: "MISSING_USERDATA",
        object_reference: prefix_user,
      });
    }
    const orphanedFiles = findOrphanedFilesInStorage(path, all_files);
    console.log("Orphaned Files:");
    console.log(orphanedFiles);
    const new_duff_items = orphanedFiles.map((file) => {
      return {
        message: `Orphaned File found at url: ${file}`,
        object_type: "ORPHANED_FILE",
        object_reference: file,
      };
    });
    duff_items.concat(new_duff_items);
    return { prefix: path, problems: new_duff_items };
  };
  const userData = useFirebaseUserData();
  const dispatch = useDispatch();
  const [files, setFiles] = useState({});

  const pullFileListing = async () => {
    const all_files = await getFileListing();
    setFiles(all_files);
  };
  useEffect(() => {
    pullFileListing();
  }, []);

  if (!userData) return <div>Loading...</div>;

  const usersWithDuffItems = Object.keys(userData).map((key) =>
    findDuffItemsInUser(key, userData[key])
  );

  const resolveProblem = ({ message, object_type, object_reference }) => {
    console.log(`resolveProblem: ${object_type}:  ${object_reference}`);
    switch (object_type) {
      case "SEGMENT":
        console.log(`Deleting Segment: ${object_reference}`);
        dispatch(deleteSegment(object_reference, false));
        break;
      case "FIRING":
        console.log(`Deleting Firing: ${object_reference}`);
        dispatch(deleteFiring(object_reference, false));
        break;
      case "ORPHANED_FILE":
        console.log(`Deleting photo: ${object_reference}`);
        deleteFile(object_reference);
    }
  };
  const culledUsersWithDuffItems = usersWithDuffItems.filter(
    (item) => item.problems.length !== 0
  );
  console.log(files);

  const storageProblems =
    files &&
    Object.keys(files).map((prefix) =>
      findStorageProblemInPrefix(prefix, files)
    );

  const culledStorageProblems =
    storageProblems &&
    storageProblems.filter((item) => item.problems.length !== 0);
  console.log(culledStorageProblems);
  return (
    <div>
      {culledUsersWithDuffItems.length !== 0 ? (
        <div>
          Found Inconsistent Records:
          {Object.keys(usersWithDuffItems).map((key) => (
            <ul>
              {usersWithDuffItems[key].problems.length !== 0 && (
                <li key={key}>
                  {usersWithDuffItems[key].user_id}
                  <ul>
                    {usersWithDuffItems[key].problems.map((problem) => (
                      <li key={problem.object_reference}>
                        {problem.message}
                        {problem.object_type !== "PHOTO" && (
                          <Button
                            negative
                            size="mini"
                            onClick={() => resolveProblem(problem)}
                          >
                            Delete {problem.object_type}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
          ))}
        </div>
      ) : (
        <div>
          <Icon name="check" />
          No JSON state inconsistencies found
        </div>
      )}
      {culledStorageProblems.length !== 0 ? (
        <div>
          Some Storage Problems:
          <ul>
            {culledStorageProblems.map(({ prefix, problems }) => (
              <li key={prefix}>
                {prefix}
                <ul>
                  {problems.map(
                    ({ message, object_type, object_reference }) => (
                      <li key={object_reference}>
                        {message}
                        <Button
                          negative
                          size="mini"
                          onClick={() =>
                            resolveProblem({
                              message,
                              object_type,
                              object_reference,
                            })
                          }
                        >
                          Delete {object_type}
                        </Button>
                      </li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <Icon name="check" />
          No Storage Inconsisentices found
        </div>
      )}
    </div>
  );
};
export default DatabaseIntegrity;
