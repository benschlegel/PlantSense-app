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
If you are using vscode and files still show red warnings, try reloading the window.

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

* **📁`app`:** Contains main component (`App.tsx`), entry point of app.

  * *📄 `app/_layout.tsx`:* Contains the entry point of the app. Also responsible for registering screens and loading fonts.
  * *📄 `app/index.tsx`:* Contains a redirect to control which screen gets loaded first.

---

This section is not completed/acurate yet.

* **📁`components`:** Contains components that are used in main `App.tsx`.

  * *📄 `components/Header.tsx`:* Simple header on top of app, displays name of current list (with option to return to list selection screen).

  * *📄 `components/Input.tsx`:* Used to add new items to list, input component on bottom of screen.

  * *📄`components/ListItem.tsx`:* Single item in list, can be deleted by swiping. Also contains logic for deleting item.

---
* **📁`types`:** Contains global types (mainly `Item` interface).

  * *📄`index.d.ts`:* Global types/interfaces and styles.

---
* **📁`other`:** Configuration files

  * *📄`.eslintrc.js`:* Contains eslint config for project

  * *📄`app.json`:* Defines `expo`-configuration like `entryPoint`, `jsEngine`, app name etc.
