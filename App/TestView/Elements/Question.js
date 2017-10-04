import React from 'react';
import {View, Text,TextInput, StyleSheet } from 'react-native';

export default class Question extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      question: this.props.question,
      answer: this.props.answer,
      type: this.props.type,
      options: this.props.options,
    }
  }

  render(){
    return (
        <View>
          <Text key={'Text-' + this.state.id}>{this.state.question}</Text>
          <Answer id={this.state.id} answer={this.state.answer} type={this.state.type} options={this.state.options} />
        </View>
    );
  }
}

const styles= StyleSheet.create({

})


class Answer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer,
      type: this.props.type,
      options: this.props.options
    }
  }
  /*
    type: open, tof(true or false), mc(multiple choice), likert
  */
  render(){
    var response = '';
    switch(this.state.type){
      case 'open':
        response = (<TextInput key={'TextInput-' + this.state.id} >{this.state.answer}</TextInput>);
        break;
      case 'tof':
        break;
      case 'mc':
        break;
      case 'likert':
        break;
    }


    return (<View>{response}</View>) ;
  }
};

