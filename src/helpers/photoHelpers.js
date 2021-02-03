export const findSuitablePhoto = (project, size = "small") => {
  //console.log(`findSuitablePhoto - ${size}`);
  //console.log(project);
  if (project.photo) {
    //console.log(`Returning old photo: ${project.photo} (${project.name})`);
    return { uri: project.photo };
  } else {
    if (!project.photos) {
      return {};
    }
    // Check for an 'after' shot
    const after = project.photos.find((photo) => photo.type === "after");
    if (after) {
      //console.log("after -");
      //console.log(after);
      return correctlySizedPhoto(after, size);
    }
    // Failing that... do we have a 'during'?
    const during = project.photos.find((photo) => photo.type === "during");
    if (during) {
      return correctlySizedPhoto(during, size);
    }
    // Failing that... let's just return the first one
    if (project.photos && project.photos[0] && project.photos[0].photo) {
      return correctlySizedPhoto(project.photos[0], size);
    }
  }
  //console.log(`Returning sod-all (${project.name})`);
  return {};
};

export const correctlySizedPhoto = (photo, size = "small") => {
  //console.log(`correctlySized - ${size}`);
  //console.log(photo);
  if (!photo) {
    console.log("No Photo record!");
    return {};
  }
  switch (size) {
    case "small":
      if (photo.photo256) {
        //console.log("Returning small photo");
        return photo.photo256;
      }
    // falls through
    case "medium":
      if (photo.photo1024) {
        //console.log("Returning medium photo");
        return photo.photo1024;
      }
    // falls through
    default:
      //console.log(`Returning full-size photo -${photo.photo}`);
      return { uri: photo.photo };
  }
};
