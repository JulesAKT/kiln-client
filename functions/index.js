// Liberated from https://medium.com/@jalalio/dynamic-og-tags-in-your-statically-firebase-hosted-polymer-app-476f18428b8b
const functions = require("firebase-functions");
const fs = require("fs");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
exports.host = functions.https.onRequest((req, res) => {
  const userAgent = req.headers["user-agent"].toLowerCase();
  let indexHTML = fs.readFileSync("./hosting/index.html").toString();
  const path = req.path ? req.path.split("/") : req.path;
  const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
  const metaPlaceholder = '<meta name="functions-insert-dynamic-meta">';

  const isBot =
    userAgent.includes("googlebot") ||
    userAgent.includes("yahoou") ||
    userAgent.includes("bingbot") ||
    userAgent.includes("baiduspider") ||
    userAgent.includes("yandex") ||
    userAgent.includes("yeti") ||
    userAgent.includes("yodaobot") ||
    userAgent.includes("gigabot") ||
    userAgent.includes("ia_archiver") ||
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("twitterbot") ||
    userAgent.includes("developers.google.com")
      ? true
      : false;

  console.log("Starting");
  console.log(isBot);
  console.log(path);

  if (isBot && path && path.length > 1 && path[1] === "shared_project") {
    const uid = path[2];
    const project_id = path[3];

    admin
      .database()
      .ref(`shared_userdata/${uid}/projects/${project_id}`)
      .once("value")
      .then((snapshot) => {
        const project = snapshot.val();
        if (project) {
          project.uid = uid;
        }
        console.log(project);
        //indexHTML = indexHTML.replace(metaPlaceholder, getMeta(project));
        indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(project));
        console.log("Sending:");
        console.log(indexHTML);
        res.status(200).send(indexHTML);
        return null;
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send(indexHTML);
      });

    return;
  } else {
    // optional - turn on caching: res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    //indexHTML = indexHTML.replace(metaPlaceholder, getMeta());
    //indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph());
    res.status(200).send(indexHTML);
    return;
  }
});

const defaultDesc = "An App for Fused Glass Artists";
const defaultTitle = "Kiln Helper";
const defaultLogo = "https://kilnhelper.web.app/kilnhelper_icon_512.png";

const getOpenGraph = (project) => {
  let og = `<meta property="fb:app_id" content="999999999" />`;
  og += `<meta property="og:type" content="website" />`;

  if (!project) {
    og += `<meta property="og:title" content="${defaultTitle}" />`;
    og += `<meta property="og:description" content="${defaultDesc}" />`;
    og += `<meta property="og:image" content="${defaultLogo}" />`;
    og += `<meta property="og:url" content="https://kilnhelper.web.app" />`;
    return og;
  }
  og += `<meta property="og:title" content="Shared Project: ${project.name}" />`;
  og += `<meta property="og:description" content="${
    project.notes || "A KilnHelper Project"
  }"/>`;
  og += `<meta property="og:image" content="${
    findSuitablePhoto(project, "medium").uri || defLogo
  }" />`;
  og += `<meta property="og:image:width" content="1024"/>`;
  og += `<meta property="og:image:height" content="1024"/>`;
  og += `<meta property="og:url" content="https://example.com/shared_project/${project.uid}/${project.id}" />`;
  return og;
};

const getMeta = (org) => {
  // return other meta tags
};

const findSuitablePhoto = (project, size = "small") => {
  //console.log(`findSuitablePhoto - ${size}`);
  //console.log(project);
  if (project.photo) {
    //console.log(`Returning old photo: ${project.photo} (${project.name})`);
    return { uri: project.photo };
  } else {
    if (!project.photos) {
      return {};
    }
    // Check for a 'favourite' shot
    const favourite = project.photos.find((photo) => photo.isFavourite);
    if (favourite) {
      return correctlySizedPhoto(favourite, size);
    }
    // Check for an 'after' shot

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

const correctlySizedPhoto = (photo, size = "small") => {
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
