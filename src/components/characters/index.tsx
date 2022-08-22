import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  FlatList,
  Modal,
  View,
  StyleSheet,
} from "react-native";
import { Api } from "../../services/Api";
import {
  Container,
  Header,
  CardBox,
  Wrapper,
  ImageContainer,
  Content,
  Label,
  ModalLabel,
  CloseBtn,
} from "./styles";
import { Feather } from "@expo/vector-icons";
interface characterProps {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}
interface Props {
  onLayout: () => void;
}

//*Set image according to the  aspect ratio
const image = require("../../assets/banner.png");
const SCREEN_WIDTH = Dimensions.get("window").width;
const { width, height } = Image.resolveAssetSource(image);
const ratio = height / width;

export function Characters({ onLayout }: Props) {
  const [character, setCharacter] = useState<characterProps[]>();
  const [characterDetails, setCharacterDetails] = useState<characterProps>();
  const [isOpen, setIsOpen] = useState(false); //*Open and close modalBox

  useEffect(() => {
    Api.get("character").then((res) => setCharacter(res.data.results));
  }, []);

  const getDataCharacter = (id: number) => {
    const value: characterProps[] | any = character?.filter(
      (item) => item.id === id
    );

    let parsed: any = {};

    value.forEach(function (item: any) {
      for (let i in item) {
        parsed[i] = item[i];
      }
    });
    setCharacterDetails(parsed);
  };
  return (
    <Container onLayout={onLayout}>
      <Header>
        <Image
          source={image}
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * ratio }}
        />
      </Header>

      <View>
        <FlatList
          data={character}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Wrapper
              onPress={() => {
                setIsOpen(true);
                getDataCharacter(item.id);
              }}
            >
              <CardBox>
                <ImageContainer>
                  <Image
                    style={{ height: 120, width: 120, borderRadius: 60 }}
                    source={{ uri: item.image }}
                  />
                </ImageContainer>

                <Content>
                  <Label>Name: {item.name}</Label>
                  <Label>Gender: {item.gender}</Label>
                  <Label>Specie: {item.species}</Label>
                </Content>
              </CardBox>
            </Wrapper>
          )}
        />
        <Modal
          animationType="slide"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <CloseBtn>
                <Feather
                  name="x-square"
                  size={36}
                  color="black"
                  onPress={() => setIsOpen(false)}
                />
              </CloseBtn>

              <Image
                style={{
                  height: 200,
                  width: 200,
                  marginBottom: 20,
                  borderRadius: 150,
                }}
                source={{ uri: characterDetails?.image }}
              />
              <ModalLabel>Name: {characterDetails?.name}</ModalLabel>
              <ModalLabel>Gender: {characterDetails?.gender}</ModalLabel>
              <ModalLabel>Specie: {characterDetails?.species}</ModalLabel>
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00b6cd",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
});
