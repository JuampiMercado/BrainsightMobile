import React, {Component} from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';


export default class VideoPlayerView extends Component {
    constructor(props){
      super(props);
      this.state = {
        source: this.props.navigation.state.params.source,
        title: this.props.navigation.state.params.title
      }
    }
    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        Orientation.lockToLandscape();
    }
    _back(){
        const {goBack} = this.props.navigation;
        Orientation.lockToPortrait();
        goBack();
    }
    render(){
        return (
            <View style={styles.container}>
                <VideoPlayer
                    source={ this.state.source }
                    title={this.state.title}
                    onBack={() => this._back()}
                    resizeMode={'cover'} //Esto lo hace ocupar la pantalla completa
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

