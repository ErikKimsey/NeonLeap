import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { NavigationEvents } from 'react-navigation';
// import { logInAsync } from 'expo/build/Google';
import Toolbar from '../toolbar.component';

export default class CameraScreen extends Component {
	camera = null;
	state = {
		captures: [],
		hasCameraPermission: null,
		flashMode: Camera.Constants.FlashMode.off,
		cameraType: Camera.Constants.Type.back,
		isFocused: false,
		capturing: false
	};

	async componentDidMount() {
		const camera = await Permissions.askAsync(Permissions.CAMERA);
		const hasCameraPermission = camera.status === 'granted';
		this.setState({ hasCameraPermission });
	}

	setFlashMode = (flashMode) => this.setState({ flashMode });
	setCameraType = (cameraType) => this.setState({ cameraType });
	handleCaptureIn = () => this.setState({ capturing: true });

	handleCaptureOut = () => {
		if (this.state.capturing) this.camera.stopRecording;
	};

	handleShortCapture = async () => {
		const photoData = await this.camera.takePictureAsync();
		this.setState({ capturing: false, captures: [ photoData, ...this.state.captures ] });
	};

	handleLongCapture = async () => {
		const videoData = await this.camera.recordAsync();
		this.setState({ capturing: false, captures: [ videoData, ...this.state.captures ] });
	};

	render() {
		const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
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
				<React.Fragment>
					<Camera
						style={styles.preview}
						cameraType={this.state.type}
						ref={(camera) => (this.camera = camera)}
					>
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
					<Toolbar data="What up?" />
				</React.Fragment>
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
