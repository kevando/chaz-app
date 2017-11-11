import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import _ from 'lodash'
import { Actions} from 'react-native-router-flux';
import { Categories, CategoryIcon } from '../../components/Category';
import { colors } from '../../config/styles';
import styles from './styles';
import firebase from 'react-native-firebase'
const Permissions = require('react-native-permissions');
var PushNotification = require('react-native-push-notification');
