import React, { Component } from 'react';
import { View, StyleSheet, Modal,ActivityIndicator } from 'react-native';


export default class Loading extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible: this.props.visible
        };
        this._show=this._show.bind(this);
        this._hide=this._hide.bind(this);
    }
    render() {
        if (this.props.modal == false)
            return (<View style={{ 
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:'#3434347f',
                borderRadius:10,
                alignSelf: 'center' }}>
                <ActivityIndicator
                    animation={true}
                    size={"large"}
                    color={'white'}
                />
            </View>
            )
        else
        return (
            <Modal 
                animationType={'none'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={ () => {}}>
                <View style={{ 
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:'#3434347f',
                    borderRadius:10,
                    alignSelf: 'center' }}>
                    <ActivityIndicator
                        animation={true}
                        size={"large"}
                        color={'white'}
                    />
                </View>
                <View stlye={{flex:1}} />
            </Modal>
        );
    }

    _show(){
        this.setState({visible:true});
    }

    _hide(){
        this.setState({visible:false});
    }
}  


const styles = StyleSheet.create ({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})