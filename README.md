## React.js and Node.js - Upload Multiple Files

This little React.js-Node.js app shows how files sent from the client are captured, parsed and saved on the server side. If you want to process multipart form data you should use FormData() on client side and you can use Multer to process these files on server side.

![image](https://github.com/user-attachments/assets/15040953-b9a5-4c34-aa7a-7aed621c8163)

## 1. Client (React.js)

React.js is used in the client part. App.js renders the `UploadFile.jsx` component and the processing takes place in the "UploadFile" component. The "UploadFile" component uses `axios` to send requests to the server route. 

```
import React, {useState} from "react";
import axios from "axios";
```

3 pieces of information with the name `title`, `image` and `video` will be sent to the server, so `states` are created for them.

```
const [title, setTitle] = useState();
const [image, setImage] = useState();
const [video, setVideo] = useState();
const [imagePreview, setImagePreview] = useState();
const [videoPreview, setVideoPreview] = useState();
```

Again, this component has an asynchronous function called `send`, which makes a request to the server. The `send` function takes the React synthetic event (called e or event) as a parameter. The default action is blocked in the first line with the event (e.preventDefault()). This is to prevent the form submission process without filling in the form data. After all that here we see that the variable named "data" is given the format "FormData". When submitting multi-part form data in Javascript, FormData is used and we append the multi-part form data we want to send with "append" in FormData. This is a special form of file data transmission and for saving binary data such as images. We see it again, "title", "image" and "video" information has been added to the FormData variable named data. Title is a text but image and video are in file format. We get these 3 information from inputs.

```
const send = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", title);
        data.append("image", image);
        data.append("video", video);

        await axios.post("http://localhost:5000/upload", data)
            .then((result) => console.log(result))
            .catch((err)=> console.log(err))
}
```

![image](https://github.com/user-attachments/assets/6d127b97-3d32-499d-8569-d6b8bf4a4ad9)

Now we need to write three "input" in a form and keep the inputs as state information. The first input will be of type text, but the other two have file type. That's why we use `event.target.value` when retrieving the first input value, but we should use `event.target.files[0]` for the other two. Finally, we have a button which, when clicked on it, executes the `send` function. The send function, on the other hand, will `post` the data information by sending a request to our server address if the form data is full.

![image](https://github.com/user-attachments/assets/b7bbf2ba-65eb-4b62-99a2-ddd3e390ea88)

Such a frontend with CSS codes awaits us:

![image](https://github.com/user-attachments/assets/0af799c4-d29f-4c78-a055-8bdc096fb0af)

---

## 2. Server (Node.js)

On the server side, we have a Node.js project with `express`, `multer`, `cors` and `path` packages installed. Express.js is used to set up a server in a simpler way. Multer is a middleware and is used to process multipart form data. Multer allows us to process the multipart form data for us and gives us access to the request body. It also gives us access to the file. When you use Multer with HTML, you must specify enctype="multipart/data-form". Otherwise it will be rendered as JSON and cannot be used correctly. To upload a file, you need an input format of type fyle.

**server.js:** On the server side, `server.js` is our main file. In it, the installation of server and the installation of the packages have been carried out. The paths of static files are related to `express.static()` and a `/upload` route is written. Multer function named "uploadFiles" works in this route. Thanks to the "fields" feature, it allows importing various files. It takes 2 files with the names "image" and "video" sent from the client. Then a function with parameters "req" and "res" runs. This function prints the information of the incoming files to the console.

![image](https://github.com/user-attachments/assets/52b4f4e5-af10-494d-b93e-30ff3d75f099)

When we send the data by the client, we see the information of the data in the console because the function was written above for this.

![image](https://github.com/user-attachments/assets/05087892-d154-4c3f-b20b-1c5ee658978e)

We see that there are information such as "fieldname" and "mimetype" in the incoming file information. These are the information that identifies the file. Multer processes the files using this information. Now it's all in Multer. The special Multer configuration function named "uploadFiles" will receive incoming files, process them according to file extensions and other information, and save them to the specified path.

![image](https://github.com/user-attachments/assets/50caf07c-49cb-44c5-b58f-ac97e307259e)

![image](https://github.com/user-attachments/assets/797b55c4-02d0-4552-b60e-292974709eaf)

---

## Final 

I will send the files from the client and the files will be saved to the path I specified on the server side. Let's see!

![image](https://github.com/user-attachments/assets/da7438c5-fd8f-472a-88fc-ef6a3a00c067)

And the files are exactly where I want them:

![image](https://github.com/user-attachments/assets/82178a28-6bb7-46ac-be49-4b1aacfef972)
