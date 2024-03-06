[Home](../README.md)

# Progressive Web Apps (PWA)

Create apps which *feel like installed apps*. Start on the smartphone from the home screen, allow working while being offline. Cache and sync data later. Send notifications to the operating system to inform about updated data on the server.  

Provide installation on the home screen.

## Caching and Working Offline 

### Service Workers

Service workers provide a proxy for every network request. This allows centralised caching and preloading which is important for an proper offline experience. E.g. delaying network request when the net is down and synching when the net is up again.

Service workers must be registered and can work across several pages.

## Mobile / Smartphones

Sensors and actuators easen the interaction with web applications. For example, swipe gestures might enhance viewing experience for a slideshow. Vibration output is added to alert users.

### Sensors / Actuators

Many Web APIs allow access to mobile phone sensors such as GPS coordinates for detecting the location. 

## Notifications

### Web Notifications

Local versus Push (remote) notifications.

[Next part (Real-time Web)](../Part-11-RealTimeWeb/study-material--rtw.md)