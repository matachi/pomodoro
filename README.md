# Pomodoro timer React Next.js app

This is a [pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique)
built with React, Next.js, TypeScript and Foundation.

Try the app:

* <https://matachi.github.io/pomodoro/>

It has the following features:

* Start new pomodoro.
* Start new break.
* Pause & resume.
* See timer of the current pomodoro/break.
* See table of previous pomodoros/breaks.
* Clear pomodoros/breaks from the table.
* Show browser notification when pomodoro/break has reached its end.
* Play notification sound when pomodoro/break has reached its end.
* Change pomodoro length (default 25 min).
* Change break length (default 5 min).
* Settings and pomodoros/breaks are automatically saved in the browser's local
  storage. (Refresh the page and the timer will continue.)

## Dependencies

It uses the following libraries:

* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Foundation](https://get.foundation/)
* [date-fns](https://date-fns.org/)

## How to run

Install dependencies:

```
npm install
```

Run in development mode:

```
npm run dev
```

Export:

```
npm run export
```

## Screenshots

Screenshot of the main page:

![Main page](./screenshots/screenshot1.png)

Screeshot of the settings page:

![Settings page](./screenshots/screenshot2.png)

## Credits

Notification sound:

* [Synth Gliss by InspectorJ](https://freesound.org/people/InspectorJ/sounds/370195/),
  licensed under CC BY 4.0.
