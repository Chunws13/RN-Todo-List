import { Platform } from "react-native";
import { TestIds } from 'react-native-google-mobile-ads';

const AdSetting = () => {
  if (__DEV__) {

    return Platform.select({
      android : TestIds.BANNER
    })
  } else {

    return Platform.select({
      android : "ca-app-pub-6996695943383445/5069022132"
    })
  }
}

export default AdSetting;