import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
