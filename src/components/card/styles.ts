import { StyleSheet } from 'react-native'

export const CardHistoryStyle = StyleSheet.create({
  viewCart: {
    flex: 1,
    padding: 10,
  },
  charTitle: { 
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: 'center', 
    margin: 6
  }
})

export const CardStyles = StyleSheet.create({
  wrapper: {
    marginTop: 26,
    height: "100%",
    maxHeight: 270,
    minWidth: 400,
    width: "80%",
    maxWidth: 400,
    borderRadius: 20,
    backgroundColor: "#D2122E",
    paddingHorizontal: 18,
    paddingBottom: 20,
    paddingTop: 12,
    marginVertical: 10,
  },
  info: {
    height: "70%",
    flexDirection: 'row'
  },
  imgView: {
    width: "40%",
    maxWidth: "40%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  image: {
    width: 135,
    height: 135,
    backgroundColor: "#EDEDED",
    borderRadius: 20,
  },
  details: {
    width: "50%",
    flex: 1,
    alignItems: 'center'
  },
  inputsView: {
    flex: 1,
    maxHeight: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  button: {
    borderRadius: 20,
    backgroundColor: "#F40B81",
    height: 40,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  },
})