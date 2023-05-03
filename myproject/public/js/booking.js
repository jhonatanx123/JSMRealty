function book(key) {
    // console.log(filteredData[key]);
    if (!isUserLogin()) {
      return alert('Please login to book a property.')
    }
    else {
    const user = firebase.auth().currentUser;
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
      // let isExist = valueExistsInArray(favList, 'permalink', properties[key].permalink);
      var data={
      "property":properties[key],
      "user":{
        'email':user.email,
      },
      "booked_at":formattedDate,
      "status":'Pending'
      };
      database.ref('bookings').push(data);

      var notification={
        "message":"Property is booked successfully!",
        "user":{
          'email':user.email,
        },
        "is_read":false
        };
        database.ref('notifications').push(notification);
       alert('Property is booked successfully.')

    }
  }