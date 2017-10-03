import React from 'react';
import { View, Text,TextInput,TouchableOpacity,StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RailsApi from '../../Config';


export default class Stage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test: this.props,
      stage: this.props,
      currentStage: this.props
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null
  });


  render(){
    const { navigate } = this.props.navigation;
    var data = this.props.StageData.data;
    debugger;
    return (
        <View style={styles.container}>
          <View>
            {data.map(function(element, i){
                return(
                    <View
                      key={'View1-' + i}
                    >
                  <Element data={data[i]} id={i} />
                  </View>
                );
              })
            }
          </View>
          <View>
            <TouchableOpacity style={styles.nextButton}
              onPress={ () => { navigate('TestManager',{ test: this.state.test, user: this.state.user, currentStage: 1}) } }
            >
              <Text style={styles.textButton}

              >Proxima Etapa </Text>
            </TouchableOpacity>
          </View>
        </View>

    );
  }
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',//'#993366',
    margin: 10
  },
  nextButton:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  },
})





var Element = React.createClass({
  render: function () {
    return (
      <View
        key={'View-' + this.props.id}
      >
      <Question text={this.props.data.question} id={this.props.id} />
      <Answer text={this.props.data.answer} id={this.props.id}/>
      </View>
    );
  }
});

var Answer = React.createClass({
  render: function () {
    return <TextInput
      key={'TextInput-' + this.props.id}
     >{this.props.text}</TextInput>
  }
});


var Question = React.createClass({
  render: function () {
    return <Text
    key={'Text-' + this.props.id}
    >{this.props.text}</Text>
  }
});



