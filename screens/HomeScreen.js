import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(){ 
    super();
    this.state = {
      text:'',
      displayText:'',
      isSearchPressed: false,
      word: '',
      lexicalCategory:'',
      examples:[],
      definition: '',
    } 
  }
  getWord=(word)=>{
          var searchKeyword=word.toLowerCase()
          var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
          return fetch(url)
          .then((data)=>{
            if (data.status===200){
              return data.json()
            } else {
              return null
            }
          })
          .then((response)=>{
            var responseObject = response
            if(responseObject){
              var wordData = responseObject.definitions[0]
              var definition=wordData.description
              var lexicalCategory=wordData.wordtype
              this.setState({
                "word":this.state.text,
                "definition":definition,
                "lexicalCategory":lexicalCategory
              })
            } else{
              this.setState({
                "word": this.state.text,
                "definition": "Not Found",
                "lexicalCategory":"Not Found"
              })
            }
          })
        }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor = {"#280659"}
          centerComponent = {{text:"Dictionary",style:{color:"white",fontSize:20,fontFamily:'monospace'}}}
        />
        <TextInput
          style = {styles.inputbox}
          onChangeText={(text)=>{
            this.setState({
              text:text,
              isSearchPressed:false,
              word: "Loading...",
              lexicalCategory:'',
              examples:[],
              definition:""
              })
          }}
          value = {this.state.text}
          placeholder = "Enter text here"
        />


        <TouchableOpacity style={styles.gobutton} onPress={()=>{
          this.setState({isSearchPressed:true});
          this.getWord(this.state.text)
          }}>
          <Text style={styles.gotext}>Go</Text>
        </TouchableOpacity>

        <Text style = {styles.text}>Word: {this.state.word}</Text>
        <Text style = {styles.text}>Lexical Category: {this.state.lexicalCategory}</Text>
        <Text style = {styles.text}>Definition: {this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#a48273',
  },
  inputbox:{
    marginTop: 20,
    width:"80%",
    height:40,
    borderWidth:3,
    alignSelf:'center',
    textAlign:'center',
  },
  gobutton:{
    alignSelf:'center',
    textAlign:'center',
    margin:10,
    width:'50%',
    height:50,
    borderWidth: 3,
    padding:12,
  },
  gotext:{
    fontFamily:'monospace',
    fontSize:20,
    color:"white",
    textAlign:'center'
  },
  text:{
    fontFamily:'monospace',
    fontSize:15,
    color:"white",
    margin: 10,
  },
});
