import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `http://127.0.0.1:5000/star?name=${this.props.navigation.getParam(
        "name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .catch(error => {
        Alert.alert(error.message);
      });
  };


  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Star Mass : ${details.mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Star Radius : ${details.radius}`}</Text>
            </View>
            
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});
