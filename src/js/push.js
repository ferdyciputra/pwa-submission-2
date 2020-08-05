let webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BGAcyX8gPF4ms9jm3ew6xWaFEYOa1fdLSy7IkAKbl8t1ZfIJIW42iGlq3PChJeL5D8td69q5NajX0cygLFOKaYA",
    "privateKey": "xunW9t1UnN9ARa1COVa6ebsAcRtkisuPLYDamLxR6rU"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d88cYZZ8t6w:APA91bG-bbVhxjPmBkcdVnY-XFD1KB5Xv_Icc3v_HiQxlb4GdA9NpMwYkyLkWh-alvKo5SULYIrO8MyMlMjWDI2ut-K9exZGlez6kChc7eS_8V4zKUKey1jAJulb40bwW4lZUTGhRmuA",
    "keys": {
        "p256dh": "BIivlnhzp96f0xQveydhdjl9GqEoNz2IHCpg9WU9SE8oJiOPZYABGLNlJwocuv9VPH7xC+luctWuHDDLVcmVDTs=",
        "auth": "Ppsn+d59ZKj/9qyn4nvXoQ=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
let options = {
    gcmAPIKey: '188027761654',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);