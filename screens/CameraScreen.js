import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { NavigationEvents } from 'react-navigation';
import { logInAsync } from 'expo/build/Google';

export default class CameraScreen extends Component {
	camera = null;
	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		isFocused: false
	};

	async componentDidMount() {
		const camera = await Permissions.askAsync(Permissions.CAMERA);
		const hasCameraPermission = camera.status === 'granted';
		this.setState({ hasCameraPermission });
	}

	render() {
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return (
				<View>
					<Text>NULL CAM!</Text>
				</View>
			);
		} else if (hasCameraPermission === false) {
			return <Text>Denied camera access</Text>;
		}
		if (this.state.isFocused === false) {
			return (
				<NavigationEvents
					onWillFocus={(payload) => {
						console.log('will focis >>', payload);
						this.setState({ isFocused: true });
					}}
					onDidBlur={(payload) => {
						console.log('left >> ', payload);
						this.setState({ isFocused: false });
					}}
				/>
			);
		} else {
			return (
				<View>
					<Camera style={styles.preview} type={this.state.type} ref={(camera) => (this.camera = camera)}>
						<NavigationEvents
							onWillFocus={(payload) => {
								console.log('will focis >>', payload);
								this.setState({ isFocused: true });
							}}
							onDidBlur={(payload) => {
								console.log('left >> ', payload);
								this.setState({ isFocused: false });
							}}
						/>
					</Camera>
				</View>
			);
		}
	}
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
	preview: {
		height: winHeight,
		width: winWidth,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0
	}
});
