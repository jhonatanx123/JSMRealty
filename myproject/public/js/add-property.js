document.getElementById("addProperty").addEventListener("click", function(event) {
    // Get the form data
    loader.classList.add('show');
    var image = document.getElementById("image");
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var location = document.getElementById("location").value;
    var description = document.getElementById("description").value;
   
    const storage = firebase.storage();
    const file = image.files[0];
    // Create a storage reference for the file
    const storageRef = storage.ref().child(file.name);
    // Upload the file to Firebase Storage
    const uploadTask = storageRef.put(file);
    // Monitor the upload progress
    uploadTask.on("state_changed", snapshot => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload progress: ${progress}%`);
    }, error => {
    console.error(error);
    }, () => {
    // Get the download URL for the uploaded file
    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        loader.classList.remove('show');
        console.log(`File available at ${downloadURL}`);
        // const image = document.querySelector("#image");
        // image.src = downloadURL;
            var data={
            image: downloadURL,
            name: name,
            price: price,
            location: location,
            description: description
            };
            // console.log(data);
            // Save the data to the Firebase Realtime Database
            var propertiesRef = database.ref("properties");
            var newPropertyRef = propertiesRef.push();
            newPropertyRef.set(data);
            // Clear the form fields
           window.location.href="dashboard.html";
        });
    });
    
  });