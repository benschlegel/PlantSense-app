# PlantSense app

<p align="center">
  <img height=400 src="https://i.imgur.com/2Sudsa8.png">
</p>

This is the main app repository of the `PlantSense` project. It also consists of a central web server ([repository here](https://github.com/benschlegel/PlantSense-webserver)) and the microcontroller, that reads data from sensors and controls an LED status indicator ([repository here](https://github.com/benschlegel/PlantSense-microcontroller)).

Full docs coming soon.

---

## Setup
After cloning the project, run:
```bash
npm install
```
If you are using vscode and still see errors/warnings in your files, try reloading the window.

To start the project, run:
```bash
npx expo start
```
Now, you can preview the app on your phone by downloading the `expo` app ([android](https://play.google.com/store/apps/details?id=host.exp.exponent), [ios](https://apps.apple.com/us/app/expo-go/id982107779)) on your phone and scanning the QR code from your terminal.

---

## Architecture

The project consists of 3 parts/repositories.

![Architecture](https://i.imgur.com/SC9XMWr.png)


## Dependencies/Frameworks

This project is a 'managed' `expo` react native app (explanation link on expo [here](https://expo.dev/)).

### Routing
For navigation, [expo router](https://expo.github.io/router/docs/) is being used. That means that every folder in the `app` directory directly corresponds to a `route`, provided it contains `_layout.tsx` and `index.tsx`. This means that the `main` screen/route can be found under `app/(main)` and corresponds to the route `/(main)`.

---

## 📂 Project structure

This section goes into detail of how the project/app is structured.

---

* **📁`app`:** Contains main layout (`app/_layout.tsx`), entry point of app.

  * *📄 `app/_layout.tsx`:* Contains the entry point of the app. Also responsible for registering screens and loading fonts.
  * *📄 `app/index.tsx`:* Contains a redirect to control which screen gets loaded first.

---

* **📁`routes`:** Contains components that are used in main `App.tsx`.

  * *📁 `app/main`:* Main screen of the app. Contains plant animation and notification/settings button.

  * *📁 `app/setup`:* Screen for initial setup. Will be skipped automatically once setup has been completed once.

  * *📁`app/notifications`:* View all notifications of your devices. Automatically refreshes to fetch new notifications.

---
* **📁`components`:** Contains all reusable and customizable components of this project. Some notable ones listed below.

  * *📄`StyledText`:* `<Text>` component with set font-family. Can be passed `TextProps` to customize. Use everywhere instead of regular `<Text>` component
  * *📄`StyledButton`:* Drop-in styled replacement for `<PressableOpacity>`.

---

* **📁`constants`:** Contains configurable project constants like `Color` settings, ty and more

* **📁`helpers`:** Contains functions that are needed by multiple components. This includes functions that use `fetch` to make `http` network requests.

* **📁`assets`:** Contains project assets like `fonts` and `images`.
  * *📁`assets/lottie`:* Contains lottie animation files.

---
* **📁`other`:** Configuration files

  * *📄`.eslintrc.js`:* Contains eslint config for project

  * *📄`app.json`:* Defines `expo`-configuration like `entryPoint`, `jsEngine`, app name etc.

  * *📄`.gitattributes`:* gitattributes config, contains settings to set `EoL` (end of line) for every file so project can be used both on windows and mac/linux.
