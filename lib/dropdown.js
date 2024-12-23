import { StyleSheet } from "react-native";

export const defaultSelectText = "any";

/**
     * @note
     * THIS OBJECT IS FOR TESTING.......
     * the actual data should be fetched from the api...
     */
export const selectorsData = [
    [
        {label: defaultSelectText, value: defaultSelectText, type: "developers"}, 
        {label: "ubisoft", value: "ubisoft", type: "developers"}, 
        {label: "fromsoftware", value: "fromsoftware", type: "developers"}
    ],
    [
        {label: defaultSelectText, value: defaultSelectText, type: "platforms"}, 
        {label: "?", value: "1", type: "platforms"}, 
        {label: "??", value: "2", type: "platforms"},
        {label: "???", value: "3", type: "platforms"},
        {label: "????", value: "4", type: "platforms"},
        {label: "?????", value: "5", type: "platforms"}
    ],
    [
        {label: defaultSelectText, value: defaultSelectText, type: "genres"},
        {label: "action", value: "action", type: "genres"},
        {label: "indie", value: "indie", type: "genres"}
    ],
    [
        {label: defaultSelectText, value: defaultSelectText, type: "tags"},
        {label: "singleplayer", value: "singleplayer", type: "tags"},
        {label: "multiplayer", value: "multiplayer", type: "tags"}
    ],
    [
        {label: defaultSelectText, value: defaultSelectText, type: "publishers"}
    ],
    [ 
        {label: defaultSelectText, value: defaultSelectText, type: "ordering"},
        {label: "name", value: "name", type: "ordering"},
        {label: "released", value: "released", type: "ordering"},
        {label: "rating", value: "rating", type: "ordering"}
    ]
];

/**
 * @ref
 * https://www.npmjs.com/package/react-native-element-dropdown
 */
export const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      width: "16.66%",
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 10,
    },
    placeholderStyle: {
      fontSize: 10,
    },
    selectedTextStyle: {
      fontSize: 10,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 10,
    },
  });