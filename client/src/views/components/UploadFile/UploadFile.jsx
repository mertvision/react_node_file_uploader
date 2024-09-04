/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of "react" module
import React, {useState} from "react";
// Import Statement of "axios" Module
import axios from "axios";

// Import Statement of Upload File's CSS File
import "./uploadFile.css";

// UploadFile component
const UploadFile = () => {

    // UploadFile State Values
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [videoPreview, setVideoPreview] = useState("");

    const sendFilesToServer = async (event) => {
      event.preventDefault(); // Block default operations
  
      try {
          // Send to server all files with FormData
          const data = new FormData();
  
          // Append values to form data
          data.append("title", title);
          if (image) data.append("image", image);
          if (video) data.append("video", video);
  
          // HTTP/HTTPS request section
          const result = await axios.post('http://localhost:8080/upload', data, { withCredentials: true });
          console.log(result);
          setImage("");
          setVideo("");
          setImagePreview("");
          setVideoPreview("");
          window.location.reload();
  
          // If you still want to reload the page, you can uncomment the next line
          // window.location.reload();
      } catch (err) {
          // Catch error if it throws an error
          console.error("An error occurred:", err);
      }
  }

    return (
        <div className="upload-file-container">
          <div className="upload-file-wrapper">
              <h1 className="upload-file-text">Upload File or Files (Only ".jpg, .jpeg, .mp4")</h1>

              <form action="">
                <input type="text" name="title" id="" placeholder="Video Title" className="upload-file-input" onChange={(event)=>{
                    const title = event.target.value;
                    setTitle(title);
                }} />

                <span>Choose a Image File:</span>
                <input type="file" name="image" id="" placeholder="Image File" accept=".jpg, .jpeg" className="upload-file-input" onChange={(event)=>{
                    const image = event.target.files[0];
                    setImage(image);
                    setImagePreview(URL.createObjectURL(event.target.files[0]));
                }}/>

                {
                  imagePreview ? <img src={imagePreview ? imagePreview : ""} alt="Uploaded Image" className="image-preview-section" /> : <></>
                }

                <span>Choose a Video File:</span>
                <input type="file" name="video" id="" accept=".mp4" className="upload-file-input" onChange={(event)=>{
                    const video = event.target.files[0];
                    setVideo(video);
                    setVideoPreview(URL.createObjectURL(event.target.files[0]));
                }}/>

                <iframe src={videoPreview ? videoPreview : ""} frameborder="0" className="video-preview-section"></iframe>
              </form>

              <button onClick={(event)=> sendFilesToServer(event)} className="upload-file-button">Send</button>
          </div>
        </div>
    )
};

export default UploadFile;