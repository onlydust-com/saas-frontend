import { FileFacadePort } from "./file-facade-port";

export class FileAdapter implements FileFacadePort {
  download({ blob, name, extension }: { blob: Blob; name: string; extension: string }) {
    const filename = `${name}.${extension}`;
    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(blobURL);
    }, 100);
  }
}
