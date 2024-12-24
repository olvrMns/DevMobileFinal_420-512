# FRONTEND

## Membres de l'équipe

### Olivier Mansuy

### Jimmy Nguyen

### Gael Desforges-Paquin


## How to start the frontent

## .env
- .dev.env / .test.env
    - API_ADDR (yOUR BACKEND IP)

## npm install

## npm run start
   

## Pages:
1. The catalog that when clicked, will be able to see the detail of the game.

2. The friend form that can add a friend. It only takes the id of the user and you can add a description to your new friend.

3. The QR code that can be used to be scanned to become friend.

4. The camera to scan the QR code. You must accept the permission to the app to use your phone camera. If the QR code is valid, il will start a up and down translation animation and you will become friend with the friend that you scan. (Use two phones with different users to test or use your phone to test with the QR code of the user in the web version)


5. The profile page for the settings. You can change your email or your username in here.

6. A menu page that would allow you to redirect to the catalog page or the friend list.

7. A page that shows all friends and can either modified the friend description or delete the friend link.

8. Signin page. 

9. signout page.

10. Favorite picker (Not finished)

## Contexts 

1. One for the theme. Click to the theme to toogle between light and dark.

2. One for to have the id of the user. It is used to remember which user  is connected between different pages.

3. One to show platforms.

## API

### RAWG: https://rawg.io/apidocs

## Important librairies

### expo-camera

### react-native-reanimated

### react-native-qrcode-svg

### jest

## Test

### To run test, simply use npm test (we unfortunately did not finish the tests)

## Deployoment .apk

### We succeded in deploying the application however its simply a blank white page and it did not fully work.


## REF

### https://github.com/expo/fyi/blob/main/barcode-scanner-to-expo-camera.md (HELPED FOR THE QR CODE SCANNER)