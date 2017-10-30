# BrainsightMobile
# Commands:
# npm start -- --reset-cache
# lsof -i :8081
# kill -9 <pid>
# react-native run-android / ios
# adb uninstall com.brainsight

#Depend.
#npm install --save react-navigation
#npm i -S react-native-video
#npm install --save react-native-video-controls
#npm install --save react-native-orientation
#npm i react-native-simple-radio-button --save
#npm i react-native-vector-icons --save && react-native link react-native-vector-icons
#npm i react-native-elements --save
#npm install --save round-to
#npm i babel-plugin-transform-remove-console --save
#Linking
adb shell am start -W -a android.intent.action.VIEW -d "https://brainsight-web.herokuapp.com/test/2" com.brainsight

#Install Sensor Manager
npm i react-native-sensor-manager --save

See steps of Option:Manually.
Important! On @Override step do it on MainApplication.java, no on MainActivity

https://www.npmjs.com/package/react-native-sensor-manager


#Push Notifications
https://github.com/zo0r/react-native-push-notification
npm install --save react-native-push-notification

#DatePicker
npm install react-native-datepicker --save