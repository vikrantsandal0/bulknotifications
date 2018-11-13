var _ = require('underscore');
var FCM = require('fcm-node');
var fcm = new FCM('key');

module.exports = {

    BulkNotifications: async function () {

        const tokens = await db.collection('deviceToken').find().sort({ userId: -1 }).toArray()


        var deviceToken = _.pluck(tokens, 'token');
        var tokenChunkArr;
        /**
         * for example
         * [{token: 'xyz'}, {token: 'pqr'}, {token: 'mpo'}..............];
         * _.pluck will  gives us an array ['xyz','pqr','mpo'.......];
         */


        if (deviceToken.length > 1000) {
            /**
             *  check if the length of the tokens array us >1000
             *   _.chunk will create sub-arrays of tokens of defined length
             *    [['xyz','pqr','mpo'.....1000], ['ret','che','oow'......1000]];
             *    As fcm can send pushes to min 1 max 1000 registration tokens 
             */
            tokenChunkArr = _.chunk(deviceToken, 1000);
            _.map(tokenChunkArr, (sub_arr) => {


                var payloadMulticast = {
                    registration_ids: sub_arr,

                    data: {
                        url: "device token length >1000"
                    },
                    priority: 'high',
                    content_available: true,
                    notification: { title: 'Hello', body: 'Multicast', sound: "default", badge: "1" }

                };

                fcm.send(payloadMulticast, function (error, response) {
                    if (error) {

                        console.log("Server is under Maintainance", error);
                        return error
                    } else {
                        console.log("Successfully sent the Push Notification ", response);
                        return response
                    }
                });

            });
        }

        else {

            /**
             * if length is <1000
             * then we can send the push to all device tokens at once
             */

            var message = {
                registration_ids: deviceToken,
                data: {
                    url: "else part devicetoken length<1000"
                },
                priority: 'high',
                content_available: true,
                notification: { title: 'Hello', body: 'Multicast', sound: "default", badge: "1" }

            };

            fcm.send(message, function (error, response) {
                if (error) {

                    console.log("Server is under Maintainance", error);
                    return error
                } else {
                    console.log("Successfully sent the Push Notification ", response);
                    return response
                }
            });


        }

    }



}

