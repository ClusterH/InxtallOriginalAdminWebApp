import * as functions from 'firebase-functions';

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const defaultFirestore = admin.firestore();
admin.firestore().settings({ timestampsInSnapshots: true })

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const name = newValue.name;

        // perform desired operations ...
    });
export const helloWorld = functions.https.onRequest((request, response) => {

    defaultFirestore.collection("users").where("role", "==", 1).where("purchaseStatus", "==", 'Active')
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                const userData = doc.data();
                if (userData.remainDays !== 0) {
                    defaultFirestore.collection("users").doc(doc.id).update({
                        "remainDays": userData.remainDays - 1,

                    })
                } else {
                    defaultFirestore.collection("users").doc(doc.id).update({
                        "purchaseStatus": 'Deactivate',

                    })
                }
            });
            response.send("Another Good Day !!!");
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
            response.send("Error getting documents");
        });
});
exports.notification = functions.firestore.document('notification/{key}').onCreate((snap, context) => {
    let payload;
    const newData = snap.data();
    if (newData.type === 0) {

        payload = {
            notification: {
                title: 'New Appointment',
                body: 'Click Here To More Detail.',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };
    } else if (newData.type === 1) {
        payload = {
            notification: {
                title: 'Your Booking Is Confirm',
                body: 'Check it out here',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };
    } else if (newData.type === 2) {
        payload = {
            notification: {
                title: 'Your Booking Is Cancel',
                body: 'Check it out here',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };

    } else if (newData.type === 3) {
        payload = {
            notification: {
                title: 'New Booking Assign TO You',
                body: 'Check it out here',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };
    } else if (newData.type === 4) {
        payload = {
            notification: {
                title: 'Appointment Is Cancel Feel Free... Batter luck next time',
                body: 'Check it out here',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };
    } else {
        payload = {
            notification: {
                title: 'Why i am Here ',
                body: 'Seems you lost track',
                sound: "default",
                priority: "high",
                click_action: "FCM_PLUGIN_ACTIVITY"

            },
            'data': {
                'bookingKey': newData.bookingKey
            },

        };
    }
    const option = {
        priority: "high",

    }
    const id = snap.id;
    var docRef = defaultFirestore.collection("users").doc(newData.id);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const userData = doc.data()
            // console.log("Document data:", userData);
            if (userData.token) {
                admin.messaging().sendToDevice(userData.token, payload, option)
            }
            const itemDoc = defaultFirestore.doc(`notification/${id}`);
            itemDoc.delete();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    return true;

});

exports.remainWash = functions.firestore.document('bookingMaster/{key}').onCreate((snap, context) => {
    const newData = snap.data();
    const docRef = defaultFirestore.collection("users").doc(newData.marchantId);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            const myData = doc.data()
            // console.log("Document data:")

            if (myData.remainWash !== 0) {
                defaultFirestore.collection("users").doc(newData.marchantId).update({
                    "remainWash": doc.data().remainWash - 1,
                });
            } else {
                defaultFirestore.collection("users").doc(newData.marchantId).update({
                    "purchaseStatus": 'Deactivate',
                })
            }
        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

});