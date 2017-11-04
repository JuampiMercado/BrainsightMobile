import PushNotificationAndroid from 'react-native-push-notification'
import { DeviceEventEmitter } from 'react-native';

export default function(getTest) {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['Posponer']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(action){
    //console.log(action);
    const info = JSON.parse(action.dataJSON);
    //console.log('ID TEST: ' + info.userInfo.testID)
    if (info.action == 'Posponer') {
        info.date = new Date(Date.now() + (1000 * 60 * 5));
        PushNotificationAndroid.localNotificationSchedule(info);
    } 
    // Add all the required actions handlers

  });

  PushNotificationAndroid.configure({
    onNotification: function(notification){
        getTest(notification.userInfo.testID);
    }
  })
};