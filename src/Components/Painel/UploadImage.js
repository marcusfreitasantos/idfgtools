import React from "react";

// Assuming image is coming from the openPicker method from ImagePicker (react-native-image-crop-picker)
// Auth via JWT Token.

export function UploadImage(image, token) {
  return new Promise(async (resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "multipart/form-data;");

    const uriParts = image.path.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const rand = Math.round(Math.random() * 12345 * Math.random());

    const fileName = `image-${image.modificationDate}-${image.size}-${rand}.${fileType}`;

    let formdata = new FormData();
    formdata.append("file", {
      uri: image.path,
      name: fileName,
      type: image.mime,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("<YOUR-WP-BASEURL>/wp-json/wp/v2/media", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
