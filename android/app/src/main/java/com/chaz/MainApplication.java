package com.chaz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.chirag.RNMail.RNMail;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeRestartPackage(),
            new RNShakeEventPackage(),
            new RNDeviceInfo(),
            new SvgPackage(),
            new RNFirebasePackage(),
            new RNMixpanel(),
            new ReactNativePermissionsPackage(),
            new ReactNativePushNotificationPackage(),
            new RNMail(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
