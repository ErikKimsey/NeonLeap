import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraScreen extends Component {
	camera = null;
	state = {
		hasCameraPermission: null
	};

	async componentDidMount() {
		const camera = await Permissions.askAsync(Permissions.CAMERA);
		const hasCameraPermission = camera.status === 'granted';
		this.setState({ hasCameraPermission });
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			<View />;
		} else if (hasCameraPermission === false) {
			return <Text>Denied camera access</Text>;
		}
		return (
			<View>
				<Camera style={styles.preview} ref={(camera) => (this.camera = camera)} />
			</View>
		);
	}
}

const {width: windowWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height:winHeigh,
    width:winWidth,
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0,
  }
})
