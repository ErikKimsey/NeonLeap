import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { NavigationEvents } from 'react-navigation';
// import { logInAsync } from 'expo/build/Google';
import Toolbar from '../toolbar.component';
import Gallery from '../components/gallery';

export default class CameraScreen extends Component {
	camera = null;
	state = {
		captures: [],
		capturing: null,
		hasCameraPermission: null,
		hasAudioPermission: null,
		flashMode: Camera.Constants.FlashMode.off,
		cameraType: Camera.Constants.Type.back,
		isFocused: false
	};

	setFlashMode = (flashMode) => this.setState({ flashMode });
	setCameraType = (cameraType) => this.setState({ cameraType });
	handleCaptureIn = () => this.setState({ capturing: true });

	handleCaptureOut = () => {
		if (this.state.capturing) this.camera.stopRecording();
	};

	handleShortCapture = async () => {
		const photoData = await this.camera.takePictureAsync();
		console.log(photoData);

		this.setState({ capturing: false, captures: [ photoData, ...this.state.captures ] });
	};

	handleLongCapture = async () => {
		const videoData = await this.camera.recordAsync();
		console.log(videoData);

		this.setState({ capturing: false, captures: [ videoData, ...this.state.captures ] });
	};

	async componentDidMount() {
		const camera = await Permissions.askAsync(Permissions.CAMERA);
		const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		const hasCameraPermission = camera.status === 'granted' && audio.status === 'granted';
		console.log(hasCameraPermission);

		this.setState({ hasCameraPermission });
	}

	render() {
		const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
		// if (hasCameraPermission === null) {
		// 	return (
		// 		<View>
		// 			<Text>NULL CAM!</Text>
		// 		</View>
		// 	);
		if (hasCameraPermission === false) {
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
					<View>
						<Camera
							style={styles.preview}
							cameraType={this.state.cameraType}
							ref={(camera) => (this.camera = camera)}
						>
							{/* <NavigationEvents
								onWillFocus={(payload) => {
									this.setState({ isFocused: true });
								}}
								onDidBlur={(payload) => {
									this.setState({ isFocused: false });
								}}
							/> */}
						</Camera>
					</View>
					{/* {captures.length > 0 && <Gallery captures={this.state.captures} />} */}
					<Toolbar
						capturing={capturing}
						flashMode={flashMode}
						cameraType={cameraType}
						setFlashMode={this.setFlashMode}
						setCameraType={this.setCameraType}
						onCaptureIn={this.onCaptureIn}
						onCaptureOut={this.onCaptureOut}
						onLongCapture={this.handleLongCapture}
						onShortCapture={this.onShortCapture}
					/>
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
