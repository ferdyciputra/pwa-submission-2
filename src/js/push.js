let webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BOOuzPzowuux-ckGFWLLl4yrVnv7vvtB_T0GutwmXRoVOlOejdxrRQqY-CSr7xZzJXsCEwJXkN0erOwUDq2EVyI",
    "privateKey": "YQTlidG9qzVmfV31D5Qtu-Yjhl5JzT20hUjM5q1wJr0"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cLG_wXBCh4Y:APA91bEGD6s8e0a0_abm1JGXPiY263WbUFBXEc5m7YwpSVOrC_d-qW14BHUFA9788WFNvgT8fyFNmkAvlUJncHohQHLdM7msBxRUaMj_BZ0jGpA5sI0sxnkla8-eq_WbFEeniEmL7jT7",
    "keys": {
        "p256dh": "BDhm/yaPgaAFwxH+rppclstk/juFR02HmoDOxbdN6qKm04ldaNr9kUV8ByNCNBqIGBKYvbqt2SJ5k9j0P1kRS70=",
        "auth": "A0ctcqwfCqyKnNWLMP8WTw=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
let options = {
    gcmAPIKey: '935862098186',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);