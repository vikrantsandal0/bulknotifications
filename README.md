# bulknotifications



###### Implementing bulk notifications or sending pushes to multiple device tokens at once with maximum optimization

###### -The maximum number of registration tokens you can send to when using the registration_ids parameter is 1000

###### -registration_ids – Type String array – (Optional) [Recipients of a message] Multiple registration tokens, min 1 max 1000.

###### -using registration_ids in multicast payload , for example

 var payloadMulticast = {
    registration_ids:["4564654654654654",
        '123133213123123'],
    data: {
        url: "news"
    },
    priority: 'high',
    content_available: true,
    notification: { title: 'Hello', body: 'Multicast', sound : "default", badge: "1" }
};



###### using _.chunk to create sub-arrays of arrays of length 1000 because of the limit of fcm .
