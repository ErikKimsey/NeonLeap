import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraScreen extends Component {
	camera = null;
	state = {
		hasCameraPermission: null
	};
	render() {
		return <View />;
	}
}
